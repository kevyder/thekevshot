<template lang="html">
  <ul class="social">
    <li>
      <a href="https://www.instagram.com/thekevshot/" class="social-icon">
        <font-awesome-icon :icon="['fab', 'instagram']"/>
      </a>
    </li>
    <li>
      <a href="https://www.redbubble.com/people/thekevshot/" class="social-icon">
        <font-awesome-icon :icon="['fas', 'shopping-cart']"/>
      </a>
    </li>
  </ul>
</template>

<style>
.social {
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
}

.social li {
  font-size: 2rem; }

.social li a {
  color: #000; }
</style>