<template>
  <section class="container">
    <div class="partners__container">
      <!-- Левая панель -->
      <div class="partners__cta">
        <NuxtLink
            :to="{ path: '/', query: { tab: 0 }, hash: '#form' }"
            class="cta-link"
        >

          Оставить заявку <span>&rarr;</span>
        </NuxtLink>
        <div class="stat">
          <strong>90%</strong>
          <p>Заказчиков становятся нашими<br />постоянными партнерами</p>
        </div>
      </div>

      <!-- Сетка логотипов -->
      <div class="partners__grid">
        <div v-for="(logo, index) in logos" :key="index" class="logo-box">
          <img :src="logo" alt="Партнер" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  '/partners/lenta.svg',
  '/partners/prosveshchenie.svg',
  '/partners/delovye.svg',
  '/partners/fesco.svg',
  '/partners/auchan.svg',
  '/partners/slavyanka.svg',
  '/partners/chersh.svg',
  '/partners/globus.svg',
  '/partners/iztt.svg',
  '/partners/profresh.svg',
  '/partners/agroprom.svg',
  '/partners/dmitrov.svg',
  '/partners/selgros.svg',
  '/partners/svetlana-k.svg',
  '/partners/delovye.svg',
  '/partners/fesco.svg'
]



const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
const activeTab = ref(1) // по умолчанию

const route = useRoute()

onMounted(() => {
  const tabFromQuery = Number(route.hash?.split('?tab=')[1])
  if (!isNaN(tabFromQuery)) {
    activeTab.value = tabFromQuery
  }
})

</script>

<style scoped>
.partners {
  background: #eef7ff;
  padding: 60px 20px;
  border-radius: 32px;
}

.partners__container {
  /* max-width: 1360px;*/
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 32px;
  align-items: start;
}

.partners__cta {
  background: linear-gradient(180deg, #4f75ff 0%, #6c00e6 100%);
  color: white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.cta-link {
  font-weight: 600;
  font-size: 32px;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.stat strong {
  font-size: 80px;
  font-weight: 800;
  display: block;
  margin-top: auto;
}

.stat p {
  font-size: 24px;
  color: white;
  font-weight: 400;
  line-height: 150%;
  margin-bottom: 0px;
}

.partners__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.logo-box {
  display: flex;
  /*width: 276px;*/
  height: 140px;
  padding: 32px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--white, #FFF);
  box-sizing: border-box;
}

.logo-box img {
  max-height: 60px;
  max-width: 100%;
  object-fit: contain;
  margin: auto;
}

@media (max-width: 1024px) {
  .partners__container {
    grid-template-columns: 1fr;
  }
  .partners__cta {
    margin-bottom: 32px;
  }
}
</style>
