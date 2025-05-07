<script setup lang="ts">

import FormSection from "~/components/section/FormSection.vue";
import ContactSection from "~/components/section/ContactSection.vue";

useHead({
  title: 'Контакты — Mega Personal',
  meta: [
    { name: 'description', content: 'Узнайте больше о нашей команде и миссии.' },
  ],
})

</script>

<template>
  <ContactSection/>

  <FormSection/>
</template>

<style scoped>

</style>