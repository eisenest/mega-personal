<template>
    <SecondHeroSection
        title="Компания Mega-Personal"
        description="Ваш надёжный партнёр в аутсорсинге бизнес-процессов, подборе и управлении персоналом. Мы предоставляем решения, которые оптимизируют кадровые процессы и снижают затраты на их управление."
        image="/hero/about.png"
        :show-button="true"
    />

    <div class="stats">
      <PropsCard v-for="(item, index) in propsData"
                 :key="index"
                 :number="item.number"
                 :description="item.description"
      />
    </div>

    <MissionSection :description=mission_description />
    <CompanyValuesSection/>
    <HorizonSection/>
    <OurGoalSection/>
    <OurServicesSection/>
    <ReviewsSection />
    <FormSection />

</template>

<script setup>
import ReviewsSection from "~/components/section/ReviewsSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import PropsCard from "~/components/cards/PropsCard.vue";
import SecondHeroSection from "~/components/section/SecondHeroSection.vue";
import MissionSection from "~/components/section/MissionSection.vue";
import CompanyValuesSection from "~/components/section/CompanyValuesSection.vue";
import HorizonSection from "~/components/section/HorizonSection.vue";
import OurGoalSection from "~/components/section/OurGoalSection.vue";
import OurServicesSection from "~/components/section/OurServicesSection.vue";

const propsData = [
  { number: "10", description: "Лет опыта в индустрии" },
  { number: "30000", description: "Трудоустроенных сотрудников" },
  { number: "200", description: "Компаний среди партнеров и клиентов" },
];

const mission_description = "Мы предоставляем высококачественные услуги по подбору и управлению персоналом, помогая клиентам оптимизировать бизнес-процессы, сокращать затраты и устойчиво расти.\n" +
    "Стремимся быть надёжным партнёром, снабжая компании трудовыми ресурсами, соблюдая законодательные нормы."

</script>

<style scoped>

.hero-text h1 {
  font-size: 42px;
  line-height: 1.2;
  margin-bottom: 16px;
}

.hero-text .blue {
  color: #0c90f2;
}


.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin: 2rem 0;
}

</style>
