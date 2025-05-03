<template>
  <BlogArticle :article="article" />
  <BlogSection :is-main="true" :title="'Читать по этой теме'"/>
  <FormSection :fixed-tab="0"/>
</template>

<script setup lang="ts">
import BlogSection from "~/components/section/BlogSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import BlogArticle from "~/components/section/BlogArticle.vue";

const route = useRoute()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: article }= await useFetch(`http://backend:5050/api/articles/${route.params.slug}`)

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>
