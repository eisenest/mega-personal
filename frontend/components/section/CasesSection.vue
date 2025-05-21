<template>
  <section class="container">
    <div class="cases__container">
      <div class="cases__header">
        <h2>Кейсы</h2>
        <Pagination
            v-if="isDesktop"
            :current="currentCaseIndex"
            :total="cases.length"
            @prev="prevCase"
            @next="nextCase"
        />
      </div>

      <div class="cases__content">
        <div class="cases__left">
          <h4>{{ currentCase.title }}</h4>
        </div>

        <div class="cases__right">
          <div class="case-block">
            <h5>Задачи</h5>
            <div v-html="currentCase.task"></div>
          </div>
          <div class="case-block">
            <h5>Решение</h5>
            <div v-html="currentCase.decision"></div>
          </div>
          <div class="case-block">
            <h5>Вывод</h5>
            <div v-html="currentCase.summary"></div>
          </div>
        </div>
      </div>

      <div class="mobile-pagination" v-if="!isDesktop">
        <Pagination
            :current="currentCaseIndex"
            :total="cases.length"
            @prev="prevCase"
            @next="nextCase"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Pagination from "~/components/elements/Pagination.vue"

const { cases } = defineProps<{ cases: any[] }>()

const currentCaseIndex = ref(0)
const isDesktop = ref(true)

const currentCase = computed(() => {
  if (!cases || !Array.isArray(cases) || cases.length === 0) return {}
  return cases[currentCaseIndex.value] || {}
})

function prevCase() {
  if (currentCaseIndex.value > 0) {
    currentCaseIndex.value--
  }
}

function nextCase() {
  if (currentCaseIndex.value < cases.length - 1) {
    currentCaseIndex.value++
  }
}

onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth > 480
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>

<style scoped>
.cases__container {
  margin: 0 auto;
}

.cases__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
  margin-top: 200px;
}

.cases__header h2 {
  padding: 0;
}

.case-block li p {
  margin: 0;
}

.cases__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
}

.cases__right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.case-block {
  background: white;
  border-radius: 16px;
  padding: 24px;
}

.case-block h5 {
  margin: 0;
}

.case-block ul {
  margin-top: 8px;
  padding-left: 20px;
  list-style: disc;
}

@media (max-width: 1024px) {
  .cases__content {
    grid-template-columns: 1fr;
  }
  .cases__left {
    margin-bottom: 24px;
  }
}

@media screen and (max-width: 480px) {
  .cases__header{
    margin-top: 80px;
    margin-bottom: 16px;
  }

  .cases__left h4{
    margin: 0;
  }
}

.mobile-pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
