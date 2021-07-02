<template>
  <div class="main">
    <div class="left">
      <h1>Kevin Rodríguez - Street Photography</h1>
      <social />
    </div>
    <div class="right">
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
    </div>
  </div>
</template>

<style>
.main {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.main .left {
  width: 40%;
}

.main .right {
  width: 60%;
}

.main .left,
.main .right {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main .left h1 {
  font-family: "Inconsolata", monospace;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  color: #000000;
}

#gallery {
  width: 70%;
}

#secondary {
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
