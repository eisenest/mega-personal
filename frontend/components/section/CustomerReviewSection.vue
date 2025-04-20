<template>
  <section class="reviews-section container">
    <div class="reviews-header">
      <h2>Отзывы</h2>
      <Pagination
          :current="0"
          :total="4"
      />
    </div>
    <div class="reviews-grid">
      <div v-for="(review, index) in visibleReviews" :key="index" class="review-card">
        <div class="review-user">
          <img :src="review.avatar" class="avatar" />
          <div class="review-user-info">
            <span class="review-date">{{ review.date }}</span>
            <strong>{{ review.name }}</strong>
            <span class="review-role">{{ review.role }}</span>
          </div>
        </div>
        <div class="review-text">
          <p><strong>Преимущества:</strong><br />{{ review.advantages }}</p>
          <p><strong>Недостатки:</strong><br />{{ review.disadvantages }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from "~/components/elements/Pagination.vue";

const reviews = [
  {
    name: 'Anastasiya',
    date: '25 февраля 2025',
    role: 'Продавец',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    advantages: 'Откликнулась на вакансию продавца через Авито в агенство Мега-Персонал. Общение по телефону было четким и понятным. Не было ни каких подводных камней, все как и написано в объявлении. Я трудоустроилась благодаря вам за 2 дня. Уже во всю работаю. Спасибо!',
    disadvantages: 'Недостатков нет.'
  },
  {
    name: 'Егор Жаворонков',
    date: '25 февраля 2025',
    role: 'Мерчендайзер',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    advantages: 'Рекомендую данного работодателя. Выплаты без задержек, вся зарплата белая, дружный коллектив, есть карьерный рост, помощь и обучение! Работаю уже 3-й год.',
    disadvantages: 'Недостатков за все время работы не обнаружила.'
  },
  {
    name: 'Марина',
    date: '25 февраля 2025',
    role: 'Продавец',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    advantages: 'Добрый день, хотелось бы поделиться впечатлениями о моей новой работе: - взаимопонимание с коллегами - удобный график - своевременная заработная плата Я рада быть частью такого дружного коллектива!',
    disadvantages: 'Не нашла недостатков.'
  },
]

const currentSlide = ref(0)
const reviewsPerPage = 3

const totalSlides = computed(() => Math.ceil(reviews.length / reviewsPerPage))
const visibleReviews = computed(() => {
  const start = currentSlide.value * reviewsPerPage
  return reviews.slice(start, start + reviewsPerPage)
})

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}
</script>

<style scoped>
.reviews-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.review-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-user {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.review-user-info {
  display: flex;
  flex-direction: column;
}

.review-text {
  margin-top: 24px;
}


.review-user-info strong {
  display: block;
  font-size: 24px !important;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
}

.review-date {
  font-size: 14px;
  color: #888;
}

.review-role {
  color: #5c1ce0;
  font-weight: 600;
  font-size: 18px;
}

.review-text p {
  margin: 0;
  line-height: 1.5;
  color: #2c3e50;
}
</style>
