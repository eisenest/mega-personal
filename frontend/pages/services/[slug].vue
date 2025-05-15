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
const config = useRuntimeConfig()
const { data: service } = await useFetch(`${config.public.apiBase}/api/services/${route.params.slug}`)

useHead(() => ({
  title: service.value.metaTitle
      ? `${service.value.metaTitle} — Mega Personal`
      : 'Загрузка...',
  meta: [
    { name: 'description', content: service.value.metaDescription ? service.value.metaDescription : '' },
  ],
}))

</script>

<template>

  <SecondHeroSection
      :title="service.title"
      :description="service.description"
      :image="config.public.publicHost + '/uploads/' + service.image"
      :show-button="true"
  />

  <div v-if="service.problems">
    <h2  class="center headline"><span class="highlight">{{ service.problemsTitle || 'Ситуации, когда мы вам необходимы' }}</span></h2>
    <div class="values__grid">
      <ValueCard
          v-for="(item, index) in service.problems"
          :key="index"
          :number="index + 1"
          :title="item.title"
          :description="item.description"
          :showTitle="true"
          :class="{ shifted: service.problems.length === 5 && index === 3 }"
      />
    </div>
  </div>
  <VacanciesSection
      v-if="service.employees.length > 0"
      :title="service.employeesTitle"
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

  <MissionSection
      v-if="service.mission"
      :description=service.mission />
  <div v-if="service.missionCards" class="mission__grid">
    <ValueCard
        v-for="(item, index) in service.missionCards"
        :key="index"
        :number="index + 1"
        :title="item.title"
        :description="item.description"
        :showTitle="true"
    />
  </div>

  <div v-if="service.recruitmentSteps.length > 0">
    <h2 class="headline"><span class="highlight">{{ service.recruitmentStepsTitle|| 'Как происходит рекрутинг для вашей  компании ?' }}</span></h2>
    <StepRowSection class="service" :steps="service.recruitmentSteps" />
  </div>

  <FourStepSection
      v-if="service.resultSteps.length > 0"
      :title="service.resultStepsTitle"
      :steps="service.resultSteps"
  />

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
  gap: 24px;
}

.mission__grid{
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}


</style>