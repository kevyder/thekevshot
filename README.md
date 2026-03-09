# THEKEVSHOT

Kevin Rodriguez photography portfolio. Nuxt 4, TypeScript, Bun. Contact form with Resend + Turnstile. Deployed to Cloudflare Workers.

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
| @nuxtjs/sitemap      | 7.6.0   |

Dev dependencies:

| Package        | Version |
| -------------- | ------- |
| @types/node    | 25.3.0  |

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
NUXT_CMS_BASE_URL              # CMS base URL
NUXT_MEDIA_BASE_URL            # CMS media origin for image src URLs
NUXT_CLOUDFLARE_IMAGE_BASE_URL # Site domain for Cloudflare Image Resizing (e.g. https://thekevshot.com)
NUXT_IMAGE_DOMAINS             # Allowed image domains
NUXT_PUBLIC_GTAG_ID            # Google Analytics ID (optional)
NUXT_RESEND_API_KEY            # Resend API key (server-only secret)
NUXT_CONTACT_TO_ADDRESS        # Contact form recipient email
NUXT_CONTACT_FROM_ADDRESS      # Contact form sender email
NUXT_PUBLIC_TURNSTILE_SITE_KEY # Turnstile site key (client)
NUXT_TURNSTILE_SECRET_KEY      # Turnstile secret key (server)
NUXT_SITE_URL                  # Site URL used for sitemap and site config (e.g. https://thekevshot.com)
NUXT_SITE_NAME                 # Site name used in site config (e.g. thekevshot.com)
```

## Cloudflare Workers Deployment

Non-secret variables are defined in `wrangler.toml` under `[vars]`.

Secrets must be set via the Cloudflare dashboard or CLI — never commit them:

```bash
npx wrangler secret put NUXT_RESEND_API_KEY
npx wrangler secret put NUXT_TURNSTILE_SECRET_KEY
```

Deploy after building:

```bash
bun run build
npx wrangler --cwd .output deploy
```
