<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-container>
      <b-row class="justify-content-center align-items-center">
        <h2 class="page-title">About Kevin Rodríguez</h2>
      </b-row>
      <b-row class="justify-content-center align-items-center">
        <b-col sm="12" md="6">
          <nuxt-img preload src="/kevin-rodriguez-thekevshot.webp" id="about-photo" alt="about me by thekevshot" loading="lazy" quality="90" width="300" format="webp" />
        </b-col>
        <b-col sm="12" md="6" id="about-me-text">
          <p>Hello, I'm Kevin, a passionate street photographer based in Bogotá, Colombia. My journey behind the lens began in 2020 with a Sony A6000, inspired by the bustling streets and vibrant culture of my hometown, as well as my need to create art.</p>
          <p>By day, I'm a software engineer, and my hobby is capturing the essence of life on the streets. Armed with my trusty Fujifilm X-E4, I've set out to freeze those colors, shadows, shapes, and moments in the urban tapestry.</p>
          <p>Having been born and raised in this cosmopolitan city, I've developed an intimate connection with its unique people and its ever-changing landscape. Through my photography, I aim to share the hidden gems and everyday beauty that often go unnoticed.</p>
          <p>Thank you for visiting my website. I invite you to explore my gallery and immerse yourself in my photographs. Feel free to reach out, share your thoughts, or inquire about my work—I'd love to connect with fellow photography enthusiasts and street art lovers.</p>
          <p>You can know more about me and my work in this <a href="https://youtu.be/yujS-YDlsT0?si=oC9c5IE6emh3tKxw" target="_blank">video-interview (spanish)</a></p>
          <p>Kevin 📷</p>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<style>
#about-photo, #about-me-text {
  margin-top: 2rem;
}

#about-me-text p {
  font-size: 1.1rem;
}
</style>

<script>
export default {
  head: {
    title: 'About Kevin Rodríguez - Street Photography | thekevshot'
  }
};
</script>