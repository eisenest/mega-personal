<template>
  <section class="services-section container">
    <h3 class="services-title">
      <span class="highlight">Наши услуги</span> охватывают широкий <br> спектр направлений!
    </h3>
    <div class="services-grid">
      <div
          v-for="(service, index) in services"
          :key="index"
          class="service-card"
      >
        <img src="/icon/check.png" alt="check icon" class="service-icon" />
        <p class="service-text p24">{{ service }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps({
  services: Array,
})
</script>

<style scoped>
.services-section {
  background-color: #edf7ff;
  border-radius: 24px;
}

.services-title {
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 64px;
  line-height: 1.3;
  margin-top: 200px;
}

.highlight {
  color: #0c90f2;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: white;
  padding: 20px;
  border-radius: 16px;
}

.service-icon {
  width: 56px;
  height: 56px;
}

.service-text {
  font-weight: 600;
  color: #2c3e50;
  font-size: 18px;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .services-title {
    font-size: 24px;
    margin: 90px 0 24px;
  }
  .services-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>