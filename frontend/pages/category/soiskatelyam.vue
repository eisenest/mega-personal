<script setup lang="ts">

import RecruitmentSection from "~/components/section/RecruitmentSection.vue";

const services = [
  {
    slug: '/vacansii',
    title: 'Вакансии',
    image: "/previews/vac.png"
  },
  {
    slug: '/partnerskaya-programma',
    title: 'Партнерская программа',
    image: "/previews/partneeship.png"
  },
]

</script>

<template>
  <template>
    <section class="container recruitment">
      <div class="recruitment__head">
        <h1 class="highlight title">Соискателям</h1>
        <h3 class="subtitle">Широкий выбор вакансий</h3>
        <p class="text">Мы стремимся помочь каждому найти подходящую работу, соответствующую их навыкам и желаниям. Присоединяйтесь к нам и откройте для себя новые карьерные возможности!</p>
      </div>

      <div class="recruitment__cards">
        <div
            v-for="(service, i) in services"
            :key="service.slug"
            :class="['card', i % 2 === 0 ? 'card--left' : 'card--right']"
        >
          <div class="card__text">
            <h4>{{ service.title }}</h4>
            <a :href="service.slug" class="card__link">
              Подробнее
              <span class="icon">❯</span>
            </a>
          </div>
          <div
              class="card__img"
              :style="{ backgroundImage: `url(${service.image})` }"
          ></div>
        </div>
      </div>
    </section>
  </template>
</template>

<style scoped>
.recruitment {
  display: flex;
  flex-direction: column;
  gap: 32px;
  //padding: 64px 0;
}

.recruitment__head {
  text-align: center;
  background: #fff;
  padding: 48px;
  border-radius: 24px;
}

.title {
  margin-bottom: 16px;
  margin-top: 0;
}

.subtitle {
  margin: 16px 0;
}

.text {
  font-size: 24px;
  margin: 16px auto;
  width: 70%;
}

.recruitment__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  gap: 16px;
  position: relative;
  min-height: 200px;
}

.card__text {
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 32px;
}

.card__text h4 {
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 12px;
  margin-top: 0;
}

.card__link {
  font-size: 16px;
  font-weight: 600;
  color: #6d00c4;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 14px;
}

.card__img {
  width: 50%;
  height: 100%;
  background-size: contain;
  background-position: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-position-x: right;
  background-repeat: no-repeat;
}
</style>