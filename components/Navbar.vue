<template>
<header class="header">
  <h1 class="main-title">
    <a href="/">Kevin Rodríguez | thekevshot</a>
  </h1>
  <b-navbar toggleable="lg" type="white" variant="white" class="nav-bar text-center">
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item class="nav-item" href="https://www.instagram.com/thekevshot/" target="_blank">instagram</b-nav-item>
        <b-nav-item class="nav-item" href="https://twitter.com/thekevshot/" target="_blank">flickr</b-nav-item>
        <b-nav-item class="nav-item" href="https://www.flickr.com/photos/thekevshot/" target="_blank">twitter</b-nav-item>
        <!-- <b-nav-item-dropdown text="projects" left>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</header>
</template>

<style>
.header {
  padding: 2.5rem 0rem;
}

.header .main-title {
  text-align: center;
  font-size: 2.5rem;
  text-transform: uppercase;
}

.header .main-title a {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  color: #000;
}

.header .main-title a:hover {
  text-decoration: none;
  color: #666;
}

.header .nav-bar .nav-item {
  font-family: 'Fira Sans', sans-serif;;
  font-weight: 200;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.header .nav-bar .nav-item a {
  color: #000;
}

.header .nav-bar .nav-item a:hover {
  color: #666;
  text-decoration: underline;
}
</style>
