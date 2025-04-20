<template>
  <section class="steps-section container">
    <StepRow
        v-for="(step, index) in steps"
        :key="index"
        :number="index+1"
        :title="step.title"
        :description="step.description"
    />
  </section>
</template>

<script setup>

defineProps({
  steps: Object,
})

import StepRow from '~/components/cards/StepRow.vue'

</script>

<style scoped>


.steps-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 64px;
}
</style>
