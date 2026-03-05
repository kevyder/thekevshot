<script setup lang="ts">
useSeoMeta({
  title: 'Contact | thekevshot',
  description: 'Get in touch with Kevin Rodriguez - Street Photographer',
  ogTitle: 'Contact | thekevshot',
  ogDescription: 'Get in touch with Kevin Rodriguez - Street Photographer',
})
</script>

<template>
  <main class="page-contact">
    <h1 class="page-title">Contact</h1>
    <p class="page-description">
      Have a question or want to work together? Send me a message.
    </p>
    <ContactForm />
  </main>
</template>

<style scoped>
.page-contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.page-title {
  font-family: 'Oswald', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  text-align: center;
}

.page-description {
  color: #666;
  margin: 0 0 2rem;
  text-align: center;
}
</style>
