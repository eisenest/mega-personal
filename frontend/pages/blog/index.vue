<script setup lang="ts">

import BlogSection from "~/components/section/BlogSection.vue";
import SubscribeSection from "~/components/section/SubscribeSection.vue";

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