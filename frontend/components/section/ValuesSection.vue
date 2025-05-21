<template>
  <section class="container">
    <div class="values__container">
      <div
          class="value-card"
          v-for="(item, index) in cards"
          :key="index"
          :style="{ backgroundImage: `url(${item.bg})` }"
      >
        <div class="card-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: 'Оперативности',
    text: 'Находим нужных специалистов в самые сжатые сроки.',
    bg: '/values/bg1.png'
  },
  {
    title: 'Индивидуальности',
    text: 'Учитываем специфику вашего бизнеса и потребности каждой вакансии.',
    bg: '/values/bg2.png'
  },
  {
    title: 'Высокому качеству',
    text: 'Тщательно подбираем кадры, соответствующие вашим ожиданиям.',
    bg: '/values/bg3.png'
  },
  {
    title: 'Надежности',
    text: 'Работаем строго в рамках закона, гарантируя безопасность.',
    bg: '/values/bg4.png'
  }
]
</script>

<style scoped>


.values__container {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.value-card {
  max-width: 426px;
  height: 371px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: end;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;

}

.value-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(231deg, #0C90F2 9.17%, #571BD8 92.72%);
  opacity: 0.4;
  z-index: 0;
}

.value-card:hover {
  transform: translateY(-4px);
}

.card-content {
  position: relative;
  z-index: 1;
}


.card-content h4, .card-content p {
  color: white !important;
  margin: 0;
}

.card-content h4{
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .value-card{
    height: 200px;
  }
}
</style>
