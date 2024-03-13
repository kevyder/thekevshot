<template>
  <div id="gallery">
    <stack :monitor-images-loaded="true" :column-min-width="450" :gutter-width="15" :gutter-height="15">
      <stack-item style="transition: transform 300ms" v-for="image of images" :key="image.slug">
        <nuxt-img v-b-modal="image.slug" format="webp" placeholder preload :src="image.photograph" width="450" height="300"
          :alt="`${image.title} by thekevshot`" class="gallery-image" sizes="sm:450px md:450px xl:450px"/>
        <b-modal :id="image.slug" size="xl" hide-footer>
          <nuxt-img class="modal-image" v-b-modal="image.slug" format="webp" width="1080" height="720" :src="image.photograph"
            :alt="`${image.title} by thekevshot`" sizes="sm:720px md:1080px" loading="lazy" quality="90" placeholder />
        </b-modal>
      </stack-item>
    </stack>
  </div>
</template>

<style>
#gallery {
  margin-top: 2.5%;
  width: 75%;
}

#gallery .gallery-image {
  max-width: 100%;
  height: auto;
}

#gallery .gallery-image,
.modal-image {
  max-width: 100%;
  height: auto;
}
</style>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  }
}
</script>