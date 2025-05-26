<script setup lang="ts">


import PropsCard from "~/components/cards/PropsCard.vue";

defineProps({
  props: Object
})

</script>

<template>
  <div class="container card-block">

    <PropsCard v-for="(item, index) in props"
               :key="index"
               :number="item.number"
               :description="item.description"
    />
  </div>
</template>

<style scoped>

.container.card-block {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}


@media (max-width: 370px) {
  .container.card-block[data-v-6f22fcec] {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 768px) {
  .container.card-block {
    grid-template-columns: repeat(2, 1fr);
  }
}


</style>