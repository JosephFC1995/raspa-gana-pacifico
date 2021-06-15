<template>
  <div class="windows-gift">
    <div class="box box-windows box-start box-gift overflow-hidden">
      <div class="box-content-inside">
        <template v-if="true">
          <div class="gift winner">
            <div class="content">
              <img src="/images/bote_pacif.png" alt="Botella pacífico" />
              <div class="texts">
                <h4 class="uppercase">
                  cerveza con un sabor más refrescante <br />
                  que te invita a disfrutar las cosas <br />
                  simples de la vida.
                </h4>
                <h1 class="mb-0 uppercase text-right">
                  ¡Felicidades! <br />
                  GANASTE UNA PACÍFICO
                </h1>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <dif class="gift lose">
            <h1 class="text-center mb-0 uppercase">
              sIGUE INTENTANDO <br />
              GRACIAS POR PARTICIPAR
            </h1>
          </dif>
        </template>
      </div>
    </div>
    <div class="indications--floating">
      <h4>REFRÉSCATE EN #MODOPACÍFICO</h4>
    </div>
    <!-- <div class="btn-group mt-10" :style="{ height: '44px' }">
      <a class="btn btn-custom" @click="$emit('next')" v-if="showButtonNext"
        >Continuar</a
      >
    </div> -->
  </div>
</template>

<script>
import party from 'party-js'

export default {
  props: {
    response: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      percentage: 0,
      finish: false,
      brush: {
        size: 60,
        shape: 'round',
      },
      showButtonNext: false,
      showLoading: false,
    }
  },
  methods: {
    showParty() {
      let siteColors = ['#ffa68d', '#850D29']
      party.screen({
        color: siteColors,
        size: party.minmax(6, 12),
        count: party.variation(50 * (window.innerWidth / 1980), 0.4),
        angle: -180,
        spread: 80,
        angularVelocity: party.minmax(6, 9),
      })
    },
  },
  computed: {},
  mounted() {
    let t = this
    setTimeout(() => {
      t.showParty()
    }, 1500)
  },
}
</script>

<style lang="scss">
.box {
  margin-bottom: 0 !important;
  &-gift {
    .box-content-inside {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: var(--size-min-box);
      padding-right: 5px !important;
      padding-left: 2px !important;
      @media (max-width: 320px) {
        padding-left: 9px !important;
      }
      .gift {
        &.winner {
          .content {
            display: flex;
            @apply gap-1;
            img {
              height: 220px;
              @media (max-width: 320px) {
                height: 210px;
              }
            }
            .texts {
              @apply flex flex-col justify-between;
              h4 {
                text-align: right;
                font-size: 13px;
                @media (max-width: 320px) {
                  font-size: 12px;
                }
              }
              h1 {
                font-size: 24px;
                @apply flex flex-col items-center flex-1 justify-center;
                @media (max-width: 320px) {
                  font-size: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.gift {
  @apply w-full;
  flex: 0 0 100%;
  .content {
    @apply justify-around;
  }
  &-wrapper {
    color: #9c0525;
    @apply font-semibold  text-center relative;
    font-family: 'Hudson NY Serif';
    font-weight: normal;
    font-style: normal;
    font-size: 32px;
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

<style lang="scss" scoped>
.components-interaction {
  min-height: 240px;
  position: relative;
}
.indications--floating {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  h4 {
    font-size: 24px;
    font-weight: 600;
    font-family: 'SS Nickson Six';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    color: #f2ecc0;
  }
  .list {
    font-family: 'Hudson NY Serif';
    color: white;
    font-size: 14px;

    &-li {
      display: flex;
    }
    .point {
      color: #850d29;
      font-weight: 600;
      margin-right: 5px;
    }
  }
}
</style>
