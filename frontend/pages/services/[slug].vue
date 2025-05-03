<script setup lang="ts">

import ValueCard from "~/components/cards/ValueCard.vue";
import SecondHeroSection from "~/components/section/SecondHeroSection.vue";
import AnotherGoalCard from "~/components/cards/AnotherGoalCard.vue";
import MissionSection from "~/components/section/MissionSection.vue";
import StepRowSection from "~/components/section/StepRowSection.vue";
import FourStepSection from "~/components/section/FourStepSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import FaqSection from "~/components/section/FaqSection.vue";
import VacanciesSection from "~/components/section/VacanciesSection.vue";

const route = useRoute()
const apiBase = useRuntimeConfig().public.apiBase
const { data: service } = await useFetch(`${apiBase}/api/services/${route.params.slug}`)

</script>

<template>

  <SecondHeroSection
      :title="service.title"
      :description="service.description"
      image="/about/service.png"
      :show-button="true"
  />

  <div v-if="service.problems">
    <h2  class="center headline"><span class="highlight">Ситуации, когда мы вам необходимы</span></h2>
    <div class="values__grid">
      <ValueCard
          v-for="(item, index) in service.problems"
          :key="index"
          :number="index + 1"
          :title="item.title"
          :description="item.description"
          :showTitle="true"
          :class="{ 'shifted': index === 3 }"
      />
    </div>
  </div>

  <VacanciesSection
      v-if="service.employees"
      :title="'Каких сотрудников мы регулярно набираем'"
      :categories=service.employees
  />

  <div v-if="service.advantages">
    <h2 class="headline"><span class="highlight">Наши преимущества</span></h2>
    <div class="advantages-grid">
      <AnotherGoalCard
          v-for="(item, index) in service.advantages"
          :key="index"
          :title="item.title"
          :description="item.description"
      />
    </div>
  </div>

  <MissionSection :description=service.mission />
  <div class="mission__grid">
    <ValueCard
        v-for="(item, index) in service.missionCards"
        :key="index"
        :number="index + 1"
        :title="item.title"
        :description="item.description"
        :showTitle="true"
    />
  </div>

  <div v-if="service.recruitmentSteps">
    <h2 class="headline"><span class="highlight">Как происходит рекрутинг для вашей  компании?</span></h2>
    <StepRowSection class="service" :steps="service.recruitmentSteps" />
  </div>

  <FourStepSection :steps="service.resultSteps"/>

  <FormSection :fixed-tab="0"/>

  <FaqSection v-if="service.faq" :questions="service.faq" />

</template>

<style scoped>

.center.headline{
  text-align: center;
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.advantages-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  //grid-template-rows: repeat(2, 300px);
  gap: 24px;
}

.mission__grid{
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}


</style>