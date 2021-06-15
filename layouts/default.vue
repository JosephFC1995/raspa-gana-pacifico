<template>
  <div class="main">
    <div class="content--nuxt">
      <div class="border--nuxt">
        <Nuxt />
      </div>
    </div>
    <div class="footer cop">
      <h1>
        TOMAR BEBIDAS ALCOHÓLICAS <br />
        EN EXCESO ES DAÑINO
      </h1>
    </div>
  </div>
</template>

<style lang="scss">
.main {
  @apply flex flex-col;
  height: 95vh;
  .content--nuxt {
    @apply flex-1  pt-4 pr-4 pl-4;
    .border--nuxt {
      @apply flex items-center h-full relative;
      border: 1px solid #f2ecc0;
    }
  }
}
</style>
