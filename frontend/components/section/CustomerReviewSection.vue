<template>
  <section class="reviews-section container">
    <div class="reviews-header">
      <h2>Отзывы</h2>
      <Pagination
          v-if="isDesktop"
          :current="currentReviewIndex"
          :total="reviews.length - reviewsPerPage + 1"
          @prev="prevReview"
          @next="nextReview"
      />
    </div>
    <div class="reviews-grid">
      <div v-for="(review, index) in currentReviewChunk" :key="index" class="review-card">
        <div class="review-user">
          <img :src="`${config.public.publicHost}/uploads/${review.image}`" class="avatar" />
          <div class="review-user-info">
            <span class="review-date">{{ formatDate(review.date) }}</span>
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
    <div class="mobile-pagination" v-if="!isDesktop">
      <Pagination
          :current="currentReviewIndex"
          :total="reviews.length"
          @prev="prevReview"
          @next="nextReview"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Pagination from "~/components/elements/Pagination.vue";

const { reviews } = defineProps<{ reviews: any[] }>()

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const config = useRuntimeConfig()

const isDesktop = ref(true)

const currentReviewIndex = ref(0)
const reviewsPerPage = computed(() => isDesktop.value ? 3 : 1)

const currentReviewChunk = computed(() => {
  return reviews.slice(currentReviewIndex.value, currentReviewIndex.value + reviewsPerPage.value)
})

function prevReview() {
  if (currentReviewIndex.value > 0) {
    currentReviewIndex.value--
  }
}

function nextReview() {
  if (currentReviewIndex.value + reviewsPerPage.value < reviews.length) {
    currentReviewIndex.value++
  }
}

onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth > 1024
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
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
  line-height: 150%;
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

@media screen and (max-width: 1024px){
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .mobile-pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>
