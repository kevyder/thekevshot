<template>
  <b-container class="main h-100" fluid>
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col md="5">
        <h1 class="main-title">Kevin Rodríguez - Street Photography</h1>
        <types />
        <social />
      </b-col>
      <b-col md="7">
        <b-overlay
          :show="show"
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="sm"
        >
          <div id="gallery">
            <h2 class="type-title">Color</h2>
            <splide :options="primaryOptions" ref="primary">
              <splide-slide v-for="image of images" :key="image.slug">
                <img :src="image.photograph" :alt="image.alt" />
              </splide-slide>
            </splide>

            <splide
              :options="secondaryOptions"
              ref="secondary"
              id="secondary-gallery"
            >
              <splide-slide v-for="image of images" :key="image.slug">
                <img
                  :src="image.photograph"
                  :alt="image.name + 'by the kevshot'"
                />
              </splide-slide>
            </splide>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.main-title,
.type-title {
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  text-align: center;
  color: #000;
}

.main-title {
  font-size: 3rem;
}

.type-title {
  font-size: 2rem;
  margin: 1rem auto;
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
      show: true,
      variant: "white",
      opacity: 1,
      blur: "2px",
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
        fixedHeight: 100,
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
    this.show = false;
  },
  async asyncData({ $content }) {
    var images = await $content("color").fetch();
    var currentIndex = images.length,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [images[currentIndex], images[randomIndex]] = [
        images[randomIndex],
        images[currentIndex],
      ];
    }
    return {
      images,
    };
  },
};
</script>
