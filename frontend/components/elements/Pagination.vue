<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<template>
  <div class="pagination">
    <span class="arrow" @click="emit('prev')">
      <svg width="56" height="16" viewBox="0 0 56 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56 8H2M2 8L10 1M2 8L10 15" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>

    <span class="page">0{{ current + 1 }} / 0{{ total }}</span>

    <span class="arrow" @click="emit('next')">
      <svg width="56" height="16" viewBox="0 0 56 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H54M54 8L46 1M54 8L46 15" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 600;
  user-select: none;
}

.arrow {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow svg {
  width: 56px;
  height: 16px;
}

@media (max-width: 480px){
  .pagination{
    justify-content: space-between;
  }
}

</style>
