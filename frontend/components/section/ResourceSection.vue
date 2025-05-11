<template>
  <section class="resources-section">
    <div class="container">
      <h2 class="vacancies-title headline">Ресурсы</h2>
    </div>
    <div class="resources-scroll-wrapper" ref="scrollContainer">
      <div class="resources-scroll">
        <div
            v-for="(card, index) in [...services, ...services]"
            :key="index + '-' + card.desc"
            class="resource-card"
        >
          <div class="icon-wrapper">
            <img :src="card.icon" alt="Иконка" class="icon" />
          </div>
          <p class="text">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const services = [
  { icon: '/resources/1.png', desc: 'Кадровое и бухгалтерское сопровождение' },
  { icon: '/resources/2.png', desc: 'Собственная CRM-система с кандидатами +50000' },
  { icon: '/resources/3.png', desc: 'Собственный call-центр и +30 рекрутеров' },
  { icon: '/resources/4.png', desc: 'Отдел подбора персонала по регионам ' },
  { icon: '/resources/5.png', desc: 'Офисы в +10 регионах' },
  { icon: '/resources/6.png', desc: 'HR-отдел  для онлайн и offline тренингов' },
  { icon: '/resources/7.png', desc: 'Постоянно растущая база опытных рекрутеров' },
  { icon: '/resources/8.png', desc: 'Отдел подбора персонала по Москве и МО' }
]

const scrollContainer = ref<HTMLElement | null>(null)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  const container = scrollContainer.value
  if (!container) return

  interval = setInterval(() => {
    container.scrollLeft += 1
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0
    }
  }, 20)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.resources-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
}

.resources-scroll-wrapper {
  width: 100vw;
  margin-left: calc(-1 * (100vw - 100%) / 2);
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap;
  overflow-y: hidden;
}

.resources-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.resources-scroll {
  display: flex;
  gap: 16px;
  padding: 16px;
  width: max-content;
}

.resource-card {
  flex: 0 0 auto;
  display: flex;
  height: 185px;
  width: 426px;
  padding: 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.icon-wrapper {
  width: 40px;
  height: 40px;
}

.icon {
  width: 100%;
  height: auto;
}

.text {
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
  text-wrap: auto;
}
</style>
