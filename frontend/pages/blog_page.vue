<script setup lang="ts">

import FormSection from "~/components/section/FormSection.vue";
import BlogSection from "~/components/section/BlogSection.vue";
import BlogArticle from "~/components/section/BlogArticle.vue";
</script>

<template>


  <BlogArticle/>
  <BlogSection :is-main="true" :title="'Читать по этой теме'"/>
  <FormSection :fixed-tab="0"/>
</template>

<style scoped>

</style>