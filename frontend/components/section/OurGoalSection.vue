<template>
  <section class="goal-section container">
    <div class="goal-header">
      <h2>Наша цель — <span class="highlight">ваш успех!</span>
      </h2>
      <p>
        Мы предлагаем комплексное решение, которое гарантирует достижение этой цели.
      </p>
    </div>
    <div class="goal-grid">
      <AnotherGoalCard
          v-for="(goal, index) in goals"
          :key="index"
          :title="goal.title"
          :description="goal.text"
      />
    </div>
  </section>
</template>

<script setup>
import AnotherGoalCard from "~/components/cards/AnotherGoalCard.vue";

const goals = [
  {
    title: 'Собственный штат опытных сотрудников',
    text: 'Мы знаем, как важно иметь нужных людей на нужных местах, и готовы оперативно решать ваши задачи.'
  },
  {
    title: 'Тщательный анализ потребностей',
    text: 'Изучая рабочие процессы вашей компании, мы помогаем избежать лишних затрат и оптимизировать расходы на персонал. Каждая деталь имеет значение!'
  },
  {
    title: 'Расширение ресурсов',
    text: 'Планируете открыть филиал в новом городе? Мы возьмем на себя все заботы по подбору и управлению персоналом, закрывая потребности в кратчайшие сроки.'
  },
  {
    title: 'Соблюдение законодательства',
    text: 'Мы работаем строго в рамках трудового, гражданского и налогового законодательства. Это не просто слова — это ваша гарантия надёжности и безопасности бизнеса.'
  },
  {
    title: 'Конфиденциальность',
    text: 'Мы гарантируем защиту вашей информации. Со всеми сотрудниками, участвующими в оказании услуг, заключаются соглашения о неразглашении.'
  },
  {
    title: 'Результативность',
    text: 'Наша цель — экономия вашего времени и средств, повышение эффективности работы персонала и улучшение финансовых показателей вашей компании.'
  },
]
</script>

<style scoped>
.goal-section {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
}

.goal-header h2 {
  margin: 0;
  flex: 0 1 50%;
}

.goal-header p {
  max-width: 420px;
  font-size: 18px;
  line-height: 150%;
  margin: 0 auto 0 0;
}

.goal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .goal-header {
    flex-direction: column;
    gap: 24px;
  }

  .goal-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .goal-header p {
    font-size: 16px;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .goal-header h2 {
    font-size: 32px;
  }
}
</style>
