<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <client-only>
        <gallery :images="images" />
      </client-only>
    </b-row>
    <site-footer />
  </b-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    var sortedImages = await $content("home").limit(12).fetch();
    var shuffledImages = sortedImages.sort((a, b) => 0.5 - Math.random());
    var images  = shuffledImages;
    return {
      images
    };
  },
};
</script>