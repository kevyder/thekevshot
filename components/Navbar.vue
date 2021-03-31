<template lang="html">
<header>
		<nav class="nav-bar">
			<ul class="home">
				<li><a href="#"><font-awesome-icon :icon="['fas', 'home']"/></a></li>
			</ul>
			<ul class="mobile-button">
				<div class="lines-button"></div>
			</ul>
			<ul class="container-options">
				<li class="option">
					<a href="#skills">
						<font-awesome-icon :icon="['fas', 'book']"/>
					</a>
				</li>
				<li class="option">
					<a href="#projects">
						<font-awesome-icon :icon="['fab', 'instagram']"/>
					</a>
				</li>
			</ul>
		</nav>

	</header>
</template>

<style>
header {
  height: 10%;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home {
  display: inline-block;
  margin-left: 10%;
}

.home a {
	font-size: 2rem;
	color: #000000;
}

.mobile-button {
  width: 30px;
  height: 50px;
  margin-right: 10%;
  display: none;
}

.lines-button {
  height: 3px;
  width: 30px;
  background-color: #000000;
  border-radius: 20px;
  position: relative;
  top: 50%;
  transition: 0.3s;
}
.lines-button::before,
.lines-button::after {
  content: "";
  height: 3px;
  width: 100%;
  background-color: #000000;
  border-radius: 20px;
  position: absolute;
}
.lines-button::before {
  top: 10px;
  left: 0;
}
.lines-button::after {
  top: -10px;
  left: 0;
}

.close-lines {
  transform: rotate(45deg);
}
.close-lines::before {
  top: 0;
  transform: rotate(-95deg);
}
.close-lines::after {
  display: none;
}

.container-options {
  margin-right: 10%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}

.option a {
  margin: 0.5rem;
  font-size: 2rem;
  color: #000000;
}

.option:hover {
  position: relative;
}
.option:hover:after {
  content: "";
  width: 80%;
  height: 2px;
  position: absolute;
  bottom: 5px;
  left: 10%;
  right: 10%;
  border-radius: 20px;
  background-color: #fff;
}

@media screen and (max-width: 800px) {
  .mobile-button {
    display: inline-block;
  }
  .title {
    font-size: 1rem;
  }
  .container-options {
    background-color: #2b0059;
    width: 100%;
    height: 90%;
    flex-direction: column-reverse;
    text-align: center;
    justify-content: center;
    top: 10%;
    right: 100%;
    margin: 0;
    position: absolute;
    z-index: 500;
    transition: 0.3s;
  }
  .active-menu {
    right: 0;
  }
  .option {
    width: 40%;
    margin: 20px auto;
  }
}
</style>