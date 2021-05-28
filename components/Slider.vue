<template>
  <div id="gallery">
    <splide :options="primaryOptions" ref="primary">
      <splide-slide v-for="image of images" :key="image.slug">
        <img :src="image.photograph" :alt="image.alt" />
      </splide-slide>
    </splide>

    <splide :options="secondaryOptions" ref="secondary" id="secondary">
      <splide-slide v-for="image of images" :key="image.slug">
        <img :src="image.photograph" :alt="image.alt" />
      </splide-slide>
    </splide>
  </div>
</template>

<style>
#gallery {
  width: 70%;
}

#secondary {
  margin-top: 1rem;
}
</style>
<script>
export default {
  async asyncData({ $content }) {
    const images = await $content("gallery").fetch();
    return {
      images,
    };
  },
  data() {
    return {
      primaryOptions: {
        type: "fade",
        heightRatio: 0.66,
        pagination: false,
        arrows: false,
        cover: true,
      },
      secondaryOptions: {
        rewind: true,
        fixedWidth: 100,
        fixedHeight: 64,
        isNavigation: true,
        gap: 10,
        focus: "center",
        pagination: false,
        cover: true,
        breakpoints: {
          600: {
            fixedWidth: 66,
            fixedHeight: 40,
          },
        },
      },
    };
  },
  mounted() {
    // Set the sync target.
    this.$refs.primary.sync(this.$refs.secondary.splide);
  },
};
</script>