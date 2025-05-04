<template>
  <HeroSection/>
  <PropsSection/>
  <GoalSection/>
  <ServiceSection/>
  <div class="resources-wrapper">
    <ResourceSection/>
  </div>
  <h2 class="headline"><span class="highlight">Нам доверяют</span></h2>
  <PartnersSection/>
  <h2 class="headline">Ваше партнёрство с нами <span class="highlight">будет выгодным</span> благодаря</h2>
  <ValuesSection/>
  <ReviewsSection/>
  <CasesSection/>
  <FormSection/>
  <BlogSection :is-main="true" :posts="articles" />

</template>

<script setup>
import PropsSection from "~/components/section/PropsSection.vue";
import ResourceSection from "~/components/section/ResourceSection.vue";
import PartnersSection from "~/components/section/PartnersSection.vue";
import ValuesSection from "~/components/section/ValuesSection.vue";
import ReviewsSection from "~/components/section/ReviewsSection.vue";
import CasesSection from "~/components/section/CasesSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import BlogSection from "~/components/section/BlogSection.vue";
import HeroSection from "~/components/section/HeroSection.vue";
import GoalSection from "~/components/section/GoalSection.vue";
import ServiceSection from "~/components/section/ServiceSection.vue";

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: articles } = await useFetch(`${apiBase}/api/articles`)



</script>

<style>
.main-block, .outsource-wrapper, .outsource-cards{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}


.highlight {
  color: var(--main-blue, #00A2F6);
}

</style>
