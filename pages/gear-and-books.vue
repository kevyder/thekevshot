<template>
  <b-container class="main" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">My gear</h2>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <b-col md="3" sm="12" v-for="item of gear" :key="item.slug">
        <a :href="item.link" target="_blank">
          <img class="item-image" :src="item.image" >
        </a>
        <h3 class="item-title">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </h3>
      </b-col>
    </b-row>

    <b-row class="justify-content-center align-items-center">
      <h2 class="page-title">Books</h2>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <b-col md="3" sm="12" v-for="book of books" :key="book.slug">
        <a :href="book.link" target="_blank">
          <img class="item-image" :src="book.image" >
        </a>
        <h3 class="item-title">
          <a :href="book.link" target="_blank">{{ book.title }}</a>
        </h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.page-title {
  margin: 2rem 0;
}
.item-title {
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0;
}

.item-title a {
  color: #333;
  text-decoration: underline;
  text-transform: uppercase;
}

.item-image {
  margin-top: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 250px;
}

</style>

<script>
export default {
  async asyncData({ $content }) {
    var gear_data = await $content("gear").fetch();
    var books_data = await $content("books").fetch();
    return {
      gear: gear_data,
      books: books_data
    };
  },
};
</script>
