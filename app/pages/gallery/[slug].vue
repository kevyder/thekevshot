<script setup lang="ts">
import type { Photo, GalleryDetail } from '@@/shared/types/gallery'

const route = useRoute()
const gallerySlug = route.params.slug as string

const { data: gallery, pending, error } = await useFetch<GalleryDetail>(
  `/api/galleries/${gallerySlug}`
)

const isViewerOpen = ref(false)
const viewerInitialIndex = ref(0)

function openViewer(imageIndex: number) {
  viewerInitialIndex.value = imageIndex
  isViewerOpen.value = true
}

function closeViewer() {
  isViewerOpen.value = false
}

useSeoMeta({
  title: gallery?.value?.title ? `${gallery.value.title} | thekevshot` : 'Gallery | thekevshot',
  description: gallery?.value?.title ? `${gallery.value.title} gallery by Kevin Rodriguez, street photographer` : 'Gallery collection by Kevin Rodriguez, street photographer',
  ogTitle: gallery?.value?.title ? `${gallery.value.title} | thekevshot` : 'Gallery | thekevshot',
  ogDescription: gallery?.value?.title ? `${gallery.value.title} gallery by Kevin Rodriguez, street photographer` : 'Gallery collection by Kevin Rodriguez, street photographer',
})
</script>

<template>
  <div class="gallery-detail-page">
    <!-- Loading state -->
    <p v-if="pending" class="state-message">Loading gallery...</p>

    <!-- Error state -->
    <p v-else-if="error" class="state-message error-message">
      Failed to load gallery. Please try again later.
    </p>

    <!-- Empty state -->
    <p v-else-if="!gallery || !gallery.images || gallery.images.length === 0" class="state-message">
      No images available in this gallery.
    </p>

    <!-- Success: Gallery with image grid -->
    <div v-else class="gallery-container">
      <h1 class="gallery-title">{{ gallery.title }}</h1>

      <div class="image-grid">
        <button
          v-for="(image, index) in gallery.images"
          :key="index"
          type="button"
          class="image-grid-item"
          @click="openViewer(index)"
        >
          <div class="image-wrapper">
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              sizes="480px"
              fit="cover"
              class="grid-image"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Image viewer modal -->
    <GalleryImageViewer
      v-if="gallery && gallery.images"
      :images="gallery.images"
      :initial-index="viewerInitialIndex"
      :is-open="isViewerOpen"
      @close="closeViewer"
    />
  </div>
</template>

<style scoped>
.gallery-detail-page {
  width: 100%;
  max-width: 100%;
  padding: 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.state-message {
  color: #666;
  font-size: 1rem;
  text-align: center;
  margin: 2rem 0;
}

.state-message.error-message {
  color: #d32f2f;
}

.gallery-container {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-title {
  font-family: Oswald, sans-serif;
  font-weight: 800;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
  color: #111;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.image-grid-item {
  position: relative;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
}

.image-grid-item:focus-visible {
  outline: 2px solid #111;
  outline-offset: 4px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 4px;
  background: #f0f0f0;
}

.grid-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

/* Responsive: Mobile (< 768px) - 1 column */
@media (max-width: 767px) {
  .gallery-detail-page {
    padding: 2rem 1rem 1rem;
  }

  .gallery-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Responsive: Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .gallery-detail-page {
    padding: 2.5rem 1.5rem 1rem;
  }

  .image-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}

/* Responsive: Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .gallery-detail-page {
    padding: 3rem 2rem 1rem;
  }

  .image-grid {
    gap: 2rem;
  }
}
</style>
