<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">Bolívar Square</h2>
    </b-row>
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
  head: {
    title: 'Silhouettes by Kevin Rodríguez - Street Photography | thekevshot'
  },
  async asyncData({ $content }) {
    var sortedImages = await $content("bolivar-square").fetch();
    var shuffledImages = sortedImages.sort((a, b) => 0.5 - Math.random());
    var images  = shuffledImages;
    return {
      images
    };
  },
};
</script>