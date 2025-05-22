<script setup lang="ts">
  defineProps({
    number: String,
    description: String
  })
</script>

<template>
  <div class="card">
    <h1 class="number">+{{ number }}</h1>
    <h6 class="desc">{{ description }}</h6>
  </div>
</template>

<style scoped>

.card{
  display: flex;
  max-height: 200px;
  padding: 24px;
  //flex-wrap: wrap;
  gap: 20px;              /* отступ между карточками */
  flex: 0 0 calc(30% - 20px);  /* 3 штуки в ряд с отступами */
  justify-content: center;
  border-radius: 24px;
  background: var(--white, #FFF);
  flex-direction: column;
}

.card:hover{
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
}

.number{
  color: var(--main-blue, #00A2F6);
  //font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 96px */
  letter-spacing: -1.2px;
  margin: 0;
}

.desc{
  color: var(--dark-grey, #2C3E50);
  margin: 0;
}

@media screen and (max-width: 480px) {
  .card{
    padding: 16px;
  }

}

</style>