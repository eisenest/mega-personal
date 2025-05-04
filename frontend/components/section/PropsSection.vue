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


</style>