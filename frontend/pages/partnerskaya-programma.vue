<script setup lang="ts">

import SecondHeroSection from "~/components/section/SecondHeroSection.vue";
import AnotherGoalCard from "~/components/cards/AnotherGoalCard.vue";
import ExpectationsSection from "~/components/section/ExpectationsSection.vue";
import StepRowSection from "~/components/section/StepRowSection.vue";
import FaqSection from "~/components/section/FaqSection.vue";
import FormSection from "~/components/section/FormSection.vue";
import {onMounted, ref} from "vue";

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { data: faq } = await useFetch(`${apiBase}/api/partnership-faq`)
const isDesktop = ref(true)

onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth > 480
    console.log(isDesktop.value)
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

useHead({
  title: 'Партнерская программа Mega-Personal – сотрудничество и новые возможности для соискателей',
  meta: [
    { name: 'description', content: 'Присоединяйтесь к партнерской программе Mega-Personal и помогите другим найти работу по всей России, получая доход от сотрудничества с нашей компанией.' },
  ],
})

const cards = [
  { title: 'Гибкий график', description: 'Возможность работать из дома и планировать свой день самостоятельно.' },
  { title: 'Оперативное подтверждение', description: 'Как только кандидат отработает одну смену, наш менеджер подтверждает его трудоустройство на следующий рабочий день.' },
  { title: 'Оплата по факту выхода кандидата на работу', description: 'Оплата производится после подтверждения в CRM-системе в течение 2-х рабочих дней.' },
  { title: 'Удобные условия для самозанятых и ИП', description: 'Самозанятые могут легко работать с чеками, а ИП – с актами и счетами, соблюдая все налоговые требования.' },
  { title: 'Отсутствие задержек', description: 'Мы не практикуем «раз в неделю» или «раз в месяц» выплаты, что гарантирует вам быстрый доступ к средствам.' },
  { title: 'Поддержка и работа в команде', description: 'Вы можете связаться с нами в любое время, чтобы обсудить закрытые вакансии и уточнить детали по оплате.' },
  { title: 'Доступ к базе вакансий через IT-платформу на сайте', description: 'От 1500+ вакансий от линейных профессий до найма специалистов по всей России.' },
  { title: 'Обучение в CRM', description: 'Еженедельное обучение по работе с вакансиями в CRM-системе.' }
]

const steps = [
  {
    title: 'Регистрация на нашем портале',
    description: 'Зарегистрируйтесь на сайте и получите доступ к личному кабинету.'
  },
  {
    title: 'Доступ к неограниченной базе вакансий на нашей платформе',
    description:
        'Как зарегистрированный рекрутер, вы сможете направлять своих кандидатов на самые актуальные и интересные предложения, максимально увеличивая их шансы на трудоустройство.'
  },
  {
    title: 'Поддержка и обучение каждую неделю',
    description:
        'Мы предлагаем постоянную поддержку и обучение для рекрутеров, которые зарегистрировались на нашем портале. Вам будут доступны ресурсы, советы и рекомендации по улучшению ваших навыков поиска и подбора кадров.'
  },
  {
    title: 'Направление кандидатов',
    description:
        'Мы предлагаем простую и интуитивно понятную CRM-систему, которая позволит вам отслеживать статус заявок, выбирать направления и вакансии по всей стране.'
  },
  {
    title: 'Оперативная оплата',
    description:
        'Мы ценим ваш труд и обеспечиваем оперативную оплату за каждого успешно трудоустроенного кандидата. Оплата проходит быстро и удобно.'
  },
  {
    title: 'Обратная связь и развитие',
    description:
        'Мы активно собираем обратную связь от наших рекрутеров, чтобы улучшить качество сервиса и добавить новые функции, соответствующие вашим потребностям.'
  }
]

</script>

<template>
  <SecondHeroSection
      title="Партнерская программа"
      description="Зарабатывайте на поборе сотрудников онлайн через удобную IT-платформу. Подбирайте сотрудников в штат и получайте неограниченный доход. "
      image="/about/partnership.png"
      :show-button="true"
  />

  <h2 v-if="isDesktop" class="headline"><span class="highlight">Наши преимущества</span></h2>
  <div class="partnership-grid">
    <AnotherGoalCard
        v-for="(item, index) in cards"
        :key="index"
        :title="item.title"
        :description="item.description"
    />
  </div>


  <ExpectationsSection/>

  <h2 class="headline"><span class="highlight">Как мы сотрудничаем?</span></h2>
  <StepRowSection
      :steps="steps"
  />

  <div class="container white register">
    <h2><span class="highlight">Ждем ваших кандидатов!</span></h2>
    <p class="p24">
      Мы уверены, что сотрудничество с нами станет для вас выгодным и плодотворным.
    </p>
    <NuxtLink
        :to="{query: { tab: 0 }, hash: '#form' }"
    >
      <button>Зарегистрироваться сейчас!</button>
    </NuxtLink>
  </div>

  <FaqSection :questions="faq.faq" />

  <FormSection :fixed-tab="2"/>

</template>

<style scoped>


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

.partnership-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 300px);
  gap: 24px;
}


@media screen and (max-width: 480px) {
  .partnership-grid{
    grid-template-columns: repeat(1, 1fr);
  }
  .headline[data-v-b6b2c1dd] {
    text-align: left;
  }

  .register{
    margin: 80px 0 16px;
  }
}


</style>