<template>
  <div id="gallery">
    <stack :column-min-width="450" :gutter-width="10" :gutter-height="10">
      <stack-item v-for="image of images" :key="image.slug">
        <b-img-lazy style="transition: transform 300ms" v-b-modal="image.slug" v-bind="mainProps" :src="image.photograph" :alt="image.alt"></b-img-lazy>
        <b-modal :id="image.slug" size="lg" hide-footer >
          <b-img-lazy v-bind="mainProps" :src="image.photograph" :alt="image.alt"></b-img-lazy>
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

#gallery .gallery-image {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      images: null,
      mainProps: {
          blank: true,
          fluidGrow: true,
          blankColor: '#bbb',
          class: 'gallery-image'
      }
    };
  },
  async fetch() {
    this.images = await this.$content("street-photography").fetch();
  },
};
</script>