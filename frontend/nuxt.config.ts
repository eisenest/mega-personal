// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
        }
      ]
    }
  },
  experimental: {
    payloadExtraction: false
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:5050' // ⚠️ здесь наш новый порт
    }
  },
  // 👇 Это важно для Docker
})
