<script setup lang="ts">
const instagramUrl = 'https://instagram.com/thekevshot'
</script>

<template>
  <nav class="navbar">
    <NuxtLink to="/" class="navbar-brand">THEKEVSHOT</NuxtLink>

    <div class="navbar-links">
      <NuxtLink to="/" class="nav-link">HOME</NuxtLink>

      <NuxtLink to="/contact" class="nav-link">CONTACT</NuxtLink>

      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link"
      >
        INSTAGRAM
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 2rem;
  background: #fff;
  margin: 1% 15% 0 15%;
}

.navbar-brand {
  font-family: 'Oswald', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.navbar-brand:hover {
  color: #000;
}

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

@media (max-width: 480px) {
  .navbar {
    padding: 0 1rem;
    height: 56px;
  }

  .navbar-brand {
    font-size: 1rem;
    letter-spacing: 0.08em;
  }

  .navbar-links {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
