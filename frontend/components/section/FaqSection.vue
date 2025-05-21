<template>
  <section class="faq-section container">
    <h3 class="headline">Вопрос - ответ</h3>

    <div class="faq-item" v-for="(item, index) in questions" :key="index">
      <button class="faq-question" @click="toggle(index)">
        <span>{{ item.question }}</span>
        <svg
            class="faq-icon"
            :class="{ rotated: openedIndex === index }"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <transition name="fade">
        <div class="faq-answer p24" v-if="openedIndex === index">
          {{ item.answer }}
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>

defineProps({
  questions: Object,
})

import { ref } from 'vue'

const openedIndex = ref(null)

const toggle = (index) => {
  openedIndex.value = openedIndex.value === index ? null : index
}


</script>

<style scoped>
.faq-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  gap: 16px;
}

.faq-title {
  font-size: clamp(28px, 6vw, 42px);
  font-weight: 700;
  margin: 0;
}

.faq-item {
  background: white;
  border-radius: 16px;
  padding: 40px;
}

.faq-question {
  padding: 0;
  width: 100%;
  color: #2c3e50;
  background: none;
  font-size: clamp(20px, 2vw, 32px);
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-icon {
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  margin-top: 33px;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.fade-enter-to,
.fade-leave-from {
  max-height: 200px;
  opacity: 1;
}

@media screen and (max-width: 480px) {
  .faq-item{
    padding: 16px;
  }
}

</style>
