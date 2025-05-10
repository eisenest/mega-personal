<script setup lang="ts">

import FormSection from "~/components/section/FormSection.vue";
import ContactSection from "~/components/section/ContactSection.vue";

useHead({
  title: 'Контакты Mega-Personal: свяжитесь с нами для оптимизации вашего бизнеса',
  meta: [
    { name: 'description', content: 'Обратитесь в Mega-Personal для консультаций по аутстаффингу и кадровым решениям. Мы на связи, чтобы помочь вам снизить риски и оптимизировать управление персоналом. Звоните или пишите!' },
  ],
})

</script>

<template>
  <ContactSection/>

  <FormSection/>
</template>

<style scoped>

</style>