"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import type { WaitlistResponse } from "@/lib/waitlist";
import { ArrowUpRight } from "@/components/icons";

const errorCopy: Record<string, string> = {
  invalid_request: "Check the highlighted details and try again.",
  bot_rejected: "Refresh the page and try again.",
  rate_limited: "Too many attempts. Give it a few minutes, then try again.",
  configuration_error: "The waitlist is being connected. Please check back shortly.",
  server_error: "We could not save your place. Try again.",
};

function attribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    referrer: document.referrer || undefined,
  };
}

export function WaitlistForm() {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "created" | "already_joined" | "error">("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function markStarted() {
    if (started) return;
    startedAt.current = Date.now();
    setStarted(true);
    track("waitlist_start");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setMessage("Complete the required details before joining.");
      return;
    }
    const data = new FormData(form);
    setStatus("submitting");
    setMessage("");

    const payload = {
      firstName: data.get("firstName"),
      email: data.get("email"),
      crewName: data.get("crewName"),
      crewSize: data.get("crewSize"),
      affiliationType: data.get("affiliationType"),
      affiliationName: data.get("affiliationName"),
      emailConsent: data.get("emailConsent") === "on",
      privacyVersion: "2026-10-15",
      website: data.get("website"),
      turnstileToken: data.get("cf-turnstile-response") || undefined,
      startedAt: startedAt.current,
      ...attribution(),
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as WaitlistResponse;

      if (result.ok) {
        setStatus(result.status);
        setMessage(
          result.status === "created"
            ? "You’re on the list. We’ll email you when the next chapter drops."
            : "You’re already on the list. Your crew still knows where to find you.",
        );
        track(result.status === "created" ? "waitlist_success" : "waitlist_duplicate");
        form.reset();
      } else {
        setStatus("error");
        setMessage(errorCopy[result.code] || result.message);
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the waitlist. Check your connection and try again.");
    }

    requestAnimationFrame(() => resultRef.current?.focus());
  }

  async function share() {
    const shareData = {
      title: "Reunion — The Festival of Friendship",
      text: "Who are you coming with? Join me at Reunion in Hyderabad, December 2026.",
      url: window.location.origin,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setMessage("Invite copied. Drop it in the group chat.");
    }
    track("crew_share");
  }

  const complete = status === "created" || status === "already_joined";

  return (
    <div className="waitlist-shell">
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      ) : null}
      <form className="waitlist-form" onSubmit={submit} onFocus={markStarted} noValidate>
        <div className="field-grid field-grid--two">
          <label>
            <span>First name</span>
            <input name="firstName" autoComplete="given-name" required minLength={2} placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
        </div>

        <div className="field-grid field-grid--two">
          <label>
            <span>Crew name <em>optional</em></span>
            <input name="crewName" maxLength={80} placeholder="The backbenchers" />
          </label>
          <label>
            <span>How many of you?</span>
            <select name="crewSize" defaultValue="2_4" required>
              <option value="solo">Just me—for now</option>
              <option value="2_4">2–4 people</option>
              <option value="5_9">5–9 people</option>
              <option value="10_plus">10+ people</option>
            </select>
          </label>
        </div>

        <div className="field-grid field-grid--two">
          <label>
            <span>Where did you meet?</span>
            <select name="affiliationType" defaultValue="college" required>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="first_job">First job</option>
              <option value="hostel">Hostel</option>
              <option value="neighbourhood">Neighbourhood</option>
              <option value="other">Somewhere else</option>
            </select>
          </label>
          <label>
            <span>Name the place <em>optional</em></span>
            <input name="affiliationName" maxLength={80} placeholder="College, school or company" />
          </label>
        </div>

        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            data-theme="light"
          />
        ) : null}

        <label className="consent-row">
          <input name="emailConsent" type="checkbox" required />
          <span>
            Email me Reunion announcements and waitlist updates. I can unsubscribe anytime. Read the{" "}
            <Link href="/privacy">privacy note</Link>.
          </span>
        </label>

        <button className="button button--ink form-submit" type="submit" disabled={status === "submitting"}>
          <span>{status === "submitting" ? "Saving your place…" : "Join the waitlist"}</span>
          <ArrowUpRight />
        </button>
      </form>

      <div
        ref={resultRef}
        className={`form-result${complete ? " form-result--success" : ""}`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        {message ? <p>{message}</p> : <p>Bring the people who still know all your old stories.</p>}
        {complete ? (
          <button className="text-button" type="button" onClick={share}>
            Share with your crew <ArrowUpRight />
          </button>
        ) : null}
      </div>
    </div>
  );
}
