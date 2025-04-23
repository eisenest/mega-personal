<template>
  <div>
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
    <PopupMultitabForm ref="popupFormRef" />
  </div>
</template>

<script setup>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  import PopupMultitabForm from "~/components/section/PopupMultitabForm.vue";

  import { ref, provide } from 'vue'

  const popupFormRef = ref()

  // Делаем provide, чтобы потом вызывать форму из любого дочернего компонента
  provide('openPopupForm', (tab = 0) => {
    popupFormRef.value?.open(tab)
  })

</script>