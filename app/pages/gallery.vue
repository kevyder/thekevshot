<script setup lang="ts">
interface Gallery {
  id: string
  title: string
  slug: string
  presentationImage: string
  imageCount: number
  order: number
}

useSeoMeta({
  title: 'Gallery | thekevshot',
  description: 'Gallery collections by Kevin Rodriguez, street photographer',
  ogTitle: 'Gallery | thekevshot',
  ogDescription: 'Gallery collections by Kevin Rodriguez, street photographer',
})

const { data: galleries, pending, error } = await useFetch<Gallery[]>('/api/galleries')
</script>

<template>
  <div class="gallery-page">
    <h1>GALLERY</h1>

    <!-- Loading state -->
    <p v-if="pending" class="state-message">Loading galleries...</p>

    <!-- Error state -->
    <p v-else-if="error" class="state-message error-message">
      Failed to load galleries. Please try again later.
    </p>

    <!-- Empty state -->
    <p v-else-if="!galleries || galleries.length === 0" class="state-message">
      No galleries available yet.
    </p>

    <!-- Success: Grid of galleries -->
    <div v-else class="gallery-grid">
      <a
        v-for="gallery in galleries"
        :key="gallery.id"
        :href="`/gallery/${gallery.slug}`"
        class="gallery-card"
      >
        <div class="gallery-image-wrapper">

          <!-- <img :src="gallery.presentationImage" :alt="gallery.title" class="gallery-image" /> -->
          <NuxtImg
            :src="gallery.presentationImage"
            :alt="gallery.title"
            sizes="480px"
            fit="cover"
            class="gallery-picture"
            :img-attrs="{ class: 'gallery-image' }"
          />

          <div class="gallery-overlay">
            <h2 class="gallery-title">{{ gallery.title }}</h2>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.gallery-page {
  width: 100%;
  max-width: 100%;
  padding: 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-page h1 {
  font-family: Oswald, sans-serif;
  font-weight: 800;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
  color: #111;
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
}

.gallery-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gallery-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  background: #000000;
}

.gallery-image-wrapper :deep(picture),
.gallery-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease-out;
}

.gallery-card:hover .gallery-image-wrapper :deep(picture),
.gallery-card:hover .gallery-image-wrapper img {
  transform: scale(1.05);
}

.gallery-picture {
  width: 100%;
  height: 100%;
  display: block;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.4s ease-out;
}

.gallery-card:hover .gallery-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
}

.gallery-title {
  font-family: Oswald, sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  text-align: center;
  color: #fff;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  text-transform: uppercase;
}

/* Responsive: Mobile (< 768px) - 1 column */
@media (max-width: 767px) {
  .gallery-page {
    padding: 2rem 1rem 1rem;
  }

  .gallery-page h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }

  .gallery-image-wrapper {
    margin-bottom: 0;
  }

  .gallery-title {
    font-size: 1rem;
  }
}

/* Responsive: Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .gallery-page {
    padding: 2.5rem 1.5rem 1rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    max-width: 100%;
  }
}

/* Responsive: Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .gallery-page {
    padding: 3rem 2rem 1rem;
  }

  .gallery-grid {
    gap: 2rem;
    max-width: 1200px;
  }

  .gallery-card:focus-visible {
    outline: 2px solid #111;
    outline-offset: 4px;
  }
}
</style>
