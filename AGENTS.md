# AGENTS.md - thekevshot

Guidelines for AI coding agents working in this repository.

## Project Overview

**thekevshot** is the portfolio website for Kevin Rodriguez, a Street Photographer.

- **Framework:** Nuxt 4 (Vue 3)
- **Language:** TypeScript (ES Modules)
- **Package Manager:** Bun
- **Deployment:** Netlify
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
│   │   ├── PhotoCarousel.vue   # Single-photo carousel with fade transitions
│   │   └── SiteNavbar.vue      # Minimalist uppercase navbar (Home, Contact, Instagram)
│   ├── pages/              # File-based routing
│   │   ├── contact.vue         # Contact page with SEO meta + ContactForm
│   │   └── index.vue           # Homepage with photo carousel
│   ├── layouts/            # Page layouts
│   ├── composables/        # Vue composables (auto-imported)
│   └── assets/
│       └── css/
│           └── main.css        # Global styles (Hind font, reset, focus styles)
├── public/                 # Static assets (served at root)
├── server/                 # Server routes and middleware (Nitro)
│   └── api/
│       ├── contact.post.ts      # Contact form endpoint (Zod, rate limit, Resend)
│       └── main.get.ts          # Proxies CMS requests, filters published items
├── shared/                 # Code shared between app and server
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
- **Deploy:** Netlify (automatic deploys from main branch)

---

## Environment Variables

The source of truth for environment variables is `.env.template`. Copy it to `.env` and fill in values.

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_ENV` | Environment mode | `development` |
| `NUXT_CMS_BASE_URL` | Base URL for the headless CMS | `http://localhost:8787` |
| `NUXT_MEDIA_BASE_URL` | Base URL for Cloudflare image provider | `http://localhost:8787` |
| `NUXT_IMAGE_DOMAINS` | Allowed domains for `@nuxt/image` | `localhost:8787` |
| `NUXT_GTAG_ID` | Google Analytics measurement ID | *(disabled if unset)* |
| `NUXT_PUBLIC_RESEND_API_KEY` | Resend API key for sending contact form emails | *(required)* |
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

## Design Specifications

### Typography

- **Logo/Brand:** Oswald, weight 800, uppercase
- **Body text:** Hind, weight 400

### Colors

- **Background:** White (`#ffffff`)
- **Text:** Dark gray/black
- **Navigation controls:** Gray (`#666`) with black hover

### Layout

- **Navbar:** Minimalist, brand on left, links on right, uppercase text
- **Homepage:** Full-viewport photo carousel, no scrolling
- **Carousel:** Single photo with fade transitions, centered caption, arrow controls on sides
- **Contact page:** Centered form (600px max-width), scrollable, labels above inputs, name fields side-by-side on desktop

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
