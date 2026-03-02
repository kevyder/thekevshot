<script setup lang="ts">
interface Link {
  id: string
  title: string
  url: string
  order: number
}

useSeoMeta({
  title: 'Links | thekevshot',
  description: 'Find all my links in one place'
})

const { data: links, pending, error } = await useFetch<Link[]>('/api/links')

const profileImage = '/og-image.webp'

</script>

<template>
  <div class="links-container">
    <!-- Profile Image -->
    <img
      :src="profileImage"
      alt="Kevin Rodríguez (thekevshot) holding a calico cat in a Manchester United shirt"
      class="profile-image"
      loading="eager"
    />

    <!-- Subtitle -->
    <p class="links-subtitle">Photographer & cat person</p>

    <!-- Title -->
    <h1 class="links-title">THEKEVSHOT - Links</h1>

    <!-- Loading state -->
    <div v-if="pending" class="links-loading">
      <p>Loading links...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="links-error">
      <p>Failed to load links. Please try again later.</p>
    </div>

    <!-- Links list -->
    <div v-else-if="links && links.length > 0" class="links-list">
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link-button"
      >
        {{ link.title }}
      </a>
    </div>

    <!-- Empty state -->
    <div v-else class="links-empty">
      <p>No links available yet.</p>
    </div>
  </div>
</template>

<style scoped>
.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  background: #fff;
  color: #111;
}

.profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.links-subtitle {
  font-family: 'Hind', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  margin: 0 0 1rem 0;
  letter-spacing: 0.05em;
  text-align: center;
}

.links-title {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 2.5rem 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.link-button {
  display: block;
  padding: 1.25rem 1.5rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #111;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  cursor: pointer;
}

.link-button:hover {
  background: #111;
  color: #fff;
  border-color: #111;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.link-button:focus-visible {
  outline: 2px solid #111;
  outline-offset: 2px;
}

.links-loading,
.links-error,
.links-empty {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}

.links-error {
  color: #d32f2f;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .links-container {
    padding: 1.5rem 1rem;
  }

  .profile-image {
    width: 110px;
    height: 110px;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .links-subtitle {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .links-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .links-list {
    max-width: 100%;
  }

  .link-button {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .links-container {
    padding: 1rem 1rem;
  }

  .profile-image {
    width: 100px;
    height: 100px;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
  }

  .links-subtitle {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .links-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .link-button {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
  }
}
</style>
