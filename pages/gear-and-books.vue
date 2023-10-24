<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">My gear</h2>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <b-col md="3" sm="12" v-for="item of gear" :key="item.slug">
        <a :href="item.link" target="_blank">
          <img width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" :src="item.image" >
        </a>
        <h3 class="item-title">{{ item.title }}</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
h3.item-title {
  font-size: 1.1rem;
}
</style>

<script>
export default {
  async asyncData({ $content }) {
    var gear = await $content("gear").fetch();
    return {
      gear
    };
  },
};
</script>
