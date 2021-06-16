<template>
  <div class="windows-register">
    <div class="box box-windows box-register flex items-center">
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
        <h1 class="text-center mb-5">Completa tus datos</h1>
        <vue-form
          :state="formstate"
          @submit.prevent="onSubmit"
          class="grid grid-cols-6 gap-3 form-general"
        >
          <validate tag="label" class="form-model col-span-6">
            <input
              v-model="model.name"
              required
              name="name"
              placeholder="Nombre"
              class="w-full form-general-input cursor-hidden"
            />
          </validate>

          <validate tag="label" class="form-model col-span-6">
            <input
              v-model="model.last_name"
              required
              name="last_name"
              placeholder="Apellido"
              class="w-full form-general-input cursor-hidden"
            />
          </validate>

          <validate
            tag="label"
            class="form-model col-span-3"
            :custom="{
              customValidator: customValidatorEmail,
            }"
          >
            <input
              v-model="model.email"
              name="email"
              type="email"
              required
              placeholder="Correo"
              class="w-full form-general-input cursor-hidden"
            />
          </validate>

          <validate tag="label" class="form-model col-span-3">
            <input
              v-model="model.phone"
              name="phone"
              required
              pattern="^\d{3}-\d{3}-\d{3}$"
              v-mask="'###-###-###'"
              placeholder="Teléfono"
              class="w-full form-general-input cursor-hidden"
            />
          </validate>

          <validate
            tag="label"
            class="col-span-6 form-model form-checkbox flex gap-1 mt-2"
          >
            <input
              v-model="model.terms"
              required
              type="checkbox"
              value="1"
              name="agree"
              id="terms"
            />
            <span class="text-sm flex-1" style="margin-top: -4px">
              Acepto los TÉRMINOS Y CONDICIONES Y POLÍTICAS DE PRiVACIDAD
            </span>
          </validate>

          <div class="col-span-6 mt-0 btn-group">
            <button type="submit" class="btn btn-custom submit cursor-link">
              Aceptar
            </button>
          </div>
          <div class="col-span-6" v-if="messageError">
            <div class="alert">
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
    birtday: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formstate: {},
      model: {
        name: '',
        last_name: '',
        email: '',
        phone: '',
        terms: [1],
      },
      messageError: null,
      array_restaurant: [],
      showLoading: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    }
  },
  methods: {
    async onSubmit() {
      this.messageError = null
      if (this.formstate.$invalid) {
        return
      }
      this.showLoading = true
      let newForm = {
        name: this.model.name,
        last_name: this.model.last_name,
        email: this.model.email,
        phone: this.model.phone,
      }
      // let response = await this.$axios
      //   .$post('formulario', newForm)
      //   .catch((err) => {
      //     this.messageError = 'Ya participaste el dia de hoy'
      //     console.log(err)
      //   })
      this.showLoading = false

      // if (!response) {
      //   return
      // }
      this.$emit('next', newForm)
      // otherwise submit form
    },
    customValidatorEmail: function (value) {
      return this.reg.test(value) ? true : false
    },
  },
  computed: {
    isEmailAvailable: function () {
      // return true to set input as $valid, false to set as $invalid
    },
  },
  async mounted() {},
}
</script>

<style lang="scss" scoped>
.alert {
  background: #d24646f2;
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 1px;
}
.form {
  &-checkbox {
    font-size: 12px;
    &.vf-field-invalid {
      input,
      span {
        color: red !important;
      }
    }
  }
  &-general {
    &-select,
    &-input {
      font-size: 18px !important;
      border: 2px solid #06205c;
      border-radius: 10px;
      height: 40px;
      @apply px-2;
      background-color: transparent;
      color: rgb(6 32 92 / 40%);
      -moz-appearance: none;
      -webkit-appearance: none;
      &.vf-dirty {
        color: rgb(6 32 92 / 100%);
      }
      &::-ms-expand {
        display: none;
      }
      &::placeholder {
        text-transform: uppercase;
        color: rgb(6 31 91 / 40%);
      }
      option {
        color: #000;
        &[value=''][disabled] {
          display: none;
        }
      }
      &:required:invalid {
        color: #c1c1c1;
      }
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
</style>
