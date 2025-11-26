// nuxt.config.js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    mongodbUri: '',
    mongodbDbName: '',
    jwtSecret: '',
    jwtExpiresIn: '7d',
    jwtRefreshSecret: '',
    jwtRefreshExpiresIn: '30d',
    paystackSecretKey: '',
    sendgridApiKey: '',
    fromEmail: '',
    fromName: '',
    uploadDir: 'uploads',
    maxFileSize: '5242880',
    emailTemplatesDir: 'email-templates',

    // Public keys (exposed to client-side)
    public: {
      appUrl: 'http://localhost:3000',
      appName: 'InvoiceFlow',
      appDescription: 'B2B SaaS platform for invoice and receipt management',
      paystackPublicKey: ''
    }
  },

  // CSS configuration
   tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // Nitro configuration
  nitro: {
    experimental: {
      wasm: true
    }
  }
})