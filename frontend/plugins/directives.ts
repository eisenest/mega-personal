import { defineNuxtPlugin } from '#app'
import { phoneMask } from '~/directives/phoneMask'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('phone-mask', phoneMask)
})
