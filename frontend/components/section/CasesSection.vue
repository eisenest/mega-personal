<template>
  <section class="container">
    <div class="cases__container">
      <div class="cases__header">
        <h2>Кейсы</h2>
        <Pagination
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
          <div class="case-block" >
            <h5>Задачи</h5>
            <div v-html="currentCase.task"></div>
          </div>
          <div class="case-block">
            <h5>Решение</h5>
            <div v-html="currentCase.decision"></div>
          </div>
          <div class="case-block" >
            <h5>Вывод</h5>
            <div v-html="currentCase.summary"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Pagination from "~/components/elements/Pagination.vue"

const { cases } = defineProps<{ cases: any[] }>()


// const cases = Array.from({ length: 4 }, () => JSON.parse(JSON.stringify(baseCase)))
const currentCaseIndex = ref(0)
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

.case-block li p{
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
</style>
