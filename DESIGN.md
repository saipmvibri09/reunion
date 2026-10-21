---
name: Reunion
description: A warm, high-energy editorial system that makes friendship the spectacle.
colors:
  midnight-ink: "#180c2b"
  softened-ink: "#2a173d"
  reunion-cream: "#f5e7d2"
  warm-paper: "#fff7e9"
  festival-amber: "#ffaa2b"
  reunion-coral: "#ff5a3d"
  editorial-magenta: "#ec2d7c"
  memory-violet: "#6d2c91"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(4rem, 9vw, 9.5rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  control: "999px"
  surface: "14px"
  utility: "8px"
spacing:
  field-gap: "1rem"
  group-gap: "1.35rem"
  page-inline: "clamp(1.25rem, 4vw, 4.5rem)"
  section-block: "clamp(5rem, 10vw, 9rem)"
components:
  button-sun:
    backgroundColor: "{colors.festival-amber}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.2rem"
    height: "52px"
  button-ink:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.2rem"
    height: "52px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-ink}"
    rounded: "0"
    padding: "0.8rem 0"
    height: "52px"
  waitlist-surface:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.surface}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
---

# Design System: Reunion

## Overview

**Creative North Star: "The Living Reunion Poster"**

Reunion feels like a festival poster that has come alive around a group of old friends. It is loud in scale but warm in intent: photographic, editorial, and unmistakably human. Condensed type, saturated blocks of colour, pass-like metadata, and deep ink fields supply the event energy; cream paper, candid group imagery, and direct language keep the experience intimate.

The system is deliberately disciplined. Each section has one clear compositional gesture, with the Then & Now comparison carrying the signature interaction. The interface does not borrow spectacle from an invented stage or lineup; the visual hierarchy consistently makes the crew the hero.

**Key Characteristics:**

- Oversized, tightly set condensed headlines with short line lengths.
- Warm, full-bleed group photography treated as editorial evidence, not decoration.
- Saturated amber, coral, violet, and magenta used as sectional fields against ink and paper.
- Mono metadata that evokes tickets, passes, dates, and crew records.
- Mostly flat surfaces, with depth reserved for the interactive photograph and conversion form.

## Colors

The palette moves between nocturnal festival ink and sun-warmed paper, with bright accents assigned to decisive moments rather than scattered decoration.

### Primary

- **Midnight Ink:** The grounding canvas, body text, dark buttons, and footer field.
- **Festival Amber:** The primary action colour, highlighted headline lines, and interactive handles.

### Secondary

- **Reunion Coral:** Emotional section fields and high-energy conversion framing.
- **Memory Violet:** Reflective statements, supporting banners, and secondary action emphasis.

### Tertiary

- **Editorial Magenta:** Focus states, small moments of emphasis, and the hero atmospheric glow.
- **Softened Ink:** A tonal dark surface behind media when the image has not filled its frame.

### Neutral

- **Reunion Cream:** The main editorial background.
- **Warm Paper:** Light text on ink and the raised waitlist surface.

### Named Rules

**The Warm Contrast Rule.** Use warm paper rather than pure white, and midnight ink rather than black; the palette should feel printed and lived-in, not clinical.

**The Section Field Rule.** Saturated colour belongs to a whole message or action area. Do not sprinkle every accent into the same composition.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)

**Body Font:** Manrope (with sans-serif fallback)

**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** The pairing combines poster urgency with friendly readability. IBM Plex Mono turns confirmed logistics and crew metadata into ticket-like evidence.

### Hierarchy

- **Display** (700–800, fluid 4–9.5rem range, 0.76–0.82 line-height): Hero statements, section titles, rallies, and experience names; always uppercase and tightly tracked.
- **Headline** (700, fluid 3.2–7.8rem range, 0.82 line-height): Secondary editorial headlines with a maximum width around 9–14 characters.
- **Title** (800, 1.6–2.35rem, 1 line-height): Wordmarks, image labels, and compact display moments.
- **Body** (400–800, 1–1.32rem, 1.55–1.7 line-height): Explanatory copy held to roughly 26–54 characters per line.
- **Label** (600, 0.65–0.82rem, 0.08em tracking, uppercase): Dates, indexes, categories, and operational metadata.

### Named Rules

**The Poster Voice Rule.** Use the condensed face for short declarations, never for paragraphs or form instructions.

**The Evidence Voice Rule.** Use the mono face only for facts and metadata; its scarcity makes event details feel trustworthy.

## Layout

The page uses a full-bleed editorial sequence with fluid inline padding (`clamp(1.25rem, 4vw, 4.5rem)`) and generous block spacing. Desktop compositions alternate between asymmetric two-column grids, full-width photographic frames, and typographic fields. Long text remains narrow while headlines deliberately occupy more visual space.

At 900px the story, experience introduction, and waitlist collapse to one column. At 680px the hero keeps the CTA above the fold, experience modules become a vertical image-then-copy rhythm, form pairs become single fields, and Then & Now becomes two naturally scrolling figures instead of a hidden interaction. Touch targets stay at least 44px.

## Elevation & Depth

The system is flat by default. Depth comes from full-bleed imagery, saturated tonal fields, and scale rather than stacked cards. Two structural shadows are used: a directional edge shadow on the Then & Now reveal, and a broad ambient shadow beneath the waitlist surface.

### Shadow Vocabulary

- **Reveal Edge** (`12px 0 40px rgba(24, 12, 43, 0.3)`): Separates archival and present-day photographs while dragging.
- **Conversion Lift** (`0 24px 70px rgba(24, 12, 43, 0.22)`): Lifts the paper form above its coral field.

### Named Rules

**The Two Shadows Rule.** Do not add generic card shadows. Depth is reserved for the signature comparison and the conversion surface.

## Shapes

The dominant language is rectangular and editorial. Major media and the waitlist surface use gently rounded 14px corners; pills are reserved for actions, dates, metadata, and small labels. Form controls remain square and underline-led so the form feels printed rather than app-like.

## Components

### Buttons

- **Shape:** Full pill with a minimum 52px height and balanced inline padding.
- **Primary:** Festival amber on midnight ink; switches to warm paper on hover and rises 2px.
- **Hover / Focus:** 220ms expressive ease for motion; all keyboard focus receives a 3px amber outline with 4px offset.
- **Dark:** Midnight ink on warm paper; changes to memory violet on hover.

### Cards / Containers

- **Corner Style:** Gently rounded major surfaces (14px); images clip inside their frame.
- **Background:** Warm paper for conversion, solid accent fields for editorial experiences.
- **Shadow Strategy:** Flat except for the conversion surface.
- **Internal Padding:** Fluid 1.5–2.5rem for conversion and 2.5–6rem for editorial panels.

### Inputs / Fields

- **Style:** Transparent surface, no side walls, and a single low-contrast bottom rule; minimum height 52px.
- **Focus:** The underline becomes editorial magenta with a matching 2px shadow line.
- **Error / Disabled:** Native semantic validation is retained; disabled submit buttons remain legible at 68% opacity.

### Navigation

The header sits directly on hero photography with a fine warm-paper divider. The display wordmark anchors the left; navigation is compact, bold Manrope. Below 900px, secondary links disappear and the waitlist pill remains.

### Then & Now Comparison

One matched split image fills a wide rounded frame. A circular amber drag handle reveals the archival side over the present-day side; explicit Then and Now labels ensure the meaning is not motion-dependent. Mobile renders both images in sequence with captions.

### Experience Modules

Large images and solid-colour copy panels alternate sides on desktop. On mobile they become a consistent vertical image-then-copy sequence. A restrained 2.5% image scale is the only repeated hover flourish.

## Do's and Don'ts

### Do:

- **Do** make the people and their shared history the visual subject.
- **Do** let one oversized statement lead each section.
- **Do** use the mono voice for confirmed logistics, indices, and crew metadata.
- **Do** provide a complete non-animated reading path and replace pointer-only interactions on mobile.
- **Do** use accent fields boldly, one dominant colour at a time.

### Don't:

- **Don't** invent performers, crowd scenes, testimonials, or social proof.
- **Don't** turn the interface into a collection of floating cards or generic SaaS components.
- **Don't** mix every accent colour inside one section without a semantic reason.
- **Don't** add decorative motion beyond the signature comparison and restrained state feedback.
- **Don't** use pure black, pure white, or a system display face as a shortcut.
