<!-- ValueCard.vue -->
<template>
  <div class="value-card">
    <div class="value-card__top">
      <div class="value-card__number p24">
        {{ number }} <span class="dot">▪</span>
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
  /*box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03);*/
  height: 240px;
}

.value-card__number {
  font-weight: 700;
  color: #5c1ce0;
}

.dot {
  font-size: clamp(14px, 1vw, 16px);
  vertical-align: middle;
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
</style>
