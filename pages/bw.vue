<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">Black & White work</h2>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <client-only>
        <gallery :images="images" />
      </client-only>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head: {
    title: 'Black and White work by Kevin Rodríguez - Street Photographer | thekevshot'
  },
  async asyncData({ $content }) {
    var sortedImages = await $content("bw").fetch();
    var shuffledImages = sortedImages.sort((a, b) => 0.5 - Math.random());
    var images  = shuffledImages;
    return {
      images
    };
  },
};
</script>