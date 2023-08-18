<template>
  <div id="gallery">
    <stack :monitor-images-loaded="true" :column-min-width="450" :gutter-width="10" :gutter-height="10">
      <stack-item v-for="image of images" :key="image.slug">
        <nuxt-img v-b-modal="image.slug" :src="image.photograph" :alt="`${image.title} by thekevshot`" class="gallery-image" format="webp" load="lazy" preload />
        <b-modal :id="image.slug" size="lg" hide-footer >
          <nuxt-img class="modal-image" v-b-modal="image.slug" :src="image.photograph" :alt="`${image.title} by thekevshot`" format="webp" load="lazy" sizes="sm:100vw" preload placeholder />
        </b-modal>
      </stack-item>
    </stack>
  </div>
</template>

<style>
#gallery {
  margin: 5% 0;
  width: 75%;
}

#gallery .gallery-image, .modal-image {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      images: null
    };
  },
  async fetch() {
    this.images = await this.$content("home").fetch();
  },
};
</script>