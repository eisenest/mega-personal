<template>
  <section class="container">
    <div class="reviews__container">
      <div class="reviews__header">
        <h2>Отзывы</h2>
        <Pagination
            :current="currentReviewIndex"
            :total="reviews.length - reviewsPerPage + 1"
            @prev="prevReview"
            @next="nextReview"
        />
      </div>

      <div class="review-cards">
        <div class="review-card" v-for="(item, index) in currentReviewChunk" :key="index">
          <div class="review-card__header">
            <img :src="item.logo" alt="Логотип" class="logo" />
            <div class="company">
              <strong>{{ item.company }}</strong>
              <small>{{ item.person }}</small>
              <small class="role">{{ item.role }}</small>
            </div>
          </div>
          <div class="review-card__text">
            <div class="quote">“</div>
            <p class="text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from "~/components/elements/Pagination.vue"

const reviews = [
  {
    company: 'Деловые линии',
    person: 'Шеянова О.Д.',
    role: 'Руководитель направления аутсорсинг',
    logo: '/partners/delovye.svg',
    text: 'Услуги по договору оказываются на неизменно высоком уровне. Сотрудники компании демонстрируют профессионализм и клиентоориентированность. Мы готовы рекомендовать ООО «Ресурс Плюс» как надёжного Партнёра.'
  },
  {
    company: 'Ижевский завод тепловой техники г. Киржач',
    person: 'К.Х. Каримов',
    role: 'Исполнительный директор',
    logo: '/partners/iztt.svg',
    text: 'Компания зарекомендовала себя с положительной стороны. Все условия договора соблюдаются точно. Наши просьбы и замечания выполняются оперативно и своевременно. Мы готовы рекомендовать ООО «Ресурс Плюс» как надежного партнера.'
  },
  {
    company: 'Глобус',
    person: 'А.Е. Быстрова',
    role: 'Управляющий гипермаркета "Глобус" Одинцово',
    logo: '/partners/globus.svg',
    text: 'За время работы компания зарекомендовала себя как добросовестного эффективного исполнителя. Услуги по договору оказываются на высоком уровне, сотрудники демонстрируют профессионализм и клиентоориентированность...'
  },
  {
    company: 'Деловые линии',
    person: 'Шеянова О.Д.',
    role: 'Руководитель направления аутсорсинг',
    logo: '/partners/delovye.svg',
    text: 'Услуги по договору оказываются на неизменно высоком уровне. Сотрудники компании демонстрируют профессионализм и клиентоориентированность. Мы готовы рекомендовать ООО «Ресурс Плюс» как надёжного Партнёра.'
  },
  {
    company: 'Ижевский завод тепловой техники г. Киржач',
    person: 'К.Х. Каримов',
    role: 'Исполнительный директор',
    logo: '/partners/iztt.svg',
    text: 'Компания зарекомендовала себя с положительной стороны. Все условия договора соблюдаются точно. Наши просьбы и замечания выполняются оперативно и своевременно. Мы готовы рекомендовать ООО «Ресурс Плюс» как надежного партнера.'
  },
  {
    company: 'Глобус',
    person: 'А.Е. Быстрова',
    role: 'Управляющий гипермаркета "Глобус" Одинцово',
    logo: '/partners/globus.svg',
    text: 'За время работы компания зарекомендовала себя как добросовестного эффективного исполнителя. Услуги по договору оказываются на высоком уровне, сотрудники демонстрируют профессионализм и клиентоориентированность...'
  }
]

const currentReviewIndex = ref(0)
const reviewsPerPage = 3

const currentReviewChunk = computed(() => {
  return reviews.slice(currentReviewIndex.value, currentReviewIndex.value + reviewsPerPage)
})

function prevReview() {
  if (currentReviewIndex.value > 0) {
    currentReviewIndex.value--
  }
}

function nextReview() {
  if (currentReviewIndex.value + reviewsPerPage < reviews.length) {
    currentReviewIndex.value++
  }
}
</script>

<style scoped>
.reviews__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
  margin-top: 200px;
}

.reviews__header h2 {
  padding: 0;
}

.review-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.review-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 576px;
  height: 440px;
  justify-content: space-between;
}

.review-card__header {
  display: flex;
  gap: 16px;
  align-items: center;
}

.logo {
  padding: 20px;
  width: 160px;
  object-fit: contain;
}

.company strong {
  display: block;
  font-size: clamp(16px, 1vw, 24px) !important;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 16px;
}

.company small {
  display: block;
  font-size: clamp(15px, 1vw, 18px);
  color: #555;
  margin-bottom: 4px;
}

.company small.role {
  font-size: 14px;
  color: #555;
}

.quote {
  font-size: 40px;
  line-height: 0.5;
  margin-top: 8px;
}

.text {
  line-height: 1.5;
  color: #333;
}
</style>