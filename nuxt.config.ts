// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-lucide-icons',
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },
  compatibilityDate: '2024-12-25',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  lucide: {
    namePrefix: 'Icon',
  },
})
