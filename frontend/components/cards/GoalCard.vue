<script setup lang="ts">
defineProps({
  number: Number,
  description: String
})
</script>

<template>
  <div class="outsource-card">
    <h5>{{number}}</h5>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>

.outsource-card {
  display: flex;
  height: 200px;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--light-grey, #EDF7FF);
}

.outsource-card h5{
  position: relative;
  margin-top: 0;
  margin-bottom: 35px;
  color: var(--violet, #6700D1);
}

.outsource-card p{
  margin: 0;
}

.outsource-card h5::before{
  content: "";
  position: absolute;
  top: 50%;
  left: 170%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  aspect-ratio: 1/1;
  background: var(--violet, #6700D1);
}


</style>