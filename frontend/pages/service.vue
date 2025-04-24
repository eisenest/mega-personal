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

const values = [
  {
    title: 'Расширение штата',
    description: 'Когда ваша компания готовится к увеличению численности сотрудников или открытию новых филиалов.'
  },
  {
    title: 'Высокая текучесть кадров',
    description: 'Если частая смена сотрудников требует постоянного привлечения новых.'
  },
  {
    title: 'Закрытие сложных вакансий',
    description: 'Для найма редких специалистов или профессионалов высокого уровня.'
  },
  {
    title: 'Изменения в структуре бизнеса',
    description: 'Во время реорганизации или реструктуризации вашей организации.'
  },
  {
    title: 'Недостаток внутренних ресурсов',
    description: 'Если ваши внутренние HR-ресурсы перегружены.'
  }
]

const cards = [
  {
    title: 'Оплата по факту выхода кандидата на работу',
    description: 'Это уникальное преимущество, которое предлагает компаниям гибкость и уверенность в процессе найма.'
  },
  {
    title: 'Закрывают вакансии профессионалы',
    description: 'Работаем над закрытием вакансий с учетом специфики отрасли.'
  },
  {
    title: 'Большой выбор кандидатов',
    description: 'Используем больше 100 различных сайтов и каналов для поиска сотрудников, помимо собственной базы задействуем платные сайты, социальные сети и Telegram-каналы.'
  },
  {
    title: 'Экономим ваше время и деньги',
    description: 'Помогаем вам быстрее развиваться и тратить меньше денег.'
  },
  {
    title: 'Выбирайте лучшего кандидата',
    description: 'Вы сами решаете, кого взять на работу после собеседования.'
  },
  {
    title: 'Проверка рекомендаций',
    description: 'Проверяем отзывы от прошлых работодателей.'
  }
]

const recruitmentBenefits = [
  {
    title: 'Поиск ключевых менеджеров и редких специалистов',
    description: 'Наша команда использует современные инструменты и методы для поиска талантов, соответствующих вашим требованиям.'
  },
  {
    title: 'Поиск кандидатов на всевозможных площадках для максимального охвата',
    description: 'Наш многолетний опыт и ресурсная база помогают нам безошибочно искать кандидата под Ваш запрос там, где другие не справляются.'
  },
  {
    title: 'Отраслевая и профессиональная специализация',
    description: 'Понимаем специфику вашего бизнеса и подбираем кандидатов, которые соответствуют требованиям вакансии.'
  }
]

const mission_description = "Мы понимаем, что успех вашего бизнеса во многом зависит от качества команды. Поэтому мы предлагаем широкий спектр услуг, направленных на поиск и привлечение лучших специалистов в вашей отрасли. Ознакомьтесь с нашими ключевыми предложениями:"

const hiringStages = [
  {
    title: 'Планирование',
    description: 'Мы начинаем с тщательного анализа потребностей вашего бизнеса. Определяем количество и тип специалистов, необходимых для успешного выполнения ваших бизнес-процессов.'
  },
  {
    title: 'Составление вакансии',
    description: 'Учитываем все ключевые требования и ожидания от будущего сотрудника, чтобы привлечь наиболее подходящих кандидатов.'
  },
  {
    title: 'Сорсинг',
    description: 'Выделенный HR-отдел под ваши задачи активно ищет кандидатов через различные каналы, а также задействует свою базу кандидатов 45000+'
  },
  {
    title: 'Отбор кандидатов',
    description: 'Изучаем и сортируем анкетные данные, чтобы выделить наиболее подходящих соискателей. Понравившихся кандидатов приглашаем на собеседование в офис работодателя.'
  },
  {
    title: 'Наем',
    description: 'После успешного отбора мы составляем оффер — список условий, на которых работодатель готов предложить сотрудничество.'
  },
  {
    title: 'Испытательный срок',
    description: 'Адаптируем нового сотрудника и знакомим с командой и процессами.'
  }
]


const faqItems = [
  {
    question: 'Почему стоит обращаться именно в вашу компанию?',
    answer: 'Наша компания имеет многолетний опыт в подборе персонала и обширную базу кандидатов. Мы понимаем потребности бизнеса и находим лучших специалистов, соответствующих вашим требованиям.'
  },
  {
    question: 'Как вы подбираете кандидатов для наших вакансий?',
    answer: ''
  },
  {
    question: 'Как быстро я могу ожидать результаты?',
    answer: ''
  },
  {
    question: 'Какова стоимость ваших услуг?',
    answer: ''
  },
  {
    question: 'Какие отрасли вы обслуживаете?',
    answer: ''
  },
  {
    question: 'Как проходит оплата за услуги вашей компании по подбору кандидата?',
    answer: ''
  }
]

const categories = [
  {
    title: 'Сотрудники отдела продаж',
    positions: ['Менеджер по продажам', 'Руководитель отдела продаж', 'Оператор колл-центра', 'Торговый представитель ']
  },
  {
    title: 'Строительные позиции',
    positions: []
  },
  {
    title: 'Административный персонал',
    positions: []
  },
  {
    title: 'Руководители',
    positions: []
  }
]





</script>

<template>

  <SecondHeroSection
      title="Mega Personal- предоставление персонала"
      description="Профессиональный подбор персонала любого уровня полного цикла"
      image="/about/service.png"
      :show-button="true"
  />

  <h2 class="center headline"><span class="highlight">Ситуации, когда мы вам необходимы</span></h2>
  <div class="values__grid">
    <ValueCard
        v-for="(item, index) in values"
        :key="index"
        :number="index + 1"
        :title="item.title"
        :description="item.description"
        :showTitle="true"
        :class="{ 'shifted': index === 3 }"
    />
  </div>

  <VacanciesSection :title="'Каких сотрудников мы регулярно набираем'" :categories=categories />


  <h2 class="headline"><span class="highlight">Наши преимущества</span></h2>
  <div class="advantages-grid">
    <AnotherGoalCard
        v-for="(item, index) in cards"
        :key="index"
        :title="item.title"
        :description="item.description"
    />
  </div>

  <MissionSection :description="mission_description" />
  <div class="mission__grid">
    <ValueCard
        v-for="(item, index) in recruitmentBenefits"
        :key="index"
        :number="index + 1"
        :title="item.title"
        :description="item.description"
        :showTitle="true"
    />
  </div>

  <h2 class="headline"><span class="highlight">Как происходит рекрутинг для вашей  компании?</span></h2>
  <StepRowSection class="service" :steps="hiringStages" />

  <FourStepSection/>

  <FormSection :fixed-tab="0"/>

  <FaqSection :questions="faqItems" />

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