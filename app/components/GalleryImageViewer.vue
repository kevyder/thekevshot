<script setup lang="ts">
export interface Photo {
  src: string
  alt: string
  caption?: string
}

const props = defineProps<{
  images: Photo[]
  initialIndex?: number
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const currentIndex = ref(props.initialIndex ?? 0)

const currentPhoto = computed(() => props.images[currentIndex.value])

function close() {
  emit('close')
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.isOpen) return

  if (event.key === 'Escape') {
    close()
  }
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close()
  }
}

watch(
  () => props.initialIndex,
  (newVal) => {
    if (newVal !== undefined) {
      currentIndex.value = newVal
    }
  }
)

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      window.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    v-show="isOpen"
    class="gallery-viewer-overlay"
    @click="handleOverlayClick"
    role="dialog"
    aria-modal="true"
    aria-label="Image viewer"
  >
    <div class="gallery-viewer-container">
      <!-- Close button -->
      <button
        type="button"
        class="close-btn"
        aria-label="Close image viewer"
        @click="close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Image display -->
      <div class="image-wrapper">
        <NuxtImg
          v-if="currentPhoto"
          :src="currentPhoto.src"
          :alt="currentPhoto.alt"
          fit="contain"
          preload
          loading="eager"
          class="viewer-image"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-viewer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.gallery-viewer-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 90vh;
}

.viewer-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  max-width: 90vw;
  max-height: 90vh;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.close-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.nav-btn.prev {
  left: 1rem;
}

.nav-btn.next {
  right: 1rem;
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  display: none;
}

.image-caption {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: #ccc;
  font-size: 0.875rem;
  max-width: 80%;
  text-align: center;
  letter-spacing: 0.03em;
}

@media (max-width: 768px) {
  .gallery-viewer-container {
    padding: 1rem;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    top: 0.5rem;
    right: 0.5rem;
  }

  .close-btn svg {
    width: 24px;
    height: 24px;
  }

  .nav-btn {
    width: 44px;
    height: 44px;
  }

  .nav-btn svg {
    width: 24px;
    height: 24px;
  }

  .nav-btn.prev {
    left: 0.5rem;
  }

  .nav-btn.next {
    right: 0.5rem;
  }

  .image-counter {
    bottom: 0.5rem;
    font-size: 0.75rem;
  }

  .image-caption {
    bottom: 2rem;
    max-width: 90%;
    font-size: 0.75rem;
  }
}
</style>
