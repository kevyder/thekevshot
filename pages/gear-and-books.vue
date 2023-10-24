<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">My gear</h2>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <b-col md="3" sm="12" v-for="item of gear" :key="item.slug">
        <iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" :src="item.link"></iframe>
        <h3>{{ item.title }}</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

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
