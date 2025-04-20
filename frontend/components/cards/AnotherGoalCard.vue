<template>
  <div class="goal-card">
    <h5>{{ title }}</h5>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
})
</script>

<style scoped>
.goal-card {
  min-height: 208px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}

.goal-card:first-of-type h5{
  color: var(--main-blue, #00A2F6);
}

.goal-card h5 {
  margin: 0;
}

.goal-card p {
  margin: 0;
}
</style>
