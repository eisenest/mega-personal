<template>
  <div class="about-hero container white">
    <div class="about-hero__content">
      <h1>
        <span class="highlight">{{ title }}</span>
      </h1>
      <p>{{ description }}</p>
      <NuxtLink
          :to="{query: { tab: 0 }, hash: '#form' }"
      >
        <button
            v-if="showButton"
            class="cta-button"
        >
          Оставить заявку
        </button>
      </NuxtLink>
    </div>

    <div class="about-hero__image-wrapper">
      <img :src="image" alt="Hero image" class="hero-image" />
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

const config = useRuntimeConfig()

const activeTab = ref(1) // по умолчанию

const route = useRoute()

onMounted(() => {
  const tabFromQuery = Number(route.hash?.split('?tab=')[1])
  if (!isNaN(tabFromQuery)) {
    activeTab.value = tabFromQuery
  }
})


</script>

<style scoped>
.about-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  border-radius: 24px;
  background: white;
  overflow: hidden;
  max-height: 460px;
}

.about-hero h1{
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
  width: 66%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: inset 4px 0 0 0 #fff;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
}

@media (min-width: 480px) and (max-width: 1024px) {
  .about-hero__image-wrapper{
    display: none;
  }
  .about-hero{
    max-height: none;
  }
  .about-hero__content{
    max-width: 100%;
    padding: 1rem;
  }

}

@media (max-width: 480px) {
  .about-hero__image-wrapper{
    display: none;
  }

  .cta-button{
    width: 100%;
  }

  .about-hero__content{
    max-width: 100%;
    padding: 1rem;
  }

  .about-hero{
    max-height: none;
  }
}

</style>
