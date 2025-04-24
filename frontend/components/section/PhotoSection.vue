<template>
  <section class="photo-section">
    <div class="container">
      <h2 class="vacancies-title headline">Фото</h2>
    </div>
    <div class="photo-gallery-wrapper" >
      <div class="photo-gallery" ref="scrollContainer">
        <div class="photo-track" ref="trackRef">
          <img
              v-for="(img, i) in images"
              :key="'img-' + i"
              :src="img"
              class="photo-item"
              alt="Фото"
          />
          <img
              v-for="(img, i) in images"
              :key="'clone-' + i"
              :src="img"
              class="photo-item"
              alt="Фото копия"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const galleryRef = ref(null)
const trackRef = ref(null)

const images = [
  '/photos/photo0.jpg',
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
]

const scrollContainer = ref<HTMLElement | null>(null)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  const container = scrollContainer.value
  if (!container) return

  interval = setInterval(() => {
    container.scrollLeft += 1
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0
    }
  }, 20)
})

onUnmounted(() => {
  clearInterval(interval)
})

</script>

<style scoped>
.photo-gallery-wrapper {
  width: 100vw;
  margin-left: calc(-1 * (100vw - 100%)/2); /* выравнивание относительно body */
  overflow: hidden;
}

.photo-gallery {
  overflow: hidden;
  white-space: nowrap;
}

.photo-track {
  display: flex;
  gap: 20px;
}

.photo-item {
  flex: 0 0 auto;
  width: 360px;
  height: 280px;
  border-radius: 20px;
  object-fit: cover;
}

</style>
