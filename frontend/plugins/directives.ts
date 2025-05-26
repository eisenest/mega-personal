import { defineNuxtPlugin } from '#app'
import { phoneMask } from '~/directives/phoneMask'
import { dateMask } from '~/directives/dateMask'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('phone-mask', phoneMask)
    nuxtApp.vueApp.directive('date-mask', dateMask)
})
