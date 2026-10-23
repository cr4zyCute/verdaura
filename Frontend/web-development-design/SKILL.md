---
name: web-development-design
description: >-
  Comprehensive guide and standards for web development, creative UI/UX design,
  surface archetypes, anti-slop diagnostics, and design system references (Linear,
  Vercel, Stripe, Supabase, Notion, etc.). Use when designing, building, or auditing
  web applications, landing pages, dashboards, or UI components.
---

# Web Development & Design Master Guide

This guide consolidates Hermes's top web development and creative design skills (`claude-design` and `popular-web-designs`). It provides rigorous standards, surface archetypes, anti-slop diagnostics, and design system references (Stripe, Linear, Vercel, Notion, etc.) for building exceptional web artifacts, landing pages, dashboards, and prototypes.

---

## Part 1: Surface-First Composition (Commit Before Styling)

Most AI design "slop" is compositional, not cosmetic — reaching for a centered hero + three equal-weight feature cards for every surface. Before choosing colors or fonts, **commit out loud to one surface archetype**:

1. **Monitor** — The user watches state change (dashboards, status pages, observability). Density, glanceable hierarchy, no marketing framing.
2. **Operate** — The user takes action on things (consoles, admin panels, queues, inboxes). Action affordances and selection state dominate.
3. **Compare** — The user weighs options against each other (pricing, specs, search results). Aligned columns, parity of structure, one differentiator emphasized.
4. **Configure** — The user sets things up (settings, forms, wizards, onboarding). Progressive disclosure, clear save/validation states, low decoration.
5. **Decide / Learn** — The user is being convinced or taught (landing pages, docs, marketing). One idea lands per section; this is the **only** surface where a hero is usually correct.
6. **Explore** — The user browses an open space (galleries, maps, search-and-filter, catalogs). Filters, result grids, and zoom/peek are the composition.
7. **Command / Inspect** — The user drives by keyboard or drills into one object (command bars, inspectors, property editors). Speed and focus over breadth.

*Rule: The hero-plus-three-cards composition is correct for Decide/Learn only. Reaching for it anywhere else is the #1 tell.*

---

## Part 2: Slop Diagnostic (Self-Audit Before Polishing)

Score your UI out of 10 for AI tells (lower is better):

1. **Tech gradient** — Blue/violet/indigo glossy gradient on everything.
2. **Generic tech hue** — Default accent is indigo/violet without brand justification.
3. **Feature-tile grid** — Icon + heading + sentence × 3, all equal weight.
4. **Accent rail** — Colored left strip on cards.
5. **Unearned blur** — Glassmorphism with no real depth system.
6. **Monument stat** — Oversized numbers filling space meant for product story.
7. **Icon topper** — Rounded-square icon centered above every heading.
8. **Center stack** — Everything centered because no composition was committed to.
9. **Default type** — Inter (or system-ui) used blindly without typographic hierarchy.
10. **Wrong surface** — Composition doesn't match the surface archetype.

**Treatment Rules:**
- For tells 3, 8, 10: **Re-layout / re-compose** (revisit surface choice).
- For tells 1, 2, 9: **Recolor / re-typeset** (adjust palette and type scale).
- For tells 4, 5, 6, 7: **Remove decoration** and replace with real hierarchy (scale, weight, spacing).

---

## Part 3: Design Systems Catalog (54 Real Brands)

When building web apps or landing pages, match your design system to the brand vocabulary:

### Developer Tools & Platforms
- **Linear**: Ultra-minimal dark-mode, precise, purple accent (`#5e6ad2`), monospace data tags.
- **Vercel**: Black and white precision, Geist font system, border-radius rigor (`6px`/`8px`), subtle gray borders (`#333` dark / `#eaeaea` light).
- **Supabase**: Dark emerald theme (`#3ecf8e`), code-first developer tool, dark slate surfaces.
- **Cursor**: Sleek dark interface, gradient accents, command-palette centric.
- **Raycast**: Sleek dark chrome, vibrant gradient accents, keyboard shortcut badges.
- **PostHog**: Playful branding, developer-friendly dark UI, yellow/coral accents.

### Marketing & Infrastructure
- **Stripe**: Signature purple/blue gradients (`#635bff`), weight-300 elegance, precise drop shadows, polished micro-interactions.
- **Anthropic Claude**: Warm terracotta accent (`#cc785c`), clean editorial layout, serif headers, parchment/light warm backgrounds (`#faf9f5`).
- **Notion**: Warm minimalism, serif headings, soft surfaces, Notion gray borders, clean table/database aesthetics.
- **Apple**: Premium white space, SF Pro (or Inter), cinematic imagery, extreme typographic contrast.
- **Framer**: Bold black and blue, motion-first, design-forward landing page layouts.

---

## Part 4: Implementation Standards (HTML/CSS/JS)

When generating self-contained web artifacts:
- Use CSS custom properties for tokens (`--color-bg`, `--color-text`, `--color-accent`, etc.).
- Ensure responsive layouts using CSS Grid and Flexbox.
- Maintain accessible hit targets (minimum 44px on mobile).
- Keep code clean, semantic, and modular.
- Verify visually before delivery.
