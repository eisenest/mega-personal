<template>
  <section class="container">
    <div class="partners__container">
      <!-- Левая панель -->
      <div class="partners__cta">
        <NuxtLink
            :to="{ path: '/', query: { tab: 0 }, hash: '#form' }"
            class="cta-link"
        >

          Оставить заявку <span>
          <img src="/icon/arrow-right-white.svg" alt="">
        </span>
        </NuxtLink>
        <div class="stat">
          <strong>90%</strong>
          <p>Заказчиков становятся нашими<br />постоянными партнерами</p>
        </div>
      </div>

      <!-- Сетка логотипов -->
      <div class="partners__grid">
        <a :href="client.url" target="_blank" v-for="(client, index) in clients" :key="index" class="logo-box">
            <img :src="`${config.public.publicHost}/uploads/${client.image}`" alt="Партнер" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>

defineProps({
  clients: Array,
})

const config = useRuntimeConfig()

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

.logo-box:hover{
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
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

@media (max-width: 480px) {
  .partners__grid{
    grid-template-columns: repeat(2, 1fr);
  }
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
