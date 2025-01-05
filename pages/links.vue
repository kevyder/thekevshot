<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-container>
      <b-row class="justify-content-center align-items-center">
        <nuxt-img preload src="/kevin-rodriguez-thekevshot.webp" id="links-photo" alt="about me by thekevshot" loading="lazy" quality="90" width="300" format="webp" />
      </b-row>
      <b-row class="justify-content-center align-items-center">
        <h2 class="links-page-title">Welcome to Kevin Rodríguez's website</h2>
      </b-row>
      <b-row class="justify-content-center align-items-center">
        <p class="links-page-description">See what I am up to.</p>
      </b-row>
    </b-container>
    <b-container>
      <b-col cols="8" offset="2">
        <b-row class="justify-content-center align-items-center">
          <b-link class="link-href" :href="link.link" v-for="link of links" target="_blank" :key="link.slug">
            <b-button size="lg" block variant="outline-dark">
              {{ link.title }}
            </b-button>
          </b-link>
        </b-row>
      </b-col>
    </b-container>
    <site-footer />
  </b-container>
</template>

<style>
#links-photo {
  border-radius: 50%;
  object-fit: cover;
  width: 200px;
  height: 200px;
}

.links-page-title {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 1.5rem;
  text-align: center;
}

.links-page-description {
  text-transform: uppercase;
  font-size: 1rem;
  margin: 0.7rem;
  text-align: center;
}

.link-href {
  width: 100%;
  margin: 0.5rem;
}

.link-href:hover {
  text-decoration: none;
}

button {
  font-weight: 700;
  text-transform: uppercase;
}

</style>

<script>
export default {
  head: {
    title: 'Links - Kevin Rodríguez - Street Photography | thekevshot'
  },
  async asyncData({ $content }) {
    let links = await $content("links").sortBy('order').fetch();
    return {
      links
    };
  },
};
</script>
