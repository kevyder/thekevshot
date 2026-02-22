<script setup lang="ts">
import type { Photo } from '~/components/PhotoCarousel.vue'

useSeoMeta({
  title: 'thekevshot | Street Photography by Kevin Rodriguez',
  description: 'Street photography portfolio by Kevin Rodriguez',
  ogTitle: 'thekevshot | Street Photography',
  ogDescription: 'Street photography portfolio by Kevin Rodriguez',
  ogType: 'website'
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
