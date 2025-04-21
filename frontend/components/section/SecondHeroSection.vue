<template>
  <div class="about-hero container white">
    <div class="about-hero__content">
      <h1>
        <span class="highlight">{{ title }}</span>
      </h1>
      <p>{{ description }}</p>
      <button
          v-if="showButton"
          class="cta-button"
      >
        Оставить заявку
      </button>
    </div>

    <div class="about-hero__image-wrapper">
      <div
          class="image-mask"
          :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  showButton: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.about-hero {
  margin: 0 0 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  border-radius: 24px;
  background: white;
  overflow: hidden;
  height: 640px;
}

.about-hero h1 {
  margin: 0;
}

.about-hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 50%;
  padding: 2rem;
}

.highlight {
  color: #1c9eff;
}

.cta-button {
  background: #6d00c4;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: fit-content;
  padding: 18px 32px;
  border-radius: 45px;
  font-size: 18px;
}

.about-hero__image-wrapper {
  position: relative;
  flex: 1;
  aspect-ratio: 1 / 1;
  left: 200px;
  height: 200%;
  width: 66%;
}

.image-mask {
  width: 100%;
  height: 100%;
  /*background-size: contain;*/
  box-shadow: inset 4px 0 0 0 #fff;
  background-position: left;
  opacity: 1;
  overflow: hidden;
  position: relative;
}
</style>
