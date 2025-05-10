<script setup lang="ts">

import BlogSection from "~/components/section/BlogSection.vue";
import SubscribeSection from "~/components/section/SubscribeSection.vue";

useHead({
  title: 'Блог Mega-Personal: полезные статьи об аутстаффинге и управлении персоналом',
  meta: [
    { name: 'description', content: 'Читайте наш блог для получения актуальных советов по аутстаффингу, оптимизации кадровых процессов и снижению трудовых рисков. Полезные материалы для вашего бизнеса от Mega-Personal.' },
  ],
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { data: articles } = await useFetch(`${apiBase}/api/articles`)

</script>

<template>
    <BlogSection :is-main="false" :posts="articles" />
    <SubscribeSection/>
</template>

<style scoped>




</style>