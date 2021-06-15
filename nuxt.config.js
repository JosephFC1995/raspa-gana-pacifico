export default {
    ssr: false,

    target: 'static',

    head: {
        title: 'raspa-gana',
        htmlAttrs: {
            lang: 'es',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    css: ['@/assets/font/stylesheet.css'],

    plugins: [
        '~/plugins/vue-form',
        '~/plugins/vue-the-mask',
        '~/plugins/vue-toast',
        // '~/plugins/vue-scratchable',
    ],

    components: true,

    buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/dotenv'],

    modules: ['@nuxtjs/axios'],

    axios: {
        baseURL: process.env.BASE_URL_API,
        headers: {
            common: {
                'X-Authorization': 'dgO9sxkRxFFFAYZ0Z4LfUR5yPXZPMjREow6f4SzSGbPycrp0FhC1FW4YlTWEeUGf',
            },
        },
    },

    build: {},
}