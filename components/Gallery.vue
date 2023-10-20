<template>
  <div id="gallery">
    <stack :monitor-images-loaded="true" :column-min-width="450" :gutter-width="15" :gutter-height="15">
      <stack-item v-for="image of images" :key="image.slug">
        <nuxt-img v-b-modal="image.slug" preload :src="image.photograph" :alt="`${image.title} by thekevshot`"
          class="gallery-image" loading="lazy" sizes="sm:450px md:576px xl:450px" quality="90" format="webp" />
        <b-modal :id="image.slug" size="xl" hide-footer>
          <nuxt-img class="modal-image" v-b-modal="image.slug" preload :src="image.photograph"
            :alt="`${image.title} by thekevshot`" loading="lazy" quality="90" format="webp" placeholder />
        </b-modal>
      </stack-item>
    </stack>
  </div>
</template>

<style>
#gallery {
  margin: 2.5% 0;
  width: 75%;
}

#gallery .gallery-image,
.modal-image {
  width: 100%;
}
</style>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  }
}
</script>