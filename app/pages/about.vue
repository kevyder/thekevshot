<script setup lang="ts">
useSeoMeta({
  title: 'About | thekevshot',
  description: 'Kevin Rodriguez — street photographer. Short bio, approach, and contact link.'
})
</script>

<template>
  <main class="page-about" role="main">
    <section class="hero">
      <div class="image-wrap">
        <img
          src="/about-me.webp"
          alt="Kevin Rodriguez — street photographer portrait"
          loading="lazy"
          class="profile-image"
        />
      </div>

      <div class="content">
        <h1 class="title">Kevin Rodríguez</h1>
        <p class="subtitle">photographer & cat person</p>

        <div class="social-row" role="navigation" aria-label="Social links">
          <a
            href="https://instagram.com/thekevshot"
            class="social-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (opens in new tab)"
          >
            <img src="/icon-instagram.svg" alt="" />
            <span class="social-label">INSTAGRAM</span>
          </a>

          <a
            href="https://tiktok.com/@thekevshot"
            class="social-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok (opens in new tab)"
          >
            <img src="/icon-tiktok.svg" alt="" />
            <span class="social-label">TIKTOK</span>
          </a>

          <a
            href="https://youtube.com/@thekevshot"
            class="social-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube (opens in new tab)"
          >
            <img src="/icon-youtube.svg" alt="" />
            <span class="social-label">YOUTUBE</span>
          </a>
        </div>

        <p class="bio">
          Hi', i'm Kevin, a photographer born and raised in the caotic beauty of Bogota, Colombia.<br><br>

          My work explores street, documentary, New Topographics, and fashion photography. This is my little corner to share my work, thoughts, and process. <br><br>

          Hit me up if you want to collaborate or just say hi!
        </p>

        <p class="call-to-action">
          <NuxtLink to="/contact" class="contact-link">Contact me</NuxtLink>
          <span class="sep">•</span>
          <NuxtLink to="/gallery" class="gallery-link">View galleries</NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-about {
  max-width: 920px;
  margin: 2rem auto;
  padding: 1rem;
}

.hero {
  display: grid;
  gap: 1.25rem;
  align-items: center;
  grid-template-columns: 1fr;
}

/* Desktop layout */
@media (min-width: 768px) {
  .hero {
    grid-template-columns: 260px 1fr;
  }
}

.image-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  border: 2px solid rgba(0, 0, 0, 0.04);
}

/* Typography — follow project fonts (Oswald for headings, Hind for body) */
.title {
  font-family: 'Oswald', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
}

.subtitle {
  font-family: 'Hind', sans-serif;
  margin: 0 0 1rem 0;
  color: #666;
}

.bio {
  font-family: 'Hind', sans-serif;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  color: #111;
  max-width: 65ch;
}

.call-to-action {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: 'Hind', sans-serif;
}

.contact-link,
.gallery-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sep {
  color: #999;
  padding: 0 0.4rem;
}

/* Social icons row */
.social-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0.75rem 0 1.25rem 0;
}

/* Button */
.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, color 0.18s ease;
  padding: 0.15rem 0.25rem;
  border-radius: 4px;
}

.social-btn img {
  width: 28px;
  height: 28px;
  display: block;
}

/* Desktop: show icons only (hide labels) */
.social-label {
  display: none;
  font-family: 'Hind', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}

/* Hover / focus */
.social-btn:hover,
.social-btn:focus-visible {
  transform: translateY(-2px);
  color: #000;
  outline: none;
}

.social-btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
}

/* Mobile: reveal labels for easier tapping and clarity */
@media (max-width: 768px) {
  .social-label {
    display: inline-block;
  }

  .social-btn img {
    width: 22px;
    height: 22px;
  }
}
</style>
