<template>
  <section class="vacancies-section container">
    <div class="vacancies__title-content headline">
      <h2 class="vacancies-title">{{ title }}</h2>
      <div v-if="subtitle" class="vacancies__description">
        <p class="p24">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="vacancies-content">
      <!-- Desktop layout -->
      <template v-if="isDesktop">
        <div class="categories-list">
          <button
              v-for="(category, index) in categories"
              :key="index"
              :class="['category-button', { active: selectedCategoryIndex === index }]"
              @click="selectCategory(index)"
          >
            <div>
              <p class="category-title">{{ category.title }}</p>
              <p v-if="category.subtitle !== null" class="category-subtitle">{{ category.subtitle }}</p>
            </div>
            <span class="arrow"><img src="/icon/expand-white.svg" alt="" /></span>
          </button>
        </div>

        <div class="positions-grid">
          <div
              v-for="(position, index) in displayedPositions"
              :key="index"
              class="position-card"
          >
            <span class="dot">▪</span>
            {{ position }}
          </div>
        </div>
      </template>

      <!-- Mobile layout -->
      <template v-else>
        <div class="mobile-categories">
          <div v-for="(category, index) in categories" :key="index" class="mobile-category">
            <button
                class="category-button"
                :class="{ active: selectedCategoryIndex === index }"
                @click="toggleCategory(index)"
            >
              <div>
                <p class="category-title">{{ category.title }}</p>
                <p v-if="category.subtitle !== null" class="category-subtitle">{{ category.subtitle }}</p>
              </div>

              <span class="arrow">
                <img :src="selectedCategoryIndex === index ? '/icon/vac-dropdown-open.svg' : '/icon/vac-dropdown-close.svg'"
                     alt=""/>
              </span>
            </button>
            <div v-if="selectedCategoryIndex === index" class="positions-grid">
              <div
                  v-for="(position, index) in displayedPositions"
                  :key="index"
                  class="position-card"
              >
                <span class="dot">▪</span>
                {{ position }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const route = useRoute()
const isDesktop = ref(true)
const selectedCategoryIndex = ref(0)

const props = defineProps({
  title: {
    type: String,
    default: 'Каких сотрудников мы регулярно набираем',
  },
  subtitle: String,
  categories: Array,
})

function selectCategory(index) {
  selectedCategoryIndex.value = index
}

function toggleCategory(index) {
  selectedCategoryIndex.value = selectedCategoryIndex.value === index ? -1 : index
}

const displayedPositions = computed(() => {
  const category = props.categories[selectedCategoryIndex.value]
  return route.href === '/vakansii' ? category?.services || [] : category?.positions || []
})

onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth > 768
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>

<style scoped>
.vacancies__title-content {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
  padding: 0;
}

.vacancies__title-content h2 {
  margin: 0;
  flex: 1;
  display: flex;
}

.vacancies__title-content p {
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
  width: 100%;
}

.category-button.active {
  background: #3795f4;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  display: flex;
}

.category-button.active .category-subtitle,
.category-button.active .category-title {
  color: #fff;
  opacity: 0.8;
}
.arrow {
  display: block;
  margin: auto 0;
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
  margin-top: 16px;
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

.vacancies__description {
  flex: 2;
}

@media (max-width: 768px) {
  .vacancies-content {
    flex-direction: column;
  }

  .vacancies__title-content{
    flex-direction: column;
    align-items: baseline;
    gap: 16px;
  }

  .vacancies__title-content p{
    width: 100%;
  }

  .mobile-category:has(.category-button.active) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 8px;
    width: 100%;
    background: #3795f4;
  }

  .mobile-category {
    background: transparent;
    border-radius: 24px;
  }

  .category-button {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 8px;
  }

  .category-button.active {
    padding-bottom: 0;
  }

  .positions-grid {
    padding: 0 16px 16px;
    margin: 0;
  }

  .position-card {
    font-size: 18px;
    padding: 16px;
  }
}
</style>
