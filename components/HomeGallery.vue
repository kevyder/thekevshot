<template>
  <div id="gallery">
    <stack :monitor-images-loaded="true" :column-min-width="450" :gutter-width="10" :gutter-height="10">
      <stack-item v-for="image of images" :key="image.slug">
        <nuxt-img format="webp" v-b-modal="image.slug" preload :src="image.photograph" :alt="`${image.title} by thekevshot`" class="gallery-image" load="lazy" sizes="sm:450px md:576px lg:768px xl:450px" />
        <b-modal :id="image.slug" size="xl" hide-footer >
          <nuxt-img format="webp" class="modal-image" v-b-modal="image.slug" preload :src="image.photograph" :alt="`${image.title} by thekevshot`" load="lazy" sizes="sm:100vw" placeholder />
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
    let sortedImages = await this.$content("home").fetch();
    let shuffledImages = sortedImages.sort((a, b) => 0.5 - Math.random());
    this.images  = shuffledImages;
  },
};
</script>