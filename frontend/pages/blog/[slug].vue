<template>
  <BlogArticle :article="article" />
  <BlogSection
      :is-main="true"
      :title="'Читать по этой теме'"
      :posts="articles"
  />
  <FormSection :fixed-tab="0"/>
</template>

<script setup lang="ts">
import BlogSection from "~/components/section/BlogSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import BlogArticle from "~/components/section/BlogArticle.vue";

const route = useRoute()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: article }= await useFetch(`${apiBase}/api/articles/${route.params.slug}`)

const { data: articles } = await useFetch(`${apiBase}/api/articles`)

console.log(article)

useHead(() => ({
  title: article.value
      ? `${article.value.title} — Блог — Mega Personal`
      : 'Загрузка...'
}))

</script>
