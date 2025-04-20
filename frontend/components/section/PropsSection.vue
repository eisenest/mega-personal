<script setup lang="ts">

import PropsCard from "~/components/cards/PropsCard.vue";

const propsData = [
  { number: "200", description: "Проектов обслуживания" },
  { number: "39", description: "Городов присутствия" },
  { number: "10", description: "Лет на рынке услуг" },
  { number: "9", description: "Направлений деятельности" },
  { number: "150", description: "Сотрудников в собственных офисах" },
  { number: "5000", description: "Действующих сотрудников нашли работу" }
];
</script>

<template>
  <div class="container card-block">

    <PropsCard v-for="(item, index) in propsData"
               :key="index"
               :number="item.number"
               :description="item.description"
    />

<!--    <div v-for="(item, index) in propsData"-->
<!--         :key="index"-->
<!--          class="card">-->
<!--      <p class="number">+{{ item.number }}</p>-->
<!--      <h6 class="desc">{{ item.description }}</h6>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

.container.card-block {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}


</style>