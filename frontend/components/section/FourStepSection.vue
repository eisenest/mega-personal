<template>
  <section class="steps-section container white">
    <h2 class="steps-title"><span class="highlight">{{ title }}</span></h2>
    <div class="steps-grid">
      <div class="step-box" v-for="(step, index) in steps" :key="index">
        <span class="step-number">{{ index + 1 }}
          <span class="dot"><img src="/icon/dot.svg" alt=""></span>
        </span>
        <p class="step-text">{{ step }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Решим вопрос с кадрами в 4 шага'
  },
  steps: Array,
})
</script>

<style scoped>
.steps-section {
  margin-top: 200px;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
}


.steps-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.step-box {
  background: #eaf4ff;
  padding: 24px;
  border-radius: 20px;
  width: clamp(200px, 20vw, 280px);
  text-align: left;
  box-sizing: border-box;
}

.step-number {
  font-weight: 700;
  color: #7400e0;
  font-size: 18px;
}

.step-text {
  font-weight: 700;
  color: #2c3e50;
  margin-top: 12px;
  line-height: 1.4;
}

@media (min-width: 480px) and (max-width: 1024px) {
  .steps-section{
    margin-top: 80px;
  }
}

@media screen and (max-width: 480px) {
  .steps-section{
    padding: 16px;
  }

  .step-box{
    width: 100%;
  }
}

</style>