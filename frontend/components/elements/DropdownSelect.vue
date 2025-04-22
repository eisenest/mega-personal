<template>
  <div class="dropdown">
    <div class="dropdown-selected" @click="toggleDropdown">
      {{ modelValue || placeholder }}
      <span class="arrow">&#9662;</span>
    </div>

    <ul v-if="isOpen" class="dropdown-options">
      <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Выберите...',
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
}

.dropdown-selected {
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-radius: 24px;
}

.dropdown-options {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 24px;
  margin-top: 4px;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  padding: 0;
}

.dropdown-options li {
  padding: 24px;
  cursor: pointer;
}

.dropdown-options li:hover {
  background-color: #f0f0f0;
}

.arrow {
  margin-left: 8px;
}
</style>
