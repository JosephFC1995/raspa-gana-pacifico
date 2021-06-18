<template>
  <div
    class="container px-5 flex flex-col content-center justify-center mx-auto box-inner"
  >
    <div class="content-interaction">
      <img
        src="/images/logo.png"
        alt="Cusquenia"
        srcset="/images/logo.png"
        class="logo"
      />
    </div>
    <div class="components-interaction">
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
      <fade-transition mode="out-in">
        <!-- Start -->
        <StartWindows v-if="currentWindows == 0" @next="getBirthdayUser" />
        <!-- Register -->
        <RegisterWindows v-else-if="currentWindows == 1" @next="getDataUser" />
        <!-- Ingresar código -->
        <InsertCodeWindows
          v-else-if="currentWindows == 2"
          @next="getCode"
          @code="setCode"
          :auth="auth"
        />
        <!-- Premio -->
        <GiftWindows
          v-if="currentWindows == 3"
          :response="responseCode"
          :code="code"
        />
        <!-- Thanks -->
        <!-- <ThanksWindows v-if="currentWindows == 3" /> -->
      </fade-transition>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ env }) {
    return {
      auth: {
        username: env.baseUsername,
        password: env.basePassword,
        baseURL: env.baseURL,
        authentication: env.baseAuthentication,
      },
    }
  },
  head() {
    return {
      title: 'Raspa y Gana Pacifico',
    }
  },
  data() {
    return {
      currentWindows: 3,
      birthday: '',
      showLoading: false,
      form: {},
      code: '',
      responseCode: null,
    }
  },
  methods: {
    setCode($event) {
      this.code = $event
    },
    getBirthdayUser($event) {
      this.birthday = $event
      this.currentWindows++
    },
    getDataUser($event) {
      this.form = $event
      this.form.birthday = this.birthday
      this.currentWindows++
    },
    async getCode($event) {
      if ($event.status == 3) {
        this.$toast.warning(
          $event.Message
            ? $event.Message
            : 'El código ingresado ya ha sido utilizado',
          {
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
          }
        )
        return
      }
      this.form.idcode = $event.idcode
      this.showLoading = true

      // let response = await this.$axios
      //   .$post('Registro', this.form, {
      //     credentials: true,
      //     auth: {
      //       username: this.auth.username,
      //       password: this.auth.password,
      //     },
      //     headers: {
      //       Authorization:
      //         'Basic ' + this.auth.authentication,
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })

      var myHeaders = new Headers()
      myHeaders.append('Authorization', 'Basic ' + this.auth.authentication)
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

      var urlencoded = new URLSearchParams()
      urlencoded.append('birthday', this.form.birthday)
      urlencoded.append('name', this.form.name)
      urlencoded.append('lastname', this.form.lastname)
      urlencoded.append('email', this.form.email)
      urlencoded.append('phone', this.form.phone)
      urlencoded.append('idcode', this.form.idcode)

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      }

      let response = await fetch(`${this.auth.baseURL}Registro`, requestOptions)
        .then((response) => {
          return response.json()
        })
        .catch((error) => console.log('error', error))

      this.showLoading = false

      if (!response) {
        this.$toast.error('El código ingresado es inválido.', {
          position: 'bottom-center',
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: false,
          rtl: false,
        })

        return
      }
      this.responseCode = $event
      this.currentWindows++
    },
    getResponse($event) {
      this.response = $event
      this.currentWindows++
    },
  },
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      setTimeout(() => {
        // window.scrollTo(0, 1)
        // document.body.requestFullscreen()
      }, 1500)
    }
  },
}
</script>

<style lang="scss">
:root {
  --size-min-box: 300px;
  @media (max-width: 320px) {
    --size-min-box: 280px;
    font-size: 13px;
  }
}
.Vue-Toastification__container {
  padding: 0 1rem !important;
}
* {
  outline: none !important;
  font-family: 'SS Nickson Six';
  font-weight: normal;
  font-style: normal;
}
body {
  background-image: url('/images/background_body.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  height: 100vh;
  font-style: normal;
  background-color: white;
}
form {
  select {
    &.vf-submitted.vf-invalid {
      border-color: red;
      color: rgb(255 0 0 / 40%);
    }
  }
}
.footer {
  bottom: 0;
  text-align: center;
  font-size: 21px;
  width: 100%;
  color: #f2ecc0;
  line-height: 1;
  letter-spacing: 7px;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 320px) {
    font-size: 15px;
  }
  h1 {
    margin: 0 14px;
    padding-top: 7px;
    padding-bottom: 7px;
    font-family: 'Founders Grotesk X-Cond Reg';
    font-weight: 600;
    font-style: normal;
  }
}
.logo {
  @apply mb-10 mx-auto;

  @media (max-width: 320px) {
    height: 65px;
  }
}
.box {
  &-windows {
    min-height: var(--size-min-box);
    width: 100%;
    @apply rounded-lg mb-5;
    background-image: url(/images/back_box.png);
    background-position: bottom right;
    background-repeat: no-repeat;
    @media (min-width: 640px) {
      width: 300px;
      margin: 0 auto;
      @apply mb-5;
    }
  }
  &-start {
    @apply relative;
  }
  &-start,
  &-register {
    background-color: #f8cd1f;
    color: #06205c;
    * {
      color: #06205c;
    }
  }

  &-content-inside {
    @apply p-5;
    @apply text-white;
    h1 {
      font-size: 1.75rem;

      @apply font-semibold;
      font-family: 'SS Nickson Six';
      font-weight: normal;
      font-style: normal;
      line-height: 1;
    }
    .malta {
      @apply mt-3;
      height: 85px;
    }
  }
  &-scratchable {
    min-height: auto;
    width: 320px;
    margin: 0 auto;
    .box-content-inside {
      padding: 0;
    }
  }
  &-thanks {
    min-height: auto;
    width: 320px;
    margin: 0 auto;
    .box-content-inside {
      padding: 0;
    }
  }
}
.btn {
  &-group {
    @apply flex;
    @apply justify-start;
  }
  &-custom {
    color: #f2ecc0;
    @apply rounded-2xl;
    background-color: #00205c;
    padding: 10px 35px;
    font-style: normal;
    cursor: pointer;
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.42, 0, 0.58, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
@media (orientation: landscape) and (max-width: 1200px) {
  .box-inner {
    min-height: 35rem;
  }
  body {
    min-height: 35rem;
  }
}
@media (orientation: portrait) {
  .footer {
    @apply relative;
  }
}

@media (orientation: landscape) {
  .footer {
    padding-top: 15px;
    background-size: contain;
  }
}
.loading {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: #000000cf;
  z-index: 99;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s, visibility 0.3s;
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
