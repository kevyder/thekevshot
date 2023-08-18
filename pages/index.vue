<template>
  <b-container class="main h-100" fluid>
    <navbar />
    <b-row class="justify-content-center align-items-center">
      <client-only>
        <home-gallery />
      </client-only>
    </b-row>
  </b-container>
</template>