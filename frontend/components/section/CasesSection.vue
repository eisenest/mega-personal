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
          <div class="case-block" v-for="(block, index) in caseBlocks" :key="index">
            <h5>{{ block.title }}</h5>
            <div v-html="block.content" :class="{ 'collapsed': isMobile && !expandedBlocks[index] }"></div>
            <button
                v-if="isMobile && isContentOverflowing[index]"
                class="read-more"
                @click="toggleExpand(index)"
            >
              {{ expandedBlocks[index] ? 'Скрыть' : 'Подробнее...' }}
            </button>
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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Pagination from "~/components/elements/Pagination.vue"

const { cases } = defineProps<{ cases: any[] }>()

const currentCaseIndex = ref(0)
const isDesktop = ref(true)
const isMobile = computed(() => !isDesktop.value)
const expandedBlocks = ref<boolean[]>([false, false, false])
const isContentOverflowing = ref<boolean[]>([false, false, false])

const currentCase = computed(() => {
  if (!cases || !Array.isArray(cases) || cases.length === 0) return {}
  return cases[currentCaseIndex.value] || {}
})

const caseBlocks = computed(() => [
  { title: 'Задачи', content: currentCase.value.task },
  { title: 'Решение', content: currentCase.value.decision },
  { title: 'Вывод', content: currentCase.value.summary },
])

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

function toggleExpand(index: number) {
  expandedBlocks.value[index] = !expandedBlocks.value[index]
}

function checkOverflow() {
  nextTick(() => {
    isContentOverflowing.value = caseBlocks.value.map((_, i) => {
      const el = document.querySelectorAll('.case-block div')[i] as HTMLElement
      return el && el.scrollHeight > 200
    })
  })
}

onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth > 480
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
  watch(currentCase, checkOverflow, { immediate: true })
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
  position: relative;
}

.case-block h5 {
  margin: 0;
}

.case-block ul {
  margin-top: 8px;
  padding-left: 20px;
  list-style: disc;
}

.read-more {
  background: none;
  border: none;
  color: #5c1ce0;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.collapsed {
  max-height: 160px;
  overflow: hidden;
  position: relative;
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
