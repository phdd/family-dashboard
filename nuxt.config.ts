// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/ionic', '@nuxtjs/tailwindcss'],
  css: ['~/assets/ionic.scss', '~/assets/style.scss'],
  ssr: false
})