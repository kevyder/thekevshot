# AGENTS.md - thekevshot

Guidelines for AI coding agents working in this repository.

## Project Overview

**thekevshot** is the portfolio website for Kevin Rodriguez, a Street Photographer.

- **Framework:** Nuxt 4 (Vue 3)
- **Language:** TypeScript (ES Modules)
- **Package Manager:** Bun
- **Deployment:** Cloudflare Workers
- **Git LFS:** Enabled for images (`.jpg`, `.png`)

---

## Build / Dev / Test Commands

### Development

```bash
bun install          # Install dependencies
bun run dev          # Start dev server at http://localhost:3000
bun run build        # Production build
bun run generate     # Static site generation (SSG)
bun run preview      # Preview production build locally
```

### Type Checking

```bash
bunx nuxi typecheck  # Run TypeScript type checking
```

### Testing

> **Note:** No test framework is currently configured.

When tests are added (recommend Vitest for Nuxt 4):

```bash
bun run test              # Run all tests
bun run test <file>       # Run single test file
bun run test --watch      # Watch mode
```

Example single test execution:
```bash
bun run test tests/components/Gallery.spec.ts
```

---

## Project Structure

```
thekevshot/
├── app/                    # Application source code
│   ├── app.vue             # Root component (includes SiteNavbar + NuxtPage)
│   ├── components/         # Vue components
│   │   ├── ContactForm.vue     # Contact form with client validation, thank-you state
│   │   ├── GalleryImageViewer.vue # Modal lightbox for gallery image viewing
│   │   ├── PhotoCarousel.vue   # Single-photo carousel with fade transitions
│   │   └── SiteNavbar.vue      # Navbar with HOME, GALLERY, CONTACT links; desktop social icons, mobile social text links
│   ├── pages/              # File-based routing
│   │   ├── contact.vue         # Contact page with SEO meta + ContactForm
│   │   ├── gallery.vue         # Gallery collection page with 3-column grid (desktop) / 1-column (mobile)
│   │   ├── gallery/
│   │   │   └── [id].vue        # Gallery detail page with 4-column image grid + modal viewer
│   │   ├── index.vue           # Homepage with photo carousel
│   │   └── links.vue           # Linktree-style page with profile image, subtitle, and social/external links
│   ├── layouts/            # Page layouts
│   ├── composables/        # Vue composables (auto-imported)
│   └── assets/
│       └── css/
│           └── main.css        # Global styles (Hind font, reset, focus styles)
├── public/                 # Static assets (served at root)
├── server/                 # Server routes and middleware (Nitro)
│   └── api/
│       ├── contact.post.ts      # Contact form endpoint (Zod, rate limit, Resend)
│       ├── galleries.get.ts      # Galleries endpoint (proxies CMS, filters published, maps to Gallery[])
│       ├── galleries/
│       │   └── [id].get.ts       # Gallery detail endpoint (proxies CMS by ID, returns GalleryDetail with images)
│       ├── links.get.ts          # Links endpoint (proxies CMS, filters published, sorts by order)
│       └── main.get.ts           # Photos endpoint (proxies CMS requests, filters published items)
├── shared/                 # Code shared between app and server
│   └── types/
│       └── gallery.ts           # Shared gallery types (Photo, GalleryDetail)
├── nuxt.config.ts          # Nuxt configuration
└── tsconfig.json           # TypeScript configuration
```

### Path Aliases

| Alias | Resolves To |
|-------|-------------|
| `@/`, `~/` | `app/` directory |
| `@@/`, `~~/` | Project root |
| `#imports` | Auto-imports |
| `#components` | Components |

---

## Code Style Guidelines

### Formatting (EditorConfig)

- **Indentation:** 2 spaces (no tabs)
- **Line endings:** LF (Unix-style)
- **Charset:** UTF-8
- **Trailing whitespace:** Trim (except in `.md` files)
- **Final newline:** Always insert

### TypeScript

Strict mode is enabled. Key compiler options:

- `strict: true` - All strict checks enabled
- `noUncheckedIndexedAccess: true` - Array/object access may be undefined
- `verbatimModuleSyntax: true` - Use `import type` for type-only imports
- `noImplicitOverride: true` - Require `override` keyword

```typescript
// CORRECT: Use explicit type imports
import type { PhotoGallery } from '~/types'
import { ref, computed } from 'vue'

// CORRECT: Handle potentially undefined array access
const photos = ['a.jpg', 'b.jpg']
const first = photos[0]  // Type: string | undefined
if (first) {
  console.log(first)     // Type: string
}
```

### Imports

1. **Order imports** (group with blank lines between):
   - External packages (vue, nuxt, etc.)
   - Internal aliases (`@/`, `~/`, `#imports`)
   - Relative imports

2. **Use auto-imports** - Nuxt auto-imports Vue APIs, composables, and components:

```typescript
// These are auto-imported - no explicit import needed:
// ref, computed, watch, onMounted, useRoute, useFetch, etc.
const count = ref(0)
const route = useRoute()
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `PhotoGallery.vue` |
| Composables | camelCase with `use` prefix | `usePhotoGrid.ts` |
| Pages | kebab-case | `photo-gallery.vue` |
| Variables/functions | camelCase | `loadPhotos()` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_GALLERY_SIZE` |
| Types/Interfaces | PascalCase | `interface PhotoMetadata` |
| CSS classes | kebab-case | `.photo-container` |

---

## Vue Component Pattern

```vue
<script setup lang="ts">
// 1. Type imports
import type { Photo } from '~/types'

// 2. Props and emits
const props = defineProps<{
  photos: Photo[]
  columns?: number
}>()

const emit = defineEmits<{
  select: [photo: Photo]
}>()

// 3. Composables
const route = useRoute()

// 4. Reactive state
const selectedIndex = ref(0)

// 5. Computed properties
const currentPhoto = computed(() => props.photos[selectedIndex.value])

// 6. Methods
function selectPhoto(photo: Photo) {
  emit('select', photo)
}

// 7. Lifecycle hooks
onMounted(() => {
  // initialization
})
</script>

<template>
  <div class="photo-gallery">
    <!-- Template content -->
  </div>
</template>

<style scoped>
.photo-gallery {
  /* Component styles */
}
</style>
```

---

## Error Handling

```typescript
// Use try-catch for async operations
async function loadGallery() {
  try {
    const { data, error } = await useFetch('/api/photos')
    if (error.value) {
      throw createError({ statusCode: 500, message: 'Failed to load gallery' })
    }
    return data.value
  } catch (err) {
    console.error('Gallery load failed:', err)
    throw err
  }
}
```

---

## Image Handling

This is a photography portfolio - images are critical:

- Store images in `public/` or use Nuxt Image module
- Git LFS is configured for `.jpg` and `.png` files
- Prefer modern formats (WebP, AVIF) with fallbacks
- Always include descriptive `alt` text for accessibility
- Use `loading="lazy"` for below-the-fold images

```vue
<template>
  <img
    src="/photos/street-01.jpg"
    alt="Street photography: pedestrians crossing at sunset"
    loading="lazy"
  />
</template>
```

---

## Nuxt Patterns

### Data Fetching

```typescript
// SSR-friendly data fetching
const { data: photos } = await useFetch('/api/photos')

// With error handling
const { data, pending, error } = await useAsyncData('gallery', () =>
  $fetch('/api/gallery')
)
```

### SEO

```typescript
useSeoMeta({
  title: 'Street Photography | thekevshot',
  description: 'Street photography portfolio by Kevin Rodriguez',
  ogImage: '/og-image.jpg'
})
```

---

## Git Workflow

- **Commit messages:** Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- **Images:** Tracked with Git LFS (configured in `.gitattributes`)
- **Deploy:** Cloudflare Workers (automatic deploys from main branch)

---

## Deployment (Cloudflare Workers)

Non-secret environment variables are defined in `wrangler.toml` under `[vars]`.

Server-only secrets must be set via the Cloudflare dashboard or CLI — **never commit them to the repository**:

```bash
npx wrangler secret put NUXT_RESEND_API_KEY
npx wrangler secret put NUXT_TURNSTILE_SECRET_KEY
```

Deploy after building:

```bash
bun run build
npx wrangler --cwd .output deploy
```

### Nuxt runtimeConfig Auto-Mapping

Nuxt automatically maps environment variables to `runtimeConfig` keys using the `NUXT_` prefix:

| runtimeConfig key | Environment variable |
|---|---|
| `resendApiKey` | `NUXT_RESEND_API_KEY` |
| `contactToAddress` | `NUXT_CONTACT_TO_ADDRESS` |
| `contactFromAddress` | `NUXT_CONTACT_FROM_ADDRESS` |
| `turnstile.secretKey` | `NUXT_TURNSTILE_SECRET_KEY` |

**Important:** Server-only secrets must use the `NUXT_` prefix (not `NUXT_PUBLIC_`). The `NUXT_PUBLIC_` prefix is reserved for client-exposed values. Exposing API keys with `NUXT_PUBLIC_` is a security risk.

---

## Environment Variables

The source of truth for environment variables is `.env.template`. Copy it to `.env` and fill in values.

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_CMS_BASE_URL` | Base URL for the headless CMS | `http://localhost:8787` |
| `NUXT_MEDIA_BASE_URL` | CMS media origin used to build image `src` URLs | `http://localhost:8787` |
| `NUXT_CLOUDFLARE_IMAGE_BASE_URL` | Site domain (zone) for Cloudflare Image Resizing (e.g. `https://thekevshot.com`). Leave empty in dev to disable resizing. | *(empty)* |
| `NUXT_IMAGE_DOMAINS` | Allowed domains for `@nuxt/image` | `localhost:8787` |
| `NUXT_PUBLIC_GTAG_ID` | Google Analytics measurement ID | *(disabled if unset)* |
| `NUXT_RESEND_API_KEY` | Resend API key for sending contact form emails (server-only secret) | *(required)* |
| `NUXT_CONTACT_TO_ADDRESS` | Recipient email for contact form submissions | *(required)* |
| `NUXT_CONTACT_FROM_ADDRESS` | Sender "From" address for contact emails | *(required)* |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (client-side widget) | *(required)* |
| `NUXT_TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-side verification) | *(required)* |

---

## CMS Integration

The site pulls photos from a headless CMS via server-side API routes to keep credentials hidden.

### CMS Endpoint

```
GET /api/collections/main-page/content?limit=50
```

### CMS Response Schema

```typescript
interface CmsMainPageItem {
  id: string
  status: string
  data: {
    title: string
    photo: string           // Image path (e.g., "/uploads/photo.jpg")
    altText?: string
    status: 'draft' | 'published' | 'archived'
  }
}
```

### Internal API

The `/api/main` endpoint proxies CMS requests and filters for published items only:

```typescript
// Returns Photo[] - only items with data.status === 'published'
interface Photo {
  src: string      // Full URL: cmsBaseUrl + data.photo
  alt: string      // data.altText || data.title
  caption: string  // data.title
}
```

---

## Contact Page & API

The `/contact` page allows visitors to send a message to Kevin Rodriguez via an accessible form with server-side email delivery.

### Form Fields

| Field | Type | Max Length | Autocomplete |
|-------|------|-----------|--------------|
| First Name | text | 50 | `given-name` |
| Last Name | text | 50 | `family-name` |
| Email | email | 254 | `email` |
| Subject | text | 150 | -- |
| Message | textarea | 5000 | -- |

All fields are required. First Name and Last Name appear side-by-side on desktop and stack on mobile (`max-width: 480px`).

### Client-Side Validation (`ContactForm.vue`)

- Mirrors server-side Zod rules: required (after trim), max length, email format.
- **Bot protection:** Embeds a `<NuxtTurnstile>` widget; the token is captured via `v-model` and sent with the form. Submission is blocked if the challenge is not completed. The widget is reset after each submission attempt.
- Per-field error messages displayed below each input with `role="alert"`.
- On success, the entire form is replaced by a centered "Thank You" message.
- Handles server errors: maps 422 field errors to fields, shows rate limit message for 429, generic message otherwise.
- Submit button shows "Sending..." with disabled state during submission.

### Server-Side API (`/api/contact` POST)

- **Validation:** Zod schema with `.trim()`, `.min(1)`, `.max()`, `.email()` and custom error messages. Returns `422` with `{ error, details: [{ field, message }] }` format.
- **Bot protection:** Verifies the Turnstile token via `verifyTurnstileToken()` (auto-imported by `@nuxtjs/turnstile`). Returns `422` if verification fails.
- **Rate Limiting:** In-memory, 5 requests per IP per hour. Returns `429` when exceeded.
- **Sanitization:** All fields are HTML-escaped before inclusion in the email body.
- **Email Delivery:** Uses the official Resend SDK (`resend.emails.send()`). The `replyTo` field is set to the submitter's email address.
- **Error codes:** `422` validation, `429` rate limit, `500` missing config, `502` send failure.

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `zod` | 4.x | Schema validation (server + mirrors on client) |
| `resend` | 6.x | Email delivery via Resend API |

### Future Enhancements

- **Reply-To / From address:** Configurable separately if needed.

---

## Gallery Page

The `/gallery` page displays all published galleries from the CMS in a responsive grid on desktop and 1-column on mobile. Each gallery card shows a presentation image with an overlay displaying the gallery title centered on the image.

### Layout & Design

- **Title:** "GALLERY" in Oswald, weight 800, uppercase, 2rem, centered
- **Grid layout:** 3 columns (desktop ≥768px), 1 column (mobile <768px)
- **Gallery cards:** Flex column with hover effects
  - Card lift: `translateY(-4px)` on hover (0.2s ease transition)
  - Image zoom: `scale(1.05)` on hover (0.4s ease-out transition)
  - Overlay darken: Gradient darkens from rgba(0,0,0,0.6) to rgba(0,0,0,0.75) on hover (0.4s ease-out transition)
- **Image:** 1:1 aspect ratio, `object-fit: cover`, lazy loading via NuxtImg
- **Image overlay:**
  - Gradient background: transparent at top → dark (rgba(0,0,0,0.6)) at bottom
  - Gallery title: Centered vertically on image, white text, Oswald weight 800, uppercase
  - Font size: 1.25rem (desktop), 1rem (mobile)
  - Text shadow: 0 2px 4px rgba(0,0,0,0.3) for readability
- **Spacing:** Content anchored to top with minimal bottom padding (1rem)
- **Responsive:** Mobile-first design, gap spacing scales with breakpoints

### Data Fetching

The page fetches galleries from `/api/galleries` endpoint:

```typescript
interface Gallery {
  id: string
  title: string
  slug: string
  presentationImage: string
  imageCount: number
  order: number
}
```

### API Endpoint: `/api/galleries.get.ts`

**Purpose:** Proxy CMS `/api/collections/galleries/content` and normalize gallery data

**CMS Endpoint:**
```
GET /api/collections/galleries/content?sort=order&limit=12
```

**CMS Response Schema:**
```typescript
interface CmsGalleryItem {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  data: {
    title: string
    presentationImage: string  // e.g., "/files/uploads/image.webp"
    order: number
    images: Array<{ photo: string }>  // Array of image objects
  }
}
```

**Implementation:**
1. Fetch from CMS with sort and limit
2. Filter: Only items with `status === 'published'`
3. Map to Gallery interface:
   - `presentationImage = mediaBaseUrl + data.presentationImage` (full URL)
   - `imageCount = data.images.length`
   - Keep: `id`, `title`, `slug`, `order`
4. Sort by `order` (ascending)
5. Return `Gallery[]`
6. Error handling: 500 error with message

### States

- **Loading:** Shows "Loading galleries..." text
- **Error:** Shows "Failed to load galleries. Please try again later." (red #d32f2f)
- **Empty:** Shows "No galleries available yet." (if no published galleries exist)
- **Success:** Displays all published galleries as cards in responsive grid

### Future Enhancements

- **Image count badge:** Display number of images in gallery on collection cards

---

## Gallery Detail Page

The `/gallery/[id]` page displays all images from a specific gallery in a responsive grid with a modal lightbox image viewer. Each gallery image can be clicked to open a full-screen viewer with navigation controls.

### Layout & Design

- **Title:** Gallery title in Oswald, weight 800, uppercase, 2rem, centered
- **Image grid:**
  - Desktop (≥768px): 4 columns with responsive gap
  - Mobile (<768px): 1 column, full-width
  - Images: 1:1 square aspect ratio, `object-fit: cover`
  - Hover effect: subtle scale (1.02) + image zoom (1.05) on image hover to indicate clickability
  - Border radius: 4px on image containers
- **Image viewer modal:**
  - Full-screen dark overlay (rgba(0,0,0,0.95))
  - Centered image display with `object-fit: contain` (preserves aspect ratio)
  - Navigation: prev/next buttons on sides, keyboard arrows (ArrowLeft/ArrowRight), ESC to close
  - Close button (X icon) in top-right corner
  - Click outside modal to close
  - Image counter: "X of Y" at bottom center
  - Optional caption display (if available from CMS)
  - Smooth fade transitions (0.3s) between images
  - Responsive adjustments for mobile (smaller buttons/padding)

### Data Fetching

The page fetches a single gallery's details from `/api/galleries/[id]` endpoint:

```typescript
interface Photo {
  src: string      // Full URL to image
  alt: string      // Alt text for accessibility
  caption?: string // Optional image caption
}

interface GalleryDetail {
  id: string
  title: string
  slug: string
  presentationImage: string
  images: Photo[]
  order: number
}
```

### API Endpoint: `/api/galleries/[id].get.ts`

**Purpose:** Fetch detailed gallery data including all images by gallery ID

**CMS Endpoint:**
```
GET /api/content/{galleryId}
```

**CMS Response Schema:**
```typescript
interface CmsGalleryItem {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  data: {
    title: string
    presentationImage: string  // e.g., "/files/uploads/image.webp"
    order: number
    images: Array<{ photo: string }>  // Array of image objects
  }
}
```

**Implementation:**
1. Extract gallery ID from route parameter: `event.context.params?.id`
2. Fetch from CMS with ID: `GET /api/content/{id}`
3. Validate: Only return published galleries (status === 'published')
4. Map to GalleryDetail interface:
   - `presentationImage = mediaBaseUrl + data.presentationImage` (full URL)
   - `images = data.images.map(img => ({ src: mediaBaseUrl + img.photo, alt: data.title, caption: undefined }))`
   - Keep: `id`, `title`, `slug`, `order`
5. Return `GalleryDetail`
6. Error handling: 
   - 400 if no gallery ID provided
   - 404 if gallery not found or not published
   - 500 for other errors

### Modal Component: `GalleryImageViewer.vue`

**Purpose:** Reusable modal lightbox component for full-screen image viewing

**Props:**
- `images: Photo[]` - Array of photos to display
- `initialIndex?: number` - Which image to start with (default 0)
- `isOpen: boolean` - Controls modal visibility with `v-show`

**Emits:**
- `close` - Fired when user closes the modal

**Features:**
- Modal overlay with click-outside to close
- Keyboard navigation: ArrowLeft/ArrowRight for navigation, ESC to close
- Smooth fade transitions (0.3s ease) between images
- Image counter display: "X of Y"
- Close button with hover state
- Prev/next buttons with hover state
- Accessibility: `role="dialog"`, `aria-modal="true"`, `aria-label`
- Body overflow hidden when modal is open (prevent background scroll)
- Focus management for keyboard-only navigation

### States

- **Loading:** Shows "Loading gallery..." text
- **Error:** Shows "Failed to load gallery. Please try again later." (red #d32f2f)
- **Empty:** Shows "No images available in this gallery." (if gallery exists but has no images)
- **Success:** Displays gallery title + responsive image grid with clickable images

### Routing & Links

- Gallery collection page (`/gallery`) shows all galleries as cards
- Each card links to `/gallery/{galleryId}` using the gallery ID
- Gallery detail page renders all images from that gallery
- Clicking any image in the grid opens the modal viewer at that image index
- Modal navigation allows cycling through all images for the gallery

---

## Links Page

The `/links` page is a linktree-style landing that aggregates all of Kevin's social media and external links in a clean, mobile-first layout.

### Layout & Design

- **Profile image:** Circular (120px on desktop, 100px on mobile), centered at top with shadow
- **Subtitle:** "Photographer & cat person" in Hind, weight 400
- **Title:** "THEKEVSHOT - Links" in Oswald, weight 800, uppercase
- **Link buttons:** Full-width (max 400px), stacked vertically, minimalist design with hover effects
- **Spacing:** Content anchored to top with minimal bottom padding, no forced full-viewport height
- **Responsive:** Mobile-first, stacks cleanly on all breakpoints (320px+)

### Data Fetching

The page fetches links from `/api/links` endpoint:

```typescript
interface Link {
  id: string
  title: string
  url: string
  order: number
}
```

The endpoint proxies and normalizes data from the headless CMS, returning only published links sorted by `order`.

### CMS Endpoint (Links)

```
GET /api/collections/links/content
```

CMS response schema for links:

```typescript
interface CmsLinksItem {
  id: string
  status: string
  data: {
    title: string          // Link display name
    url: string            // Target URL
    order: number          // Sort order (ascending)
    status: 'draft' | 'published' | 'archived'
  }
}
```

### States

- **Loading:** Shows "Loading links..." text
- **Error:** Shows "Failed to load links. Please try again later."
- **Empty:** Shows "No links available yet." (if no published links exist)
- **Success:** Displays all published links as clickable buttons

---

## Navigation & Social Media

The `SiteNavbar.vue` component displays social media links differently based on screen size:

### Desktop (≥768px)

- Shows **icon-only links** at the right end of navbar
- Three platforms: Instagram, TikTok, YouTube
- Icons are 24×24px black lines (no fills)
- Hover effect: Gray (#666) → Black (#000) via CSS filter
- Focus-visible outline for accessibility
- Visually separated from main nav with left border

### Mobile (<768px)

- Shows **text links** in hamburger menu
- Same three platforms with full text names (INSTAGRAM, TIKTOK, YOUTUBE)
- Stacked vertically, same styling as other menu items
- Easy to tap, no icon ambiguity on small screens

### Icon Files

SVG icons stored in `/public/`:

| File | Size | Platform |
|------|------|----------|
| `icon-instagram.svg` | 351 bytes | Instagram |
| `icon-tiktok.svg` | 240 bytes | TikTok |
| `icon-youtube.svg` | 527 bytes | YouTube |

All icons use:
- Minimalist line design (no fills or gradients)
- `stroke="currentColor"` for dynamic color control via CSS
- `stroke-width="2"` for crisp appearance
- `xmlns="http://www.w3.org/2000/svg"` for standalone use

### Social Links

| Platform | URL | Desktop | Mobile |
|----------|-----|---------|--------|
| Instagram | `https://instagram.com/thekevshot` | Icon | Text |
| TikTok | `https://tiktok.com/@thekevshot` | Icon | Text |
| YouTube | `https://youtube.com/@thekevshot` | Icon | Text |

All links:
- Open in new tab (`target="_blank"`)
- Have `rel="noopener noreferrer"` for security
- Include descriptive `aria-label` for accessibility
- Are keyboard-focusable with visible outline

---

## Design Specifications

### Typography

- **Logo/Brand:** Oswald, weight 800, uppercase
- **Body text:** Hind, weight 400

### Colors

- **Background:** White (`#ffffff`)
- **Text:** Dark gray/black
- **Navigation controls:** Gray (`#666`) with black hover

### Layout

- **Navbar:** Minimalist, brand on left, navigation links (HOME, CONTACT, GALLERY, LINKS) and social media icons on right, uppercase text
- **Homepage:** Full-viewport photo carousel, no scrolling
- **Carousel:** Single photo with fade transitions, centered caption, arrow controls on sides
- **Contact page:** Centered form (600px max-width), scrollable, labels above inputs, name fields side-by-side on desktop
- **Gallery page:** 3-column grid (desktop) / 1-column (mobile), gallery cards with image overlay and title, scrollable, content anchored to top
- **Links page:** Vertically stacked content anchored to top, profile image → subtitle → heading → link buttons, minimal bottom padding

---

## Documentation Maintenance

The project has two documentation files with distinct purposes:

- **`README.md`** — Minimal personal reference. Covers commands, dependency versions, project structure, and environment variables. Keep it concise.
- **`AGENTS.md`** — Detailed implementation guide for AI agents. Covers code style, patterns, architecture decisions, and feature specifications.

Both files reference `.env.template` as the source of truth for environment variables.

When making changes to dependencies, scripts, folder structure, or environment variables, update all three files together:

1. `.env.template` — Add/remove/rename variables
2. `README.md` — Update commands, versions, structure, or env var list
3. `AGENTS.md` — Update relevant sections with implementation details
