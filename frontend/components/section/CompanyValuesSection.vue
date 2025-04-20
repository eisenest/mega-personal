<template>
  <section class="container values">
    <div class="values__header">
      <h2 class="values__title">
        Ценности компании <br />
        <span class="highlight">Mega-Personal</span>
      </h2>
      <p class="values__intro">
        Мы строим свою работу на доверии, ответственности и инновациях.
        Эти ценности помогают нам создавать прочные отношения, вдохновлять
        на развитие и находить лучшие решения для каждого клиента.
      </p>
    </div>

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
  </section>
</template>

<script setup>
import ValueCard from "~/components/cards/ValueCard.vue";

const values = [
  {
    title: 'Профессионализм',
    description: 'Наша команда — настоящие мастера своего дела, готовые предложить вам лучшие решения для достижения целей.',
  },
  {
    title: 'Индивидуальный подход',
    description: 'Каждая компания — это уникальная история. Поэтому мы изучаем ваши потребности и создаем решения, которые идеально вписываются в ваш бизнес.',
  },
  {
    title: 'Надежность',
    description: 'Соблюдая все законодательные нормы и гарантируя конфиденциальность, мы обеспечиваем безопасность вашего дела.',
  },
  {
    title: 'Эффективность',
    description: 'Время — это деньги! Мы оптимизируем процессы подбора персонала, чтобы вы могли сосредоточиться на главном — развитии вашего бизнеса.',
  },
  {
    title: 'Инновации',
    description: 'Совершенствуя наши методы и подходы, мы остаемся на передовой управления персоналом, предлагая вам самые актуальные решения.',
  },
  {
    title: 'Ответственность',
    description: 'Мы понимаем, что от нашей работы зависит ваш успех.',
  },
]
</script>

<style scoped>
.values {
  margin: 200px 0;
}

.values__header {
  display: grid;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 48px;
  grid-template-columns: repeat(2, 1fr);
}

.values__title {
  margin: 0;
}

.values__intro {
  flex: 1 1 400px;
  font-size: 18px;
  color: #2c3e50;
  line-height: 1.6;
}

.highlight {
  color: #1c9eff;
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

</style>
