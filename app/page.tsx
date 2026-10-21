import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { ThenNow } from "@/components/then-now";
import { WaitlistForm } from "@/components/waitlist-form";

const experiences = [
  {
    title: "Play for old glory",
    label: "Games & crew competition",
    copy: "Schools, colleges and crews meet again over playful challenges, quick thinking and the rivalries that never really graduated.",
    image: "/images/experience-games.png",
    alt: "Friends cheering during an outdoor festival game",
  },
  {
    title: "Follow the clues",
    label: "The hunt",
    copy: "Move through the festival with your people—solving nostalgia clues, finding surprises and making a few new stories on the way.",
    image: "/images/experience-hunt.png",
    alt: "A group of friends solving a clue at a festival market",
  },
  {
    title: "Stay for one more story",
    label: "Food, flea & conversation",
    copy: "Hyderabad favourites, creator finds and places designed for friends to sit, talk and lose track of time together.",
    image: "/images/experience-flea.png",
    alt: "Friends sharing food at a lively evening flea market",
  },
];

const crewTypes = ["School friends", "College crews", "Hostel gangs", "First-job friends", "Old neighbourhoods"];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/reunion-hero.png"
          alt="A group of friends laughing together at an evening festival"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <header className="site-header">
          <Link href="/" className="wordmark" aria-label="Reunion home">REUNION</Link>
          <nav aria-label="Primary navigation">
            <a href="#story">Why Reunion</a>
            <a href="#experience">The experience</a>
            <a className="nav-cta" href="#waitlist">Join the waitlist</a>
          </nav>
        </header>

        <div className="hero-content" id="main-content">
          <p className="event-stamp">Hyderabad · Boulder Hills · December 2026</p>
          <h1 id="hero-title">
            <span>Your people are</span>
            <strong>the headliner.</strong>
          </h1>
          <div className="hero-action-row">
            <p>The festival of friendship. One evening built around the people you come with.</p>
            <a className="button button--sun" href="#waitlist">
              Join the waitlist <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>4 PM—10 PM</span>
          <a href="#story">Keep scrolling <ArrowDown /></a>
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <div className="story-rule" aria-hidden="true"><span /></div>
        <div className="story-grid">
          <h2 id="story-title">We once met every day.</h2>
          <div className="story-copy">
            <p>Then we graduated. Careers began. Cities changed. Families grew. Life moved on.</p>
            <p>And somehow the people who knew everything about us became a group chat.</p>
            <p className="story-turn">When everyone gets together again, nothing really changes.</p>
          </div>
        </div>
        <p className="story-thesis">We don’t miss the place. <strong>We miss the people we shared it with.</strong></p>
      </section>

      <section className="memory" aria-labelledby="memory-title">
        <div className="section-intro">
          <h2 id="memory-title">Some photographs deserve a sequel.</h2>
          <p>Same people. Same pose. Different chapter.</p>
        </div>
        <ThenNow />
        <div className="memory-footer">
          <span>#ThenAndNowAtReunion</span>
          <p>Bring the photograph. We’ll help you make the next one.</p>
        </div>
      </section>

      <section className="experience" id="experience" aria-labelledby="experience-title">
        <div className="experience-heading">
          <h2 id="experience-title">One festival. More than one reason to come together.</h2>
          <p>Music brings you in. Shared experiences keep your whole crew in the story.</p>
        </div>
        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-item" key={experience.title}>
              <div className="experience-image-wrap">
                <Image
                  src={experience.image}
                  alt={experience.alt}
                  fill
                  sizes="(max-width: 800px) 100vw, 56vw"
                  quality={88}
                />
              </div>
              <div className="experience-copy">
                <span>{experience.label}</span>
                <h3>{experience.title}</h3>
                <p>{experience.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="music-banner">
          <p>The soundtrack of your best years</p>
          <strong>Reunion Live</strong>
          <span>Line-up coming soon</span>
        </div>
      </section>

      <section className="crews" aria-labelledby="crews-title">
        <div className="crews-heading">
          <h2 id="crews-title">You don’t come to Reunion alone.</h2>
          <p>Name your people. Bring the group chat to life.</p>
        </div>
        <div className="crew-roll" aria-label="The kinds of crews Reunion brings together">
          {crewTypes.map((crew, index) => (
            <div className="crew-row" key={crew}>
              <span>{crew}</span>
              <span>{index % 2 === 0 ? "Still close" : "Long overdue"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title">
        <div className="waitlist-heading">
          <p>Hyderabad · December 2026</p>
          <h2 id="waitlist-title">Who are you coming with?</h2>
          <span>Join early. We’ll email you when there’s something worth gathering the group for.</span>
        </div>
        <WaitlistForm />
      </section>

      <footer className="site-footer">
        <div className="footer-rally">
          <span>Don’t just remember</span>
          <strong>the good times.</strong>
          <em>Relive them.</em>
        </div>
        <div className="footer-meta">
          <Link href="/" className="wordmark">REUNION</Link>
          <p>The Festival of Friendship · Hyderabad · December 2026</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <a href="mailto:hello@reunionfestival.in">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
