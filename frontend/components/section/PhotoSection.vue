<template>
  <section class="vacancies-section container">
    <h2 class="vacancies-title headline">Фото</h2>
    <div class="photo-gallery">
      <img src="/photos/photo0.jpg" alt="Фото 1" class="photo-item" />
      <img src="/photos/photo1.jpg" alt="Фото 1" class="photo-item" />
      <img src="/photos/photo2.jpg" alt="Фото 2" class="photo-item" />
      <img src="/photos/photo3.jpg" alt="Фото 3" class="photo-item" />
    </div>
  </section>
</template>

<script setup>
// Можно подключать фото через props, если потребуется динамика
</script>

<style scoped>
.vacancies-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 100px;
}

.photo-gallery {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.photo-item {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  flex: 1 1 300px;
}
</style>
