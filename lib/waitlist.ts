import { z } from "zod";

export const crewSizes = ["solo", "2_4", "5_9", "10_plus"] as const;
export const affiliationTypes = [
  "school",
  "college",
  "first_job",
  "hostel",
  "neighbourhood",
  "other",
] as const;

const optionalShortText = z
  .string()
  .trim()
  .max(80, "Keep this under 80 characters.")
  .optional()
  .transform((value) => value || null);

export const waitlistSchema = z.object({
  firstName: z.string().trim().min(2, "Tell us your first name.").max(60),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
  crewName: optionalShortText,
  crewSize: z.enum(crewSizes),
  affiliationType: z.enum(affiliationTypes),
  affiliationName: optionalShortText,
  emailConsent: z.literal(true, { error: "Consent is required to join the waitlist." }),
  privacyVersion: z.literal("2026-10-15"),
  utmSource: optionalShortText,
  utmMedium: optionalShortText,
  utmCampaign: optionalShortText,
  referrer: z.string().trim().max(500).optional().transform((value) => value || null),
  website: z.string().max(0, "Bot check failed."),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistResponse =
  | { ok: true; status: "created" | "already_joined" }
  | {
      ok: false;
      code:
        | "invalid_request"
        | "bot_rejected"
        | "rate_limited"
        | "configuration_error"
        | "server_error";
      message: string;
      fields?: Record<string, string[]>;
    };

export function classifyInsertError(error: { code?: string } | null) {
  if (!error) return "created" as const;
  if (error.code === "23505") return "already_joined" as const;
  return "server_error" as const;
}
