<script setup lang="ts">
import type { Photo } from '~/components/PhotoCarousel.vue'

useSeoMeta({
  title: 'thekevshot | Photography by Kevin Rodríguez',
  description: 'Kevin Rodríguez (thekevshot) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',

  // Open Graph meta tags
  ogType: 'website',
  ogUrl: 'https://thekevshot.com',
  ogTitle: 'thekevshot | Photography by Kevin Rodríguez',
  ogDescription: 'Kevin Rodríguez (thekevshot) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',
  ogImage: '/og-image.jpg',

  // Twitter Card meta tags
  twitterCard: 'summary_large_image',
  twitterTitle: 'thekevshot | Photography by Kevin Rodríguez',
  twitterDescription: 'Kevin Rodríguez (thekevshot) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',
  twitterImage: '/og-image.jpg',
  twitterSite: '@thekevshot',
  twitterCreator: '@thekevshot',
})

const { data: photos, status, error } = await useFetch<Photo[]>('/api/main')
</script>

<template>
  <main class="home">
    <div v-if="status === 'pending'" class="loading">
      Loading...
    </div>

    <div v-else-if="error" class="error">
      Failed to load photos
    </div>

    <div v-else-if="!photos || photos.length === 0" class="empty">
      No photos available
    </div>

    <PhotoCarousel v-else :photos="photos" />
  </main>
</template>

<style scoped>
.home {
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loading,
.error,
.empty {
  font-size: 1rem;
  color: #666;
  text-align: center;
}

.error {
  color: #c00;
}
</style>
