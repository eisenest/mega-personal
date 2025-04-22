<template>
  <section class="container white hero">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__content-block">
          <h1><span class="highlight">Mega Personal</span></h1>
          <h3>
            {{ slides[currentSlide].title }}
          </h3>

          <p>
            {{ slides[currentSlide].description }}
          </p>
          <button class="hero__cta">Оставить заявку</button>
        </div>

        <Pagination
            :current="currentSlide"
            :total="slides.length"
            @prev="prevSlide"
            @next="nextSlide"
        />
      </div>
      <div class="hero__images">
        <div
            class="img-wrapper"
            :style="{ backgroundImage: `url(${slides[currentSlide].main})` }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

.hero{
  padding: 0;
}

.hero__content-block *{
  margin-bottom: 24px ;
  margin-top: 0;
}

.hero__content{
  padding: 2rem;
}

.hero__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  height: 640px;
  position: relative;
  overflow: hidden;
}

.hero__content {
  flex: 1 1 500px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.hero__cta {
  color: white;
  padding: 18px 32px;
  border-radius: 45px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  cursor: pointer;
  margin-bottom: 24px;
}

.hero__images {
  flex: 1 1 500px;
  gap: 16px;
  height: 100%;
}

.hero__img img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: inherit;
}

.image-grid {
  position: relative;
  left: 300px;
}

.img-wrapper {
  overflow: hidden;
  border-radius: 24px;
  width: 100%;
  height: 100%;
  background-position-y: center;
  background-size: cover !important;
}


.img-wrapper img {
  display: block;
  -o-object-fit: fill;
  object-fit: fill;
  border-radius: 45px;
}

/* Основное изображение */
.img-main {
  align-self: center;
}

.img-main img{
  width: 425px;
  height: 425px;
}

/* Верхнее правое */

</style>
<script setup lang="ts">
import Pagination from '~/components/elements/Pagination.vue'
import { ref } from 'vue'

const slides = [
  {
    main: '/hero/hero1.png',
    title: 'Найдите лучших сотрудников для вашего бизнеса',
    description: 'Мы помогаем расти бизнесу любого масштаба и создаем достойные рабочие места по всей России.'


  },
  {
    main: '/hero/hero2.png',
    title: 'Работа для всех!',
    description: 'Работа в нашей команде - это стабильность, удобство и перспективы.'
  },
  {
    main: '/hero/hero3.png',
    title: 'Партнерская  программа для рекрутеров',
    description: 'Зарабатывайте на поборе сотрудников онлайн через удобную CRM-платформу. Подбирайте сотрудников в штат и получайте неограниченный доход.'
  }
]

const currentSlide = ref(0)


function prevSlide() {
  currentSlide.value =
      currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

function nextSlide() {
  currentSlide.value =
      currentSlide.value === slides.length - 1 ? 0 : currentSlide.value + 1
}


let interval: any = null

onMounted(() => {
  interval = setInterval(nextSlide, 5000) // авто-смена каждые 5 секунд
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

</script>