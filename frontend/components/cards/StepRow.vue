<template>
  <div class="step-row">
    <div class="step-number">
      <span class="dot"><img src="/icon/dot.svg" alt=""></span>{{ number }}
    </div>
    <h4>{{ title }}</h4>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  number: Number,
  title: String,
  description: String
})
</script>

<style scoped>
.step-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid #C6C6C6;
  padding-bottom: 24px;
}

.step-number {
  font-weight: 700;
  font-size: 32px;
  color: #6d00c4;
  display: flex;
  align-items: center;
  display: flex;
  gap: 5px;
}

.step-row h4{
  margin: 0;
}

.dot {
  height: 7px;
  gap: 14px;
}

.service .step-row{
  grid-template-columns: 1fr 2fr 3fr;
}


@media (max-width: 480px) {
  .service .step-row {
    grid-template-columns: repeat(1, 1fr);
  }

  .step-row p{
    margin: 0px;
  }
}


@media (max-width: 768px) {
  .step-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .step-number {
    font-size: 16px;
  }

  .step-content h4 {
    font-size: 18px;
  }

  .step-content p {
    font-size: 15px;
  }
}
</style>
