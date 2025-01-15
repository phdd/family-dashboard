// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/ionic',
    '@nuxtjs/tailwindcss',
    'nuxt-particles',
    '@vite-pwa/nuxt'
  ],
  plugins: ['~/plugins/audio.ts'],
  css: ['~/assets/ionic.scss', '~/assets/style.scss'],
  ssr: false,
  pwa: {
    client: {
      periodicSyncForUpdates: 60,
    },
    manifest: {
      name: 'Family Dashboard',
      short_name: 'Dasboard',
      theme_color: '#ffffff',
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  }
})