<script setup>
const route = useRoute()
const apiBase = useRuntimeConfig().public.apiBase
const config = useRuntimeConfig()

const { data: category, error } = await useFetch(`${apiBase}/api/service-categories/${route.params.slug}`)

if (error.value || !category.value) {
  showError({ statusCode: 404, message: 'Категория не найдена' })
}

useHead(() => ({
  title: category.value.metaTitle
      ? `${category.value.metaTitle} — Mega Personal`
      : 'Загрузка...',
  meta: [
    { name: 'description', content: category.value.metaDescription ? category.value.metaDescription : '' },
  ],
}))

</script>

<template>
  <section class="container recruitment">
    <div class="recruitment__head">
      <h1 class="highlight title">{{ category.title }}</h1>
      <h3 class="subtitle">{{ category.subtitle }}</h3>
      <p class="text">{{ category.description }}</p>
    </div>

    <div class="recruitment__cards">
      <a
          v-for="(service, i) in category.services"
          :href="`/services/${service.slug}`"
          :key="service.slug"
          :class="['card', i % 2 === 0 ? 'card--left' : 'card--right']"
      >
        <div class="card__text">
          <h4>{{ service.title }}</h4>
          <a class="card__link">
            Подробнее
            <span class="icon">
              <img src="/icon/expand-link.svg" alt="">
            </span>
          </a>
        </div>
        <div
            class="card__img"
            :style="{ backgroundImage: `url(${config.public.publicHost}/uploads/${service.previewImage || '/recruitment/1.png'})` }"
        ></div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.recruitment {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 2rem 0;
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
  font-size: clamp(16px, 0.5vw, 24px);
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

.card:hover{
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
}

span.icon {
  display: flex;
}

@media (max-width: 480px) {

  .card__img{
    background-size: cover;
    background-position: left;
  }

  .recruitment__head{
    padding: 24px 16px;

  }

  .text{
    margin: 0;
    width: 100%;
  }

  .recruitment{
    gap: 8px;
  }

  .card__text{
    padding: 16px;
  }

}

</style>
