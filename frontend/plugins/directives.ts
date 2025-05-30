import { defineNuxtPlugin } from '#app'
import { phoneMask } from '~/directives/phoneMask'
import { dateMask } from '~/directives/dateMask'
import { dynamicMask} from "~/directives/dynamicMask";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('phone-mask', phoneMask)
    nuxtApp.vueApp.directive('date-mask', dateMask)
    nuxtApp.vueApp.directive('dynamic-mask', dynamicMask)
})
