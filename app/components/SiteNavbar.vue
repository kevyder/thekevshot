<script setup lang="ts">
const instagramUrl = 'https://instagram.com/thekevshot'
const tiktokUrl = 'https://tiktok.com/@thekevshot'
const youtubeUrl = 'https://youtube.com/@thekevshot'

const menuOpen = ref(false)
const route = useRoute()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// Close menu on route change
watch(() => route.fullPath, () => {
  closeMenu()
})

// Close menu on Escape key
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <nav class="navbar">
    <NuxtLink to="/" class="navbar-brand">THEKEVSHOT</NuxtLink>

    <!-- Burger button (mobile only) -->
    <button
      class="burger"
      :class="{ open: menuOpen }"
      :aria-expanded="menuOpen"
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
      @click="toggleMenu"
    >
      <span class="burger-line burger-line--top" />
      <span class="burger-line burger-line--middle" />
      <span class="burger-line burger-line--bottom" />
    </button>

    <!-- Desktop links -->
    <div class="navbar-links">
      <NuxtLink to="/" class="nav-link">HOME</NuxtLink>

      <NuxtLink to="/gallery" class="nav-link">GALLERY</NuxtLink>

      <NuxtLink to="/contact" class="nav-link">CONTACT</NuxtLink>

      <!-- Social icons (desktop only) -->
      <div class="social-icons">
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram (opens in new tab)"
          class="social-icon"
        >
          <img src="/icon-instagram.svg" alt="" aria-hidden="true" />
        </a>

        <a
          :href="tiktokUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok (opens in new tab)"
          class="social-icon"
        >
          <img src="/icon-tiktok.svg" alt="" aria-hidden="true" />
        </a>

        <a
          :href="youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube (opens in new tab)"
          class="social-icon"
        >
          <img src="/icon-youtube.svg" alt="" aria-hidden="true" />
        </a>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <Transition name="menu">
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="mobile-menu"
        @click.self="closeMenu"
      >
        <div class="mobile-menu-links">
          <NuxtLink to="/" class="mobile-link" @click="closeMenu">HOME</NuxtLink>

          <NuxtLink to="/gallery" class="mobile-link" @click="closeMenu">GALLERY</NuxtLink>

          <NuxtLink to="/contact" class="mobile-link" @click="closeMenu">CONTACT</NuxtLink>

          <a
            :href="instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link"
            @click="closeMenu"
          >
            INSTAGRAM
          </a>

          <a
            :href="tiktokUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link"
            @click="closeMenu"
          >
            TIKTOK
          </a>

          <a
            :href="youtubeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link"
            @click="closeMenu"
          >
            YOUTUBE
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  background: #fff;
  padding: 2rem 5rem;
  position: relative;
}

.navbar-brand {
  font-family: 'Oswald', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  text-decoration: none;
  letter-spacing: 0.1em;
  z-index: 101;
}

.navbar-brand:hover {
  color: #000;
}

/* Desktop links */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #000;
}

.nav-link.router-link-active {
  color: #000;
}

/* Social icons (desktop) */
.social-icons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 1rem;
  border-left: 1px solid #e0e0e0;
  padding-left: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #666;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  filter: invert(40%) sepia(0%);
}

.social-icon:hover {
  color: #000;
  filter: invert(0%);
}

.social-icon:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
  border-radius: 2px;
}

.social-icon img {
  width: 24px;
  height: 24px;
  display: block;
}

/* Burger button — hidden on desktop */
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
}

.burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  border-radius: 2px;
  transition:
    transform 0.4s cubic-bezier(0.55, 0, 0.1, 1),
    opacity 0.3s ease;
}

.burger-line--top {
  transform: translateY(-4px);
}

.burger-line--middle {
  opacity: 1;
}

.burger-line--bottom {
  transform: translateY(4px);
}

/* Burger → X animation */
.burger.open .burger-line--top {
  transform: translateY(0) rotate(45deg);
}

.burger.open .burger-line--middle {
  opacity: 0;
}

.burger.open .burger-line--bottom {
  transform: translateY(-2px) rotate(-45deg);
}

/* Mobile menu — hidden on desktop */
.mobile-menu {
  display: none;
}

/* Mobile menu transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-enter-active .mobile-menu-links,
.menu-leave-active .mobile-menu-links {
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-from .mobile-menu-links,
.menu-leave-to .mobile-menu-links {
  transform: translateY(-1rem);
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1.25rem;
    margin: 0.75rem 0;
    height: 56px;
  }

  .navbar-brand {
    font-size: 1.1rem;
    letter-spacing: 0.08em;
  }

  /* Show burger, hide desktop links */
  .burger {
    display: flex;
  }

  .navbar-links {
    display: none;
  }

  /* Hide social icons on mobile */
  .social-icons {
    display: none;
  }

  /* Mobile menu overlay */
  .mobile-menu {
    display: flex;
    position: fixed;
    inset: 0;
    top: 56px;
    background: rgba(255, 255, 255, 0.98);
    z-index: 100;
    justify-content: center;
    padding-top: 3rem;
  }

  .mobile-menu-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .mobile-link {
    font-size: 1.1rem;
    font-weight: 400;
    color: #666;
    text-decoration: none;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .mobile-link:hover {
    color: #000;
  }

  .mobile-link.router-link-active {
    color: #000;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 1rem;
  }

  .navbar-brand {
    font-size: 1rem;
  }
}
</style>
