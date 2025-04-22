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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}

.goal-card:hover{
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
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
