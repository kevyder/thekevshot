# Design System: thekevshot
**Project ID:** thekevshot — Kevin Rodríguez Street Photography Portfolio

## 1. Visual Theme & Atmosphere

The aesthetic is **editorial-minimalist, gallery-grade, and monochrome**. The interface behaves like the wall of a contemporary photography exhibition: bright, quiet, breathable white space lets the photographs dominate, while the chrome — type, borders, controls — recedes into the background. Every UI element exists to support the image, never to compete with it.

Mood keywords: **Quiet, confident, restrained, utilitarian, breathable, photography-first**.

Density is intentionally low. Whitespace is treated as a design material, not a byproduct. The single deliberate exception to the monochrome palette is a tightly-scoped red used exclusively for error states, so it never blends with the imagery.

The system is **flat by default** — surfaces sit on white with no shadows or borders unless interaction demands them. Depth is borrowed only at the moment of interaction (hover lift, focus ring, modal curtain).

## 2. Color Palette & Roles

### Neutrals (the working palette)

- **Pure Black** (`#000000`) — Brand wordmark, dominant accents, the deepest contrast point.
- **Ink Black** (`#111111`) — Primary body text, submit-button fill, focus outline color.
- **Charcoal Gray** (`#333333`) — Hamburger menu lines, the in-between tone.
- **Steel Gray** (`#666666`) — Inactive navigation links, social icon idle state, carousel nav buttons, form helper text.
- **Whisper Gray** (`#999999`) — Tertiary text, muted metadata.
- **Caption Gray** (`#444444` / `#555555`) — Carousel captions, thank-you body text.
- **Hairline Gray** (`#e0e0e0`) — One-pixel dividers, link-button borders, social-icon separator.
- **Overcast Gray** (`#cccccc`) — Default form input stroke.
- **Skeleton Gray** (`#f0f0f0`) — Image placeholder background while loading.
- **Off-White** (`#f5f5f5`) — Subtle surface fill for link buttons.
- **Marble White** (`#ffffff`) — Page background, button-hover text.

### Accents

- **Error Crimson** (`#d32f2f`) — Page-level failure messages ("Failed to load gallery").
- **Form Error Red** (`#b00020`) — Per-field validation text.
- **Hot Brand Red** (`#c00`) — Reserved homepage indicator (sparingly used).

### Overlays & Shadow Tints

- **Theatrical Black** (`rgba(0, 0, 0, 0.95)`) — Full-screen modal backdrop. The stage curtain.
- **Soft Shade** (`rgba(0, 0, 0, 0.6)`) — Image gradient base (gallery cards, hover darken).
- **Deeper Shade** (`rgba(0, 0, 0, 0.75)`) — Image gradient on hover.
- **Whisper Shadow Tint** (`rgba(0, 0, 0, 0.08)`) — Soft focus ring.
- **Whisper Shadow** (`rgba(0, 0, 0, 0.10)`) — Profile image lift (links page).
- **Soft Shadow** (`rgba(0, 0, 0, 0.12)`) — Profile image lift (about page).
- **Confident Shadow** (`rgba(0, 0, 0, 0.15)`) — Link-button hover, the boldest elevation.
- **Text-Readability Veil** (`rgba(0, 0, 0, 0.3)`) — Drop shadow behind gallery titles.
- **Glass White** (`rgba(255, 255, 255, 0.98)`) — Mobile menu backdrop, near-opaque to preserve legibility.
- **Glass White Light** (`rgba(255, 255, 255, 0.1)`) — Modal close/nav button base.
- **Glass White Soft** (`rgba(255, 255, 255, 0.2)`) — Modal control hover state.

### Functional Color Rules

- **No blue, green, purple, or brand-secondary hues.** Anything chromatic in this system is a red, and that red is for failures only.
- **No gradients on text or surfaces** except photographic overlays.
- **No color in icons** — all social icons are stroke-only and inherit `currentColor`, allowing gray-to-black tonal control.

## 3. Typography Rules

### Font Families

- **Display / Brand:** **Oswald**, weight 800 only. The system speaks in one voice — there is no Oswald 400, 500, 600, or 700. Heaviness is the personality.
- **Body / UI:** **Hind**, weight 400 only. The same restraint applies — no bold body copy outside of display contexts.

Both families are loaded from Google Fonts; preconnect hints are wired for performance.

### Display Typography (Oswald 800)

- **Wordmark / Brand:** 1.25rem desktop, 1.1rem tablet, 1rem mobile. Letter-spacing `0.1em` desktop, `0.08em` tablet. Uppercase, never lowercase.
- **Page Titles** ("GALLERY", "LINKS"): `2rem`, uppercase, centered.
- **Thank-You Headings:** `1.75rem`, uppercase, letter-spacing `0.05em`.

### Body Typography (Hind 400)

- **Base size:** `1rem` (16px). Line-height: `1.6` for readability.
- **Navigation links:** `0.9rem` desktop, `1.1rem` mobile. Letter-spacing `0.1em` desktop, `0.15em` mobile. Uppercase.
- **Form labels:** `0.9rem`, weight 600 (Hind's only weight exception), uppercase, letter-spacing `0.02em`.
- **Form inputs / textareas:** `1rem`, weight 400, no uppercase.
- **Form errors:** `0.85rem`, weight 400, color Form Error Red.
- **Field errors / captions:** `0.875rem`–`0.95rem`, soft gray tones.
- **Submit button label:** `0.9rem`, weight 600, uppercase, letter-spacing `0.08em`.

### Letter-Spacing Character

The system loves **breathing room between letters**. Tracking ranges from `0.02em` (form labels) to `0.15em` (mobile nav links), giving every label a deliberate, editorial cadence. Tracking reinforces the uppercase identity of the brand voice.

### Typography Anti-Patterns

- No italic.
- No font-weight transitions on hover.
- No Oswald below 800. No Hind above 400 (except labels at 600, which is a structural exception, not a style choice).

## 4. Component Stylings

### Buttons

- **Primary submit button** (Contact form): Ink Black (`#111111`) fill with Marble White (`#ffffff`) text. Square-ish, subtly squared corners (`2px` radius). On hover, the colors invert — the button becomes a black outline on white. Letter-spaced `0.08em`, uppercase. Disabled state drops opacity to `0.5` and disables the cursor.
- **Carousel nav buttons**: frameless, Steel Gray (`#666666`) arrows at `72px` desktop / `56px` tablet / `44px` mobile. No background, no border, no shadow — just the chevron stroke at `1.5px` thickness. Hover/active state pushes to Pure Black (`#000000`).
- **Modal close button** (gallery lightbox): `48px` square, Glass White Light background (`rgba(255,255,255,0.1)`), Marble White icon, `4px` corner radius. Hover deepens the glass to `0.2` opacity.
- **Link buttons** (Links page): full-width (max `400px`), Off-White (`#f5f5f5`) fill, `1px` Hairline Gray (`#e0e0e0`) stroke, `8px` corners, `1px` letter spacing. Idle state is quiet. On hover, the button fills with Ink Black (`#111111`) and inverts to white text, then lifts with a Confident Shadow (`rgba(0,0,0,0.15)`). This is the only button in the system that gains a shadow.

### Cards / Containers

- **Gallery cards** (collection page): `1:1` square aspect, no border, no shadow at rest. Image zooms to `1.05` on hover (400ms ease-out), and the card itself lifts `4px` upward over a 200ms transition. A gradient veil (transparent → Soft Shade 60% black) anchors at the bottom; on hover, the gradient deepens to Deeper Shade 75% black.
- **Gallery title overlay** (on top of card image): Oswald 800, `1.25rem` desktop / `1rem` mobile, uppercase, centered, white. Backed by a `0 2px 4px rgba(0,0,0,0.3)` text shadow so the title remains readable over any image.
- **Image containers** (gallery detail page): `1:1` square, `4px` corner radius, Skeleton Gray (`#f0f0f0`) placeholder. Subtle `1.05` image zoom on hover; no card lift, only a soft scale on the image.
- **Link buttons** double as cards on the Links page — see above.

### Inputs / Forms

- **Text inputs and textareas**: `1px` Overcast Gray (`#cccccc`) stroke, `2px` corner radius, white fill, padding `0.625rem 0.75rem`. On focus, the stroke darkens to Ink Black (`#111111`); the default browser outline is suppressed.
- **Textarea**: vertically resizable only, minimum height `120px`.
- **Labels**: positioned above the input, uppercase, weight 600, `0.9rem`.
- **Error messages**: rendered below the field in `0.85rem` Form Error Red (`#b00020`), with `role="alert"`.
- **Form layout**: First/Last name fields share a row on desktop, stacking on screens narrower than `480px`. The Turnstile widget and submit button are centered. Form max-width: `600px`.

### Navigation

- **Brand wordmark** (left): Oswald 800, Pure Black, never changes color.
- **Nav links** (right): Steel Gray idle, Pure Black on hover, Pure Black when active (`.router-link-active`). `0.2s ease` color transition.
- **Social icons** (desktop, far right): `24×24px` line-stroke SVGs inheriting `currentColor`, separated from the nav links by a Hairline Gray (`#e0e0e0`) left border. Idle: `invert(40%)` (which renders them as Steel Gray). Hover: `invert(0%)` (Pure Black).
- **Mobile burger**: Three `2px` Charcoal Gray (`#333333`) lines, animates to a clean X with a `cubic-bezier(0.55, 0, 0.1, 1)` curve over `400ms`.

### Image Overlays & Captions

- **Gallery card overlay**: Vertical gradient, transparent at top → Soft Shade (`rgba(0,0,0,0.6)`) at bottom, deepening to `0.75` on hover. Used to anchor the title text to the image.
- **Image viewer modal**: full-bleed Theatrical Black (`rgba(0,0,0,0.95)`) overlay. Image sits centered, `object-fit: contain`, max `90vw` × `90vh`.

### Modals

- **Gallery lightbox**: full-viewport fixed position, `z-index: 1000`. Theatrical Black backdrop. No drop shadow on the backdrop itself — the curtain effect is created by opacity, not blur or shadow. Image counter and caption float at the bottom in Whisper Gray (`#cccccc`).

## 5. Layout Principles

### Whitespace Strategy

The system treats empty space as the design's most important ingredient. Pages are anchored to the top of the viewport rather than vertically centered, so visitors encounter the headline first. The homepage is the deliberate exception — a full-viewport photo carousel fills the entire screen with no scroll, because the photograph IS the page.

### Spacing Scale

- **Inline gap between nav items**: `2.5rem` desktop.
- **Form field gap**: `1.25rem`.
- **Name-row gap**: `1rem` desktop, `1.25rem` mobile.
- **Mobile menu link gap**: `2rem` vertical.
- **Section padding (most pages)**: `2rem 5rem` desktop, `1.25rem` mobile.

### Max-Widths

- **Contact form**: `600px` — a comfortable, focused reading width.
- **Links button stack**: `400px` — narrow column for thumb-friendly tapping.
- **Carousel image**: `1000px` — wide enough to feel cinematic, narrow enough to keep viewer focus.
- **Gallery detail images**: full-bleed within their grid cell.

### Grid Alignment

- **Gallery collection page**: 3 equal columns desktop (`≥768px`), 1 column mobile. Cards are tightly packed with no internal padding.
- **Gallery detail page**: 4 equal columns desktop (`≥768px`), 1 column mobile. Images are `1:1` squares with consistent gaps.
- **Links page**: single vertical column, fully centered.
- **About page**: single column, fully centered, profile image at top.

### Breakpoints

- `480px` — phone-only adjustments (form name-row stacks, navbar padding tightens).
- `768px` — tablet/desktop boundary (burger ↔ full nav, multi-column grids activate, modal controls resize).
- `1024px` — used implicitly for image sizing screens, no hard layout switch.

### Responsive Philosophy

Mobile is the foundation, not an afterthought. The first paint at any width is the same content hierarchy — just reflowed. The hamburger menu uses the same `0.3s` cubic-bezier easing as the desktop nav transitions, so the experience feels continuous across form factors.

### Layout Anti-Patterns

- No full-viewport centering that pushes content below the fold.
- No forced full-page height except on the homepage carousel.
- No nested grid systems — every layout is a single grid or flex.
- No drop shadows on white surfaces except the three documented use cases (profile image, link-button hover, gallery card hover).

## 6. Dark Mode Variant

### 6.1 Atmosphere

The dark mode shifts the experience from a **bright, quiet gallery wall** to a **darkroom at night**: a deep, immersive, OLED-friendly black canvas that lets street photographs sit inside the void the way they were framed for. The photography-first ethos is preserved — only the *container* changes, not the *contents*. Mood keywords: **Cinematic, nocturnal, suspended, contemplative, OLED-optimized**.

Activation is **automatic via `prefers-color-scheme: dark`**. There is no toggle in the nav, no theme picker, no light/dark switch in the footer. The system trusts the visitor's operating-system preference and stays out of the way. To prevent the dreaded theme flash on first paint, the initial state must be detected server-side or via a blocking inline script before any rendered pixels arrive.

The dark variant is **shape-faithful** to the light variant. Geometry, spacing, type, and motion are identical. Only color tokens shift.

### 6.2 Color Palette (Dark)

#### Neutrals — Token Mapping

Every light token has a dark counterpart. The mapping preserves *role* while inverting *value* on the luminance axis.

| Light Token | Dark Token | Hex | Role (preserved) |
|---|---|---|---|
| Pure Black (`#000000`) | **Soft Bone White** | `#e8e6e3` | Foreground text, dominant accents. Warm-tinted to avoid the blue-cast fatigue of pure white on OLED. |
| Ink Black (`#111111`) | **Marble White** | `#f5f5f5` | Primary text, focus outline. Reserved for highest-contrast moments where the foreground must be emphatic. |
| Charcoal Gray (`#333333`) | **Pale Stone** | `#cfcdc9` | Hamburger menu lines, intermediate tone. |
| Steel Gray (`#666666`) | **Ash Gray** | `#8a8a8a` | Inactive nav links, social icon idle, carousel nav buttons, form helper text. |
| Whisper Gray (`#999999`) | **Mist Gray** | `#6a6a6a` | Tertiary text, muted metadata. (Intentional: Mist reads slightly *more present* on black than Whisper does on white — the eye recalibrates.) |
| Caption Gray (`#444444` / `#555555`) | **Parchment** | `#b8b6b2` | Carousel captions, thank-you body text. |
| Hairline Gray (`#e0e0e0`) | **Charcoal Veil** | `#2a2a2a` | One-pixel dividers, link-button borders, social-icon separator. Sits *above* the canvas, not on it. |
| Overcast Gray (`#cccccc`) | **Slate Stroke** | `#3a3a3a` | Default form input stroke. |
| Skeleton Gray (`#f0f0f0`) | **Loading Charcoal** | `#1a1a1a` | Image placeholder background while loading. |
| Off-White (`#f5f5f5`) | **Obsidian Surface** | `#141414` | Subtle surface fill for link buttons (one notch above pure black, used for layered surfaces). |
| Marble White (`#ffffff`) | **OLED Black** | `#000000` | Page background. The canvas. Maximum OLED contrast. |

#### Accents (Dark)

- **Error Amber-Red** (`#ff6b6b`) — replaces Error Crimson. Lifted brighter and slightly warmer so it remains perceivable on a black canvas; still red, still error-only, never used decoratively.
- **Soft Coral** (`#ff8a8a`) — replaces Form Error Red. Per-field validation, softened for dark-mode legibility without losing its warning identity.
- **Hot Brand Red** → **Bright Vermilion** (`#ff4444`) — homepage indicator only. Slightly brightened from the light-mode `#c00` for visibility on black.

#### Overlays & Elevation (Dark)

The shadow grammar inverts in dark mode: shadows become **glows**. A `rgba(0,0,0,X)` drop shadow has no visible counterpart on a black canvas, so warm white halos take over the same elevation role.

- **Opaque Charcoal** (`rgba(10, 10, 10, 0.98)`) — full-screen modal backdrop. The page is already `#000000`, so the modal must use a *slightly different* charcoal plus a `12px` backdrop blur to read as "another plane."
- **Soft Shade** (`rgba(0, 0, 0, 0.6)`) — image gradient base (gallery cards, hover darken). **Unchanged** — black-on-black still works because the gradients sit *on top of* the photograph, not the page.
- **Deeper Shade** (`rgba(0, 0, 0, 0.75)`) — image gradient on hover. **Unchanged**.
- **Text-Readability Veil** (`rgba(0, 0, 0, 0.3)`) — drop shadow behind gallery titles. **Unchanged**.
- **Whisper Glow** (`rgba(232, 230, 227, 0.08)`) — replaces Whisper Shadow Tint. Soft focus ring on dark.
- **Whisper Glow** (`rgba(232, 230, 227, 0.10)`) — replaces Whisper Shadow. Profile image lift on the Links page.
- **Soft Glow** (`rgba(232, 230, 227, 0.12)`) — replaces Soft Shadow. Profile image lift on the About page.
- **Confident Glow** (`rgba(232, 230, 227, 0.15)`) — replaces Confident Shadow. Link-button hover, the boldest elevation in the system. The card appears to *luminate* upward rather than to lift.
- **Glass Bone Light** (`rgba(232, 230, 227, 0.05)`) — replaces Glass White Light. Modal close/nav button base.
- **Glass Bone** (`rgba(232, 230, 227, 0.10)`) — replaces Glass White Soft. Modal control hover.
- **Glass Bone Backdrop** (`rgba(232, 230, 227, 0.98)`) — replaces Glass White. Mobile menu backdrop, now warm-bone-tinted.

### 6.3 Typography (Dark)

- **Oswald 800** and **Hind 400** are unchanged in family, weight, size, letter-spacing, and line-height.
- All body text lives in **Soft Bone White** (`#e8e6e3`) by default, with **Marble White** (`#f5f5f5`) reserved for moments that need emphatic contrast.
- No weight shifts, no size shifts, no tracking changes. Type is intentionally **darker-mode-agnostic** — the tokens do all the work.

### 6.4 Component Stylings (Dark Overrides)

- **Submit button** (Contact form): fills with **Obsidian Surface** (`#141414`) and a `1px` **Soft Bone White** stroke. Text is **Soft Bone White**. On hover, inverts: fill becomes Soft Bone White, text becomes OLED Black — the *same* invert-on-hover gesture, performed by the inverse tokens. Letter-spacing `0.08em`, uppercase, `2px` corners — all geometry preserved.
- **Carousel nav buttons**: Ash Gray (`#8a8a8a`) idle, Soft Bone White on hover/active. Same 72 / 56 / 44 px sizing, same `1.5px` chevron stroke, same `0.2s` ease.
- **Modal close button** (gallery lightbox): Glass Bone Light background, Soft Bone White icon, `4px` corners, `48px` square. Hover deepens to Glass Bone. Focus ring switches from white to Soft Bone White.
- **Link buttons** (Links page): fill flips to **Obsidian Surface** (`#141414`), border becomes **Charcoal Veil** (`#2a2a2a`), text becomes Soft Bone White. On hover, fills with Soft Bone White, text inverts to OLED Black, and lifts with a **Confident Glow** (`0 0 24px rgba(232,230,227,0.12)`) — the elevation grammar becomes *luminous* in dark mode, as if the button is lit from beneath rather than elevated above the surface.
- **Form inputs and textareas**: default stroke **Slate Stroke** (`#3a3a3a`), background **OLED Black** (`#000000`), text **Soft Bone White** (`#e8e6e3`), placeholder **Ash Gray** (`#8a8a8a`). On focus, the stroke shifts to **Soft Bone White** (instead of Ink Black in light mode); the default browser outline remains suppressed.
- **Labels** (Hind 600, uppercase, `0.9rem`): text becomes Soft Bone White. Weight 600 exception preserved.
- **Field errors**: **Soft Coral** (`#ff8a8a`) at `0.85rem`.
- **Navigation links**: Ash Gray idle, Soft Bone White on hover, Soft Bone White when active. The `0.2s ease` color transition is preserved.
- **Social icons** (desktop): `invert(60%) sepia(0%)` to render as Ash Gray idle, `invert(0%)` to Pure Black — *but Pure Black is the canvas*, so on dark mode the idle state is `invert(85%)` (which renders as Soft Bone White) and the hover state is `invert(100%)` (Pure White). Effectively the icon filter is reversed end-to-end.
- **Mobile burger lines**: from Charcoal Gray (`#333333`) → **Pale Stone** (`#cfcdc9`).
- **Mobile menu backdrop**: from `rgba(255,255,255,0.98)` → **Glass Bone Backdrop** (`rgba(232, 230, 227, 0.98)`) — warm bone-tinted, near-opaque to preserve legibility of dark text it carries.
- **Gallery card overlays**: image gradients (transparent → Soft Shade 60% black) are **unchanged** — they live on top of the photograph, not the page background. The title text shadow (`0 2px 4px rgba(0,0,0,0.3)`) is **unchanged** for the same reason.
- **Gallery viewer modal**: backdrop is **Opaque Charcoal** (`rgba(10,10,10,0.98)`) with a 12px backdrop blur to differentiate from the already-black page. Image counter and caption remain Whisper Gray → Parchment (`#b8b6b2`).

### 6.5 Layout Principles (Dark)

**No layout changes.** Grid columns, breakpoints, max-widths, padding, gutters, and motion easing all carry over verbatim from the light variant. The dark mode is a *color* transformation, not a *layout* one. This is a documented design rule: "the dark variant is shape-faithful to the light variant; only token values shift."

### 6.6 Dark Mode Anti-Patterns

- No elevated surfaces that *imply* light from above — in dark mode, light comes from below (glows, not shadows).
- No pure-white text on pure-black text fields without the warm bone-white offset (causes optical vibration on OLED).
- No bright saturated colors in dark mode that aren't either an error state or a photograph — chromatic noise is more distracting on black.
- No dark mode toggle in the UI — the OS preference is the source of truth.

### 6.7 Stitch Prompting Notes for Dark Mode

Use these ready-to-paste phrases when prompting Stitch to generate dark variants:

- "Darkroom aesthetic — true black canvas (`#000000`) with warm bone-white (`#e8e6e3`) typography"
- "Same geometry, spacing, and motion as the light theme; only color tokens change"
- "Shadows invert to soft warm-white glows (`rgba(232, 230, 227, 0.08–0.15)`); elevation becomes luminous"
- "Error states use a brighter, warmer red (`#ff6b6b`) for legibility on black"
- "Modal backdrops use opaque charcoal (`#0a0a0a` at 0.98) with a 12px backdrop blur to distinguish from the page"
- "Form fields are pure black with a `1px` Slate Stroke (`#3a3a3a`) border; focus shifts the stroke to Soft Bone White"
- "Image overlays (gallery card gradients, title text shadows) remain unchanged from light mode — they sit on top of the photograph, not the page"

---

**When prompting Stitch**, describe the destination screen as belonging to one of these typological families — *Editorial Photography Homepage*, *Grid-Driven Gallery*, *Focused Single-Column Form*, or *Vertical Link-Stack* — and reference this document for color, type, and shape decisions. The system is intentionally narrow so that any new screen feels like it was always part of the same publication. For dark variants, append "**in darkroom mode**" and reference section 6 for token swaps.
