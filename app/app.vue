<script setup lang="ts">

useSeoMeta({
  title: 'THEKEVSHOT | Photography by Kevin Rodríguez',
  description: 'Kevin Rodríguez (THEKEVSHOT) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',

  // Open Graph meta tags
  ogType: 'website',
  ogUrl: 'https://thekevshot.com',
  ogTitle: 'THEKEVSHOT | Photography Portfolio by Kevin Rodríguez',
  ogDescription: 'Kevin Rodríguez (THEKEVSHOT) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',
  ogImage: '/og-image.webp',

  // Twitter Card meta tags
  twitterCard: 'summary_large_image',
  twitterTitle: 'THEKEVSHOT | Photography Portfolio by Kevin Rodríguez',
  twitterDescription: 'Kevin Rodríguez (THEKEVSHOT) is a photographer based in Bogotá, Colombia focusing on street photography, new topographics, and more.',
  twitterImage: '/og-image.webp',
  twitterSite: '@thekevshot',
  twitterCreator: '@thekevshot',
})
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <SiteNavbar />
    <NuxtPage />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
