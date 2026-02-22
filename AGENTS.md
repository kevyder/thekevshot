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
│   ├── app.vue             # Root component
│   ├── components/         # Vue components
│   ├── pages/              # File-based routing
│   ├── layouts/            # Page layouts
│   ├── composables/        # Vue composables (auto-imported)
│   └── assets/             # Processed assets (CSS, fonts)
├── public/                 # Static assets (served at root)
├── server/                 # Server routes and middleware (Nitro)
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
