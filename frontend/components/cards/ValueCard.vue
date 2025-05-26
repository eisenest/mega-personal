<!-- ValueCard.vue -->
<template>
  <div class="value-card">
    <div class="value-card__top">
      <div class="value-card__number p24">
        {{ number }} <span class="dot"><img src="/icon/dot.svg" alt=""></span>
      </div>
      <p class="value-card__title p24" v-if="showTitle">{{ title }}</p>
    </div>
    <div class="value-card__bottom">
      <p class="value-card__text">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  number: Number,
  title: String,
  description: String,
  showTitle: Boolean
})
</script>

<style scoped>
.value-card {
  background: white;
  justify-content: space-between;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 240px;
}

.value-card.shifted {
  grid-column: 2; /* Пропускаем первую колонку */
}

.value-card:hover{
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
}

.value-card__number {
  font-weight: 700;
  color: #5c1ce0;
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.value-card__title {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0;
  color: #2c3e50;
}

.value-card__text {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.5;
}

@media screen and  (max-width: 480px) {
  .value-card.shifted{
    grid-column: 1;
  }
  .value-card{
    padding: 16px;
  }

  .value-card__title{
    margin-top: 8px 0 16px;
  }

}

</style>
