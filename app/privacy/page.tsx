import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy note — Reunion",
  description: "How Reunion handles pre-launch waitlist information.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header>
        <Link href="/" className="wordmark">REUNION</Link>
        <Link href="/">Back to the festival</Link>
      </header>
      <article>
        <h1>Your details stay with the guest list.</h1>
        <p className="legal-lede">This privacy note covers the Reunion pre-launch waitlist.</p>
        <h2>What we collect</h2>
        <p>We collect your first name, email address, optional crew details, affiliation, consent record, referral URL and campaign attribution.</p>
        <h2>Why we collect it</h2>
        <p>We use this information to manage the waitlist, understand which communities are interested, and email relevant event announcements. We do not sell your information.</p>
        <h2>How long we keep it</h2>
        <p>We retain waitlist information while Reunion 2026 is active and for a limited period afterward for event operations, unless the law requires longer retention.</p>
        <h2>Your choices</h2>
        <p>You can unsubscribe from any campaign email. To ask for access, correction or deletion, email <a href="mailto:privacy@reunionfestival.in">privacy@reunionfestival.in</a>.</p>
        <h2>Service providers</h2>
        <p>Reunion uses Supabase for secure data storage, Vercel for hosting and analytics, and Resend for organizer notifications and campaign email infrastructure.</p>
        <p className="legal-updated">Effective 15 October 2026.</p>
      </article>
    </main>
  );
}
