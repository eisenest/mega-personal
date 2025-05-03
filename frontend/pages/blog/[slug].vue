<template>
  <section class="blog-article container" v-if="article">
    <div class="article-header">
      <div class="article-header__image">
        <img :src="article.image" alt="Фото статьи" class="article-image" />
      </div>
      <div class="article-header__text">
        <p class="article-date">{{ formatDate(article.date) }}</p>
        <h1 class="article-title" v-html="article.title" />
        <p class="article-intro">{{ article.intro }}</p>
      </div>
    </div>
    <div class="article-content">
      <article class="article-body" v-html="article.content" />
    </div>
  </section>
</template>

<script setup lang="ts">
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
