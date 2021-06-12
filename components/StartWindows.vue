<template>
  <div class="windows-start">
    <div class="box box-windows box-start flex items-center justify-center">
      <div class="box-content-inside">
        <h1 class="text-center mb-4">
          Ingresa tu fecha <br />
          de nacimiento
        </h1>
        <vue-form
          :state="formstate"
          @submit.prevent="onSubmit"
          class="grid grid-cols-6 gap-1 form-general"
        >
          <validate tag="label" class="form-model col-span-2">
            <select
              v-model="model.day"
              name="day"
              required
              placeholder="Día"
              class="w-full form-general-input cursor-hidden"
            >
              <option value="" disabled selected checked hidden>Día</option>
              <option v-for="day in days" :value="day" :key="day">
                {{ day }}
              </option>
            </select>
          </validate>

          <validate tag="label" class="form-model col-span-2">
            <select
              v-model="model.month"
              name="month"
              required
              placeholder="Mes"
              class="w-full form-general-input cursor-hidden"
            >
              <option value="" disabled selected checked hidden>Mes</option>
              <option v-for="month in months" :value="month" :key="month">
                {{ month }}
              </option>
            </select>
          </validate>

          <validate tag="label" class="form-model col-span-2">
            <select
              v-model="model.year"
              name="year"
              required
              class="w-full form-general-input cursor-hidden"
            >
              <option value="" disabled selected checked hidden>Año</option>
              <option v-for="year in years" :value="year" :key="year">
                {{ year }}
              </option>
            </select>
          </validate>

          <div class="col-span-6 mt-1 text-center">
            <span ref="validYears">
              DEBES SER MAYOR DE EDAD PARA CONTINUAR
            </span>
          </div>

          <div class="col-span-6 mt-3 btn-group">
            <button type="submit" class="btn btn-custom submit cursor-link">
              Aceptar
            </button>
          </div>
          <div class="col-span-6">
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
  data() {
    return {
      lengthDays: 31,
      formstate: {},
      model: {
        day: '',
        month: '',
        year: '',
      },
      messageError: null,
      array_restaurant: [],
      showLoading: false,
    }
  },
  methods: {
    padLeadingZeros(num, size) {
      var s = num + ''
      while (s.length < size) s = '0' + s
      return s
    },
    async onSubmit() {
      this.$refs.validYears.style.color = 'inherit'
      if (this.formstate.$invalid) {
        return
      }
      let age = this.calculateAdult(
        this.model.year + '-' + this.model.month + '-' + this.model.day
      )

      if (age < 18) {
        this.$refs.validYears.style.color = 'red'
        return
      }
      this.$emit('next')
      // otherwise submit form
    },
    calculateAdult(birthDate) {
      return Math.floor(
        (new Date() - new Date(birthDate).getTime()) / 3.15576e10
      )
    },
  },
  watch: {
    'model.month'(newValue, oldValue) {
      if (newValue == '02') {
        this.lengthDays = 29
        this.model.day = this.model.day > 29 ? 29 : this.model.day
      } else {
        this.lengthDays = 31
      }
    },
  },
  computed: {
    days() {
      return Array.from({ length: this.lengthDays }, (value, index) =>
        this.padLeadingZeros(1 + index, 2)
      )
    },
    months() {
      return Array.from({ length: 12 }, (value, index) =>
        this.padLeadingZeros(1 + index, 2)
      )
    },
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1900 }, (value, index) => year - index)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-general-select,
.form-general-input {
  font-size: 31px !important;
  height: 60px;
  border: 1px solid #06205c;
  border-radius: 10px;
  text-align: center;
  background-color: transparent;
  color: rgb(6 32 92 / 40%);
  -moz-appearance: none;
  -webkit-appearance: none;
  text-align: center;
  text-align-last: center;
  -moz-text-align-last: center;
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
