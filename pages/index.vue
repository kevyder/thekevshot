<template>
  <div class="main">
    <div class="left">
      <h1>Kevin Rodríguez - Street Photography</h1>
      <social />
    </div>
    <div class="right">
      <slider />
    </div>
  </div>
</template>

<style>
.main {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.main .left {
  width: 40%;
}

.main .right {
  width: 60%;
}

.main .left, .main .right {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main .left h1 {
  font-family: 'Inconsolata', monospace;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  color: #000000;
}
</style>
