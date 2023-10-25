<template>
<header class="header">
  <h1 class="main-title"><a href="/">Kevin Rodríguez | thekevshot</a></h1>
  <b-navbar toggleable="lg" type="white" variant="white" class="nav-bar text-center">
    <b-navbar-brand id="navbar-brand" href="/">Kevin Rodríguez</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line" style="margin-bottom: 0;"></span>
      </template>
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item-dropdown text="Gallery" left>
          <b-dropdown-item href="/black-and-white">Black & White Work</b-dropdown-item>
          <b-dropdown-item href="/new-topographics">New Topographics</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item class="nav-item" href="/gear-and-books">Gear & Books</b-nav-item>
        <b-nav-item class="nav-item" href="/about">About Me</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</header>
</template>

<style>
.header {
  padding: 2.5rem 0rem;
}

.header #navbar-brand {
  display: none;
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
  font-family: 'Hind', sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.header .nav-bar .nav-item a {
  color: #333;
}

.header .nav-bar .nav-item a:hover {
  color: #666;
}

@media (max-width: 992px) {

  .header .main-title {
    display:none
  }

  .header #navbar-brand {
    display: block;
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
  }

  .header #navbar-brand:hover {
    color: #666;
    text-decoration: underline;
  }

  .navbar-toggler{
    width: 50px;
    height: 50px;
    background-color: #000000;
    border:none;
  }
  .navbar-toggler .line{
      width: 100%;
      float: right;
      height: 2px;
      background-color: #fff;
      margin-bottom: 5px;
  }
}
</style>
