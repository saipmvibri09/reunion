import { describe, expect, it } from "vitest";
import { classifyInsertError, waitlistSchema } from "../lib/waitlist";
import { consumeRateLimit, resetRateLimitsForTests } from "../lib/rate-limit";

const validLead = {
  firstName: "Asha",
  email: "ASHA@example.com",
  crewName: "Hostel 4",
  crewSize: "5_9",
  affiliationType: "hostel",
  affiliationName: "Osmania University",
  emailConsent: true,
  privacyVersion: "2026-10-15",
  website: "",
  startedAt: Date.now() - 2_000,
};

describe("waitlistSchema", () => {
  it("normalizes a valid lead", () => {
    const result = waitlistSchema.parse(validLead);
    expect(result.email).toBe("asha@example.com");
    expect(result.crewName).toBe("Hostel 4");
  });

  it("requires email consent", () => {
    const result = waitlistSchema.safeParse({ ...validLead, emailConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot content", () => {
    const result = waitlistSchema.safeParse({ ...validLead, website: "spam" });
    expect(result.success).toBe(false);
  });

  it("rejects unknown crew sizes", () => {
    const result = waitlistSchema.safeParse({ ...validLead, crewSize: "a_busload" });
    expect(result.success).toBe(false);
  });
});

describe("waitlist insertion outcomes", () => {
  it("classifies created, duplicate and database errors without leaking details", () => {
    expect(classifyInsertError(null)).toBe("created");
    expect(classifyInsertError({ code: "23505" })).toBe("already_joined");
    expect(classifyInsertError({ code: "42501" })).toBe("server_error");
  });
});

describe("rate limiting", () => {
  it("allows five attempts and throttles the sixth", () => {
    resetRateLimitsForTests();
    const now = Date.now();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(consumeRateLimit("test-client", now).allowed).toBe(true);
    }
    expect(consumeRateLimit("test-client", now).allowed).toBe(false);
  });
});
