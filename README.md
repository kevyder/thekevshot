# THEKEVSHOT

Kevin Rodriguez photography portfolio. Nuxt 4, TypeScript, Bun. Contact form with Resend + Turnstile. Deployed to Cloudflare.

## Commands

```bash
bun install            # Install dependencies
bun run dev            # Dev server (http://localhost:3000)
bun run build          # Production build
bun run generate       # Static site generation
bun run preview        # Preview production build
bunx nuxi typecheck    # Type checking
```

## Dependencies

| Package              | Version |
| -------------------- | ------- |
| nuxt                 | 4.3.1   |
| vue                  | 3.5.28  |
| vue-router           | 4.6.4   |
| zod                  | 4.3.6   |
| resend               | 6.9.2   |
| @nuxtjs/turnstile    | 1.1.1   |
| @nuxt/image          | 2.0.0   |
| nuxt-gtag            | 4.1.0   |

## Structure

```
app/
  app.vue                    # Root component
  components/
    ContactForm.vue          # Contact form (validation, Turnstile, thank-you state)
    PhotoCarousel.vue        # Single-photo carousel with fade transitions
    SiteNavbar.vue           # Navbar (Home, Contact, Instagram)
  pages/
    index.vue                # Homepage (photo carousel)
    contact.vue              # Contact page
  assets/css/main.css        # Global styles
server/
  api/
    contact.post.ts          # Contact form endpoint (Zod, rate limit, Resend)
    main.get.ts              # Proxies CMS, filters published items
public/                      # Static assets
nuxt.config.ts
tsconfig.json
```

## Environment Variables

Copy `.env.template` to `.env` and fill in values.

```
NUXT_ENV                       # development | production
NUXT_CMS_BASE_URL              # CMS base URL
NUXT_MEDIA_BASE_URL            # Cloudflare image provider URL
NUXT_IMAGE_DOMAINS             # Allowed image domains
NUXT_GTAG_ID                   # Google Analytics ID (optional)
NUXT_PUBLIC_RESEND_API_KEY     # Resend API key
NUXT_CONTACT_TO_ADDRESS        # Contact form recipient email
NUXT_CONTACT_FROM_ADDRESS      # Contact form sender email
NUXT_PUBLIC_TURNSTILE_SITE_KEY # Turnstile site key (client)
NUXT_TURNSTILE_SECRET_KEY      # Turnstile secret key (server)
```
