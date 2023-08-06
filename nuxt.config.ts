// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/styles/tailwind.css', '~/assets/styles/main.css'],

  modules: ['@pinia/nuxt', '@element-plus/nuxt'],
  // components: true,
  // components: [
  //   {
  //     path: '~/components', // will get any components nested in let's say /components/test too
  //     pathPrefix: false,
  //   },
  // ],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      // API_BASE_URL: 'test',
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
