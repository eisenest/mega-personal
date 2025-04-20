<template>
  <section class="vacancies-section container">

    <div class="vacancies__title-content headline">
      <h2 class="vacancies-title">Вакансии</h2>
      <div class="vacancies__description">
        <p class="p24">
          Наша компания предоставляет полный список услуг для поиска лучших кандидатов на рынке труда под ваши персональные запросы!
        </p>
      </div>
    </div>

    <div class="vacancies-content">
      <div class="categories-list">
        <button
            v-for="(category, index) in categories"
            :key="index"
            :class="['category-button', { active: selectedCategoryIndex === index }]"
            @click="selectCategory(index)"
        >
          <p class="category-title">{{ category.title }}</p>
          <p class="category-subtitle">{{ category.subtitle }}</p>
        </button>
      </div>
      <div class="positions-grid">
        <div
            v-for="(position, index) in categories[selectedCategoryIndex].positions"
            :key="index"
            class="position-card"
        >
          <span class="dot">▪</span>
          {{ position }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedCategoryIndex = ref(0)

const categories = [
  {
    title: 'Retail',
    subtitle: 'Различные вакансии в супермаркетах, гипермаркетах',
    positions: ['Кассир', 'Продавец', 'Работник торгового зала', 'Сканировщик', 'Грузчик', 'Курьер']
  },
  {
    title: 'Складская логистика',
    subtitle: 'Работа на складах, на производстве',
    positions: []
  },
  {
    title: 'Строительство',
    subtitle: 'Включает проектирование и возведение объектов',
    positions: []
  },
  {
    title: 'Гостиничный бизнес',
    subtitle: 'Работа в отелях и гостиницах',
    positions: []
  },
  {
    title: 'Сельское хозяйство',
    subtitle: 'Включает рабочие места на фермах и полях',
    positions: []
  },
  {
    title: 'Производство',
    subtitle: 'Включает проектирование и возведение объектов',
    positions: []
  },
  {
    title: 'Вахтовая работа или подработка',
    subtitle: '',
    positions: []
  }
]

function selectCategory(index) {
  selectedCategoryIndex.value = index
}
</script>

<style scoped>

.vacancies__title-content {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
  padding: 0;
}

.vacancies__title-content h2{
  margin: 0;
  flex: 1;
  display: flex;
}

.vacancies__title-content p{
  width: 60%;
}

.vacancies-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 100px;
}


.vacancies-content {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 280px;
}

.category-button {
  padding: 24px;
  border-radius: 24px;
  background: #EDF7FF;
  text-align: left;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.category-button.active {
  background: #3795f4;
  color: white;
}

.category-button.active .category-subtitle,
.category-button.active .category-title{
  color: #fff;
  opacity: 0.8;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.category-subtitle {
  font-size: 18px;
  opacity: 0.7;
  margin: 0;
}

.positions-grid {
  flex-wrap: wrap;
  height: fit-content;
  gap: 12px;
  flex: 2;
  align-items: flex-start;
  display: flex;
}

.position-card {
  background: white;
  padding: 32px 40px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  color: #5c1ce0;
  font-size: 18px;
  line-height: 1;
}
</style>
