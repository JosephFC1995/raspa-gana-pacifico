<template>
  <div class="windows-start">
    <div class="box box-windows box-start flex items-center justify-center">
      <div class="loading" :class="[showLoading ? '' : 'hidden']">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="box-content-inside">
        <h1 class="text-center">Ingresa tu código</h1>
        <vue-form
          :state="formstate"
          @submit.prevent="onSubmit"
          class="form-general"
        >
          <validate tag="label" class="form-model col-span-6 mt-5">
            <input
              v-model="model.code"
              required
              name="name"
              v-mask="'XXXXXXXXXX'"
              placeholder="Código"
              class="w-full form-general-input cursor-hidden"
            />
          </validate>

          <div class="col-span-6 mt-3 flex justify-center">
            <button type="submit" class="btn btn-custom submit cursor-link">
              Participar
            </button>
          </div>
          <div class="col-span-6 hidden">
            <div class="alert" v-if="messageError">
              {{ messageError }}
            </div>
          </div>
        </vue-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gift: {
      type: String,
      default: 'Ganaste Una doble malta',
    },
    response: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      lengthDays: 31,
      formstate: {},
      model: {
        code: '',
      },
      messageError: null,
      array_restaurant: [],
      showLoading: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.formstate.$invalid) {
        return
      }
      this.showLoading = true
      let response = await this.$axios
        .$get(`ValidarCodigo/${this.model.code}`)
        .catch((err) => {
          console.log(err)
          this.$toast.error('El código ingresado es inválido.', {
            position: 'bottom-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: false,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: false,
            icon: false,
            rtl: false,
          })
        })
      this.showLoading = false

      if (!response) {
        return
      }
      this.$emit('next', response)
      // otherwise submit form
    },
  },
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 0 !important;
  &-content-inside {
    display: flex;
    flex-direction: column;
    min-height: var(--size-min-box);
    justify-content: center;
  }
}
.form {
  &-general {
    // flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    &-select,
    &-input {
      &.vf-submitted {
        &.vf-invalid {
          border-color: red;
          color: red !important;
          &::placeholder {
            color: red !important;
          }
        }
      }
    }
  }
}
.form-general-select,
.form-general-input {
  font-size: 31px !important;
  height: 60px;
  border: 2px solid #06205c;
  border-radius: 50px;
  text-align: center;
  background-color: transparent;
  color: rgb(6 32 92 / 40%);
  -moz-appearance: none;
  -webkit-appearance: none;
  text-align: center;
  text-align-last: center;
  -moz-text-align-last: center;
  text-align: -webkit-center;
  &.vf-dirty {
    color: rgb(6 32 92 / 100%);
  }
  &::-ms-expand {
    display: none;
  }
  &::placeholder {
    text-transform: uppercase;
    text-align: center;
    color: rgb(6 31 91 / 40%);
  }
}
</style>
