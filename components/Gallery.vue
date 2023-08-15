<template>
  <div id="gallery">
    <row container :gutter="10">
      <column v-for="image of images" :xs="12" :md="4" :lg="4" :key="image.slug">
        <b-img-lazy v-b-modal="image.slug" v-bind="mainProps" :src="image.photograph" :alt="`${image.title} by thekevshot`"></b-img-lazy>
        <b-modal :id="image.slug" size="lg" hide-footer >
          <b-img-lazy fluid-grow v-bind="mainProps" :src="image.photograph" :alt="`${image.title} by thekevshot`"></b-img-lazy>
        </b-modal>
      </column>
    </row>
  </div>
</template>

<style>
#gallery {
  margin: 5% 0;
  width: 80%;
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