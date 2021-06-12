<template>
  <div class="windows-thanks">
    <div class="box box-windows box-thanks flex items-center overflow-hidden">
      <div class="box-content-inside">
        <div class="wrapper gift-wrapper">
          <img src="/images/fondo_revel.jpg" />
          <h3>Gracias por participar</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.gift {
  &-wrapper {
    color: #9c0525;
    @apply font-semibold;
    font-family: 'Hudson NY Serif';
    font-weight: normal;
    font-style: normal;
    font-size: 32px;
    @apply text-center;
    @apply relative;
    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
}
</style>
