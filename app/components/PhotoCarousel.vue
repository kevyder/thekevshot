<script setup lang="ts">
export interface Photo {
  src: string
  alt: string
  caption?: string
}

const props = defineProps<{
  photos: Photo[]
}>()

const currentIndex = ref(0)

const currentPhoto = computed(() => props.photos[currentIndex.value])

const totalPhotos = computed(() => props.photos.length)

function next() {
  currentIndex.value = (currentIndex.value + 1) % totalPhotos.value
}

function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + totalPhotos.value) % totalPhotos.value
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    next()
  } else if (event.key === 'ArrowLeft') {
    prev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="carousel" role="region" aria-label="Photo gallery">
    <div class="carousel-wrapper">
      <button
        type="button"
        class="nav-btn prev"
        aria-label="Show previous photo"
        @click="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div class="carousel-container" aria-live="polite">
        <template v-for="(photo, index) in photos" :key="photo.src">
          <div
            class="carousel-item"
            :class="{ 'is-active': index === currentIndex }"
          >
            <NuxtPicture
              :src="photo.src"
              :alt="photo.alt"
              width="1080"
              height="1080"
              sizes="480px sm:768px lg:1024px xl:1080px"
              fit="contain"
              :preload="index === 0"
              :loading="index === 0 ? 'eager' : 'lazy'"
              class="carousel-picture"
              :img-attrs="{ class: 'carousel-image', draggable: 'false' }"
            />
          </div>
        </template>

        <div class="carousel-info">
          <p v-if="currentPhoto?.caption" class="carousel-caption">
            {{ currentPhoto.caption }}
          </p>
        </div>
      </div>

      <button
        type="button"
        class="nav-btn next"
        aria-label="Show next photo"
        @click="next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
}

.carousel-container {
  position: relative;
  flex: 1;
  max-width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.carousel-item.is-active {
  opacity: 1;
  pointer-events: auto;
}

.carousel-picture {
  display: contents;
}

.carousel-picture :deep(.carousel-image) {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
}

.carousel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
}

.carousel-caption {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  letter-spacing: 0.03em;
  text-align: center;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  color: #666;
  transition: color 0.2s ease;
}

.nav-btn:hover {
  color: #000;
}

.nav-btn:active {
  color: #000;
}

@media (max-width: 768px) {
  .carousel {
    padding: 0.5rem 0;
  }

  .carousel-wrapper {
    gap: 0.25rem;
  }

  .nav-btn {
    width: 56px;
    height: 56px;
  }

  .nav-btn svg {
    width: 32px;
    height: 32px;
  }

  .carousel-info {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .nav-btn {
    width: 44px;
    height: 44px;
  }

  .nav-btn svg {
    width: 24px;
    height: 24px;
  }
}
</style>
