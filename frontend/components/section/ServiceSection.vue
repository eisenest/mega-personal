<template>
  <section class="container services">
    <div class="services__title-content headline">
      <h2>Услуги</h2>
      <div class="services__description">
        <p>
          Наша компания предоставляет полный список услуг для поиска лучших кандидатов на рынке труда под ваши персональные запросы!
        </p>
      </div>
    </div>

    <div class="services__content">
      <!-- Левый список категорий -->
      <ul class="services__menu">
        <li
            v-for="(category, index) in categories"
            :key="category.slug"
            :class="{ active: selectedIndex === index }"
            class="p24"
            @click="selectedIndex = index"
        >
          {{ category.title }}
          <span class="arrow">›</span>
        </li>
      </ul>

      <!-- Правый блок: список услуг внутри выбранной категории -->
      <div class="services__right">
        <div
            v-for="service in categories[selectedIndex]?.services || []"
            :key="service.slug"
            class="services__card"
        >
          <p class="card__text p24">{{ service.title }}</p>
          <a :href="`/services/${service.slug}`" class="card__link p24">
            Подробнее
            <span class="icon">❯</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
  }
})

const selectedIndex = ref(0)
</script>

<style scoped>
.services {

}

.services__title-content {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
  padding: 0;
}

.services__title-content h2{
  margin: 0;
  flex: 1 1 200px;
  display: flex;
}

.services__description{
  flex: 2 1 500px;
  display: flex;
}

.services__description p{
  width: 70%;
  color: var(--dark-grey, #2C3E50);

  /* Desktop/H6 */
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
  margin: 0;
}



.services__title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 32px;
  color: #2c3e50;
}

.services__content {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
}

.services__menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.services__menu li {
  background: transparent;
  padding: 24px 32px;
  border-radius: 16px;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
  font-size: 24px;
}

.services__menu li.active {
  background: #fff;
  box-shadow: 0 0 0 2px #e8f0fc;
}

.arrow {
  font-size: 18px;
  color: #aaa;
}

.services__right {
  flex: 2 1 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.services__card {
  background: #fff;
  border-radius: 16px;
  height: 200px;
  padding: 24px;
  max-width: 575px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__text {
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 24px;
}

.card__link {
  font-weight: 600;
  font-size: 18px;
  color: #6d00c4;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  /* margin: auto; */;
  justify-content: flex-end;

}

.icon {
  width: 21px;
  height: 21px;
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-radius: 71px;
  background: var(--violet, #6700D1);
  color: white;
  padding: 8px;
  font-weight: 100;
}



</style>
