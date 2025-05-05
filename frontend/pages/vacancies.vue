<script setup lang="ts">

import SecondHeroSection from "~/components/section/SecondHeroSection.vue";
import ValueCard from "~/components/cards/ValueCard.vue";
import VacanciesSection from "~/components/section/VacanciesSection.vue";
import StepRowSection from "~/components/section/StepRowSection.vue";
import FaqSection from "~/components/section/FaqSection.vue";
import CustomerReviewSection from "~/components/section/CustomerReviewSection.vue";
import PhotoSection from "~/components/section/PhotoSection.vue";
import HelpFormSection from "~/components/section/HelpFormSection.vue";

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: vacancies } = await useFetch(`${apiBase}/api/vacancies`)

const values = [
  {
    title: "Гарантия трудоустройства",
    description: 'Бесплатное трудоустройство в течение 24 часов.  Гарантированный доход, премии и отсутствие штрафов.  '
  },
  {
    title: "Гибкий график выплат",
    description: 'Частые выплаты заработной платы. Производим оплату точно в срок!',
  },
  {
    title: "Гибкий график работы",
    description: 'От 4 часов и возможность совмещать занятость (индивидуальные графики).  '
  },
  {
    title: "Доброжелательное отношение",
    description: 'Мы ценим ваш труд и всегда стремимся к установлению партнерских отношений.',
  },
  {
    title: "Карьерный рост",
    description: 'Хорошие люди всегда нужны.',
  },
  {
    title: "Индивидуальный подход",
    description: 'Мы проводим личные собеседования, чтобы понять ваши карьерные цели.',
  }
]

const steps = [
  {
    title: 'Выберите вакансию',
    description: 'Ознакомьтесь с доступными предложениями и найдите подходящую работу.'
  },
  {
    title: 'Запишитесь на собеседование',
    description:
        'Оставьте заявку и договоритесь о встрече на объекте.'
  },
  {
    title: 'Получите работу!',
    description:
        'Пройдите собеседование и приступайте к новой должности.'
  }
]

function goTo(url: string) {
  window.open(url, '_blank')
}


</script>

<template>
  <SecondHeroSection
      title="Mega-Personal – работа для всех!"
      description="Гарантируем Вам бесплатное трудоустройство в течение 24 часов и стабильный доход. За 10 лет работы мы трудоустроили более 30 000 человек по всей России."
      image="/about/vacancies.png"
      :show-button="true"
  />

  <h2 class="headline"><span class="highlight">Мы предлагаем вам</span></h2>
  <div class="values__grid">
    <ValueCard
        v-for="(item, index) in values"
        :key="index"
        :number="index + 1"
        :title="item.title"
        :description="item.description"
        :showTitle="true"
    />
  </div>


  <VacanciesSection :title="'Вакансии'"
                    :subtitle="'Наша компания предоставляет полный список услуг для поиска лучших кандидатов на рынке труда под ваши персональные запросы!'"
                    :categories="vacancies.vacancies" />


  <div class="services__title-content headline">
    <h2><span class="highlight">Как это работает?</span></h2>
    <div class="services__description">
      <p>
        Наша компания предоставляет полный список услуг для поиска лучших кандидатов на рынке труда под ваши персональные запросы!
      </p>
    </div>
  </div>
  <StepRowSection :steps="steps" />

  <HelpFormSection/>

  <FaqSection :questions="vacancies.faq" />

  <CustomerReviewSection :reviews="vacancies.reviews"/>

  <PhotoSection :photos="vacancies.photos"/>

  <div class="container white register">
    <h2 class="headline"><span class="highlight">Следите за нами в социальных сетях</span></h2>
    <p class="p24">
      Подписывайтесь на наши социальные сети и будьте в курсе новых вакансий, реальных отзывов сотрудников и всех преимуществ работы с нами!
    </p>
    <div class="social-buttons">
      <button class="social-button" @click="goTo('https://vk.com/mega_personal')">
        <img src="/icon/vk.svg" alt="VK" class="icon" /> Вконтакте
      </button>

      <button class="social-button" @click="goTo('https://rutube.ru/channel/59234567/')">
        <img src="/icon/rutube.svg" alt="RUTUBE" class="icon" /> RUTUBE
      </button>

      <button class="social-button" @click="goTo('https://t.me/mega_personal_job')">
        <img src="/icon/tg-white.svg" alt="Telegram" class="icon" /> Телеграм
      </button>

    </div>
  </div>



</template>

<style scoped>


.services__description p{
  width: 70%;
  text-align: left;
  margin-left: auto;
}

.services__title-content {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
  padding: 0;
}

.services__title-content h2{
  margin: 0;
  flex: 1 1 200px;
  display: flex;
}

.headline{
  text-align: center;
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.headline{
  text-align: center;
}

.register{
  margin-top: 200px;
  text-align: center;
  padding: 2.5rem;
}

.register h2{
  margin: 0;
}

.register p{
  margin: 32px 0;
}

.social-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.social-buttons button{
  align-items: center;
  display: flex;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  margin-right: 8px;
}


</style>