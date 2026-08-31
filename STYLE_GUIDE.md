# Style Guide: Ashish Singh Portfolio

**Design direction: "Warm Refined Serif" (Direction 3).**
Editorial, warm, and professional. A serif display face carries the personality;
a clean sans keeps the content highly readable; a single restrained accent color
keeps everything disciplined. This document is the source of truth for any future
work on the site, so match it rather than inventing new patterns.

---

## 1. Typography

Fonts are loaded once via `@import` at the top of `style.css` (Google Fonts). Do
not add per-page font `<link>` tags; keep the single source of truth in the CSS.

| Role | Font | Notes |
|------|------|-------|
| Display / headings (`h1`, `h2`, `h3`), brand wordmark, card titles | **Fraunces** (serif) | weight 500–600, tight letter-spacing |
| Body copy, paragraphs, lists, hero copy | **Inter** (sans) | weight 400; 500–600 for emphasis |
| UI labels (nav, eyebrows, buttons, card meta, captions, slide counter) | **Inter** (sans) | often uppercase with letter-spacing |

CSS variables: `--font-display` (Fraunces) and `--font-body` (Inter).

**Type scale**
- `h1`: `clamp(2.1rem, 4.4vw, 3.4rem)`, Fraunces 600, `letter-spacing: -0.015em`, `line-height: 1.06`
- `h2`: `clamp(1.5rem, 3vw, 2.4rem)`, Fraunces 600
- `h3`: `1.2rem`, Fraunces 600
- Body: `1rem`–`1.08rem`, `line-height: 1.65`
- Eyebrow / label: `0.78rem`, Inter 600, `text-transform: uppercase`, `letter-spacing: 0.1em`, colored `--accent`

**Rules**
- Headings are sentence case, never ALL CAPS (uppercase is reserved for small eyebrow/label text).
- Two body weights only: 400 regular, 600 emphasis.

---

## 2. Color

Warm paper background, warm near-black ink, **one** accent (terracotta). The
previous three-accent scheme (blue / teal / amber) is retired; do not
reintroduce rotating accent colors on cards.

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#faf7f1` | page background (warm paper) |
| `--surface` | `#ffffff` | cards, panels, raised surfaces |
| `--ink` | `#1c1a17` | primary text, primary buttons |
| `--muted` | `#5c554b` | secondary/body text, captions |
| `--line` | `#e7e0d4` | hairline borders |
| `--accent` | `#b1572b` | eyebrows, links, card meta, summary markers, small accents |
| `--accent-dark` | `#8f4420` | accent hover / pressed |

**Accent discipline:** the accent appears in small doses: eyebrow labels, inline
links, the left rule on experience cards, list markers, hover states. It is never
a large fill behind body text. Primary buttons use `--ink`, not the accent.

---

## 3. Layout, spacing, shape

- **Radius:** `--radius: 6px` for cards/panels/inputs; `--radius-sm: 4px` for buttons. No fully-rounded corners except intentional pills (none currently).
- **Single-sided borders** (e.g. `border-left` accents) keep `border-radius: 0` on that element where it would conflict, or use a full border + accent rule.
- **Shadows:** minimal. Hairline borders do the structural work. A single soft shadow (`--shadow`) is reserved for genuinely floating media (hero portrait, slide stage, paper frame). Cards rely on borders, not drop shadows.
- **Section padding:** `clamp(56px, 8vw, 104px)` vertical, `clamp(18px, 5vw, 64px)` horizontal.
- **Content max-widths:** prose ~660px; wide content panels ~1120px.
- **Grid gaps:** 16–18px between cards; larger `clamp()` gaps between major regions.

---

## 4. Components

- **Header / nav:** sticky, translucent paper background with blur, hairline bottom border. Brand wordmark in Fraunces. Nav links Inter 600 in `--muted`; active/hover go to `--ink` with an `--accent` underline that scales in.
- **Buttons:** `--radius-sm`, Inter 600. `.primary` = `--ink` fill, paper text. `.secondary` / `.light` = transparent with `--ink` border. Hover lifts 2px. Keep a visible `:disabled` state for slide controls.
- **Cards** (`personality-grid`, `skills-grid`, `project-card`, `degree-card`, `artifact-card`, `photo-card`): white surface, hairline border, `--radius`, generous padding. **No colored top border.** Title in Fraunces, meta/eyebrow in `--accent`, body in `--muted`. Hover: border darkens to `--ink`/accent and/or a 2–4px lift.
- **Experience cards** (`resume-card`): white surface with a single `--accent` `border-left` (3px) for structure; same color on every card (no nth-child rotation).
- **Coursework** (`course-card` = `<details>`): summary in Fraunces 600, `::marker` in `--accent`. Open/close is height-animated via `script.js` (it wraps the content in `.course-reveal` and transitions its height; honors `prefers-reduced-motion`). Cards are intentionally **independent** (no shared `name` attribute), so the two columns expand separately.
- **Slide viewer / paper frame:** bordered surface with `--shadow`; controls use the button system.
- **Footer:** hairline top border, muted text, Inter. Copy line: `© <year> Ashish Singh` (no taglines).

---

## 5. Conventions for future work

- Reuse existing class names and the tokens above; don't hardcode hex values in new rules; reference the CSS variables.
- New pages: copy the `<head>` (which links only `style.css`) and the shared header/footer markup from an existing page so fonts and nav stay consistent.
- Keep markup accessible: `alt` text on images, `aria-label` on icon/landmark elements, visible focus/disabled states.
- Sentence case for headings and buttons; uppercase only for small eyebrow/label text.
- Test new pages at ≤900px and ≤580px, where the responsive breakpoints collapse multi-column grids to one column.
- **No em dashes (—) anywhere in site content or docs.** Use a comma, colon, semicolon, or parentheses instead, whichever reads most naturally.
