<script setup lang="ts">

import SecondHeroSection from "~/components/section/SecondHeroSection.vue";
import ValueCard from '~/components/cards/ValueCard.vue'
import SafetyTablesSection from "~/components/section/SafetyTablesSection.vue";
import AnotherGoalCard from "~/components/cards/AnotherGoalCard.vue";

const showTitles = false

const values = [
  { description: 'Проведение инструктажей по охране труда.' },
  {
    description:
        'Проведение обучения по охране труда в соответствии с постановлением Правительства РФ от 24 декабря 2021 года № 2464 «О порядке обучения по охране труда и проверки знаний требований охраны труда».'
  },
  { description: 'Внесение сведений об обученных лицах в реестр на сайте Минтруда РФ.' },
  {
    description:
        'Обеспечение средствами индивидуальной защиты (СИЗ), смывающими и обезвреживающими средствами.'
  },
  {
    description:
        'Проведение обязательных предварительных и периодических медицинских осмотров работников.'
  },
  {
    description:
        'Проведение специальной оценки условий труда (СОУТ) на рабочих местах и оценку профессиональных рисков.'
  }
]

const goalCards = [
  {
    title: 'Профессионализм и экспертиза',
    description: 'Многолетний опыт и соблюдение всех стандартов безопасности.',
  },
  {
    title: 'Минимизация юридических рисков',
    description: 'Ответственность за выполнение всех процедур, снижение риска нарушений и штрафов, своевременное оформление документов.',
  },
  {
    title: 'Экономия ресурсов',
    description: 'Сокращение затрат на штатного специалиста по охране труда.',
  },
  {
    title: 'Отсутствие штрафов',
    description: 'Профессиональный подход обеспечивает полное соответствие нормативам и предотвращает штрафы за нарушения охраны труда.',
  }
]



</script>

<template>

  <SecondHeroSection
      title="Охрана труда"
      description="Mega-Personal обеспечивает выполнение всех требований законодательства в сфере охраны труда для своих сотрудников, что включает:"
      image="/about/protection.png"
      :show-button="false"
  />

  <div class="values__grid">
    <ValueCard
        v-for="(item, index) in values"
        :key="index"
        :number="index + 1"
        :description="item.description"
        :showTitle="showTitles"
    />
  </div>

  <SafetyTablesSection/>

  <h2 class="headline"><span class="highlight">Охрана труда</span> Mega-Personal</h2>

  <div class="goal-grid">
    <AnotherGoalCard
        v-for="(item, index) in goalCards"
        :key="index"
        :title="item.title"
        :description="item.description"
    />
  </div>



</template>

<style scoped>

.headline{
  text-align: center;
}


.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.goal-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 300px);
  gap: 24px;
}



</style>