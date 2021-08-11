<template>
  <b-container class="main h-100" fluid>
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col md="5">
        <h1 class="main-title">Kevin Rodríguez - Street Photography</h1>
        <social />
      </b-col>
      <b-col md="7">
        <div id="gallery">
          <splide :options="primaryOptions" ref="primary">
            <splide-slide v-for="image of images" :key="image.slug">
              <img :src="image.photograph" :alt="image.alt" />
            </splide-slide>
          </splide>

          <splide :options="secondaryOptions" ref="secondary" id="secondary-gallery">
            <splide-slide v-for="image of images" :key="image.slug">
              <img :src="image.photograph" :alt="image.alt" />
            </splide-slide>
          </splide>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>

.main-title {
  font-family: 'Rufina', serif;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: #000;
}

#gallery {
  width: 70%;
  margin: 0 15%;
}

#secondary-gallery {
  margin-top: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      primaryOptions: {
        type: "fade",
        heightRatio: 0.66,
        pagination: false,
        arrows: false,
        cover: true,
        lazyLoad: true,
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
  async asyncData({ $content }) {
    const images = await $content("gallery").fetch();
    return {
      images,
    };
  },
};
</script>
