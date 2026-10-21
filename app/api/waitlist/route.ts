import { after, NextResponse } from "next/server";
import { Resend } from "resend";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { classifyInsertError, waitlistSchema, type WaitlistResponse } from "@/lib/waitlist";

export const runtime = "nodejs";

function json(body: WaitlistResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  const ip = clientKey(request);
  const rateLimit = consumeRateLimit(ip);
  if (!rateLimit.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many attempts. Give it a few minutes, then try again.",
      },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, code: "invalid_request", message: "The form could not be read. Try again." },
      400,
    );
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: "invalid_request",
        message: "Check the highlighted details and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      400,
    );
  }

  const elapsed = Date.now() - parsed.data.startedAt;
  if (elapsed < 1_200 || elapsed > 24 * 60 * 60 * 1000) {
    return json({ ok: false, code: "bot_rejected", message: "Refresh the page and try again." }, 400);
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
    return json({ ok: false, code: "bot_rejected", message: "Bot check failed. Try again." }, 400);
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return json(
      {
        ok: false,
        code: "configuration_error",
        message: "The waitlist is being connected. Please check back shortly.",
      },
      503,
    );
  }

  const lead = {
    first_name: parsed.data.firstName,
    email: parsed.data.email,
    crew_name: parsed.data.crewName,
    crew_size: parsed.data.crewSize,
    affiliation_type: parsed.data.affiliationType,
    affiliation_name: parsed.data.affiliationName,
    email_consent: parsed.data.emailConsent,
    privacy_version: parsed.data.privacyVersion,
    utm_source: parsed.data.utmSource,
    utm_medium: parsed.data.utmMedium,
    utm_campaign: parsed.data.utmCampaign,
    referrer: parsed.data.referrer,
  };

  const { error } = await supabase.from("waitlist_leads").insert(lead);
  const insertStatus = classifyInsertError(error);
  if (insertStatus === "already_joined") return json({ ok: true, status: "already_joined" }, 200);
  if (insertStatus === "server_error") {
    console.error("Waitlist insert failed", { code: error?.code || "unknown" });
    return json(
      { ok: false, code: "server_error", message: "We could not save your place. Try again." },
      500,
    );
  }

  if (process.env.RESEND_API_KEY && process.env.WAITLIST_ALERT_TO) {
    after(async () => {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: emailError } = await resend.emails.send({
          from: process.env.WAITLIST_FROM_EMAIL || "Reunion <onboarding@resend.dev>",
          to: [process.env.WAITLIST_ALERT_TO as string],
          subject: `New Reunion waitlist crew: ${parsed.data.firstName}`,
          text: [
            `Name: ${parsed.data.firstName}`,
            `Email: ${parsed.data.email}`,
            `Crew: ${parsed.data.crewName || "Not named"}`,
            `Crew size: ${parsed.data.crewSize}`,
            `Affiliation: ${parsed.data.affiliationType}`,
            `Affiliation name: ${parsed.data.affiliationName || "Not provided"}`,
          ].join("\n"),
        });
        if (emailError) console.error("Waitlist alert failed", { name: emailError.name });
      } catch (notificationError) {
        console.error("Waitlist alert failed", {
          message: notificationError instanceof Error ? notificationError.message : "unknown",
        });
      }
    });
  }

  return json({ ok: true, status: "created" }, 201);
}
