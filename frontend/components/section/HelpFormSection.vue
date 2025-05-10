<template>
  <section class="container white form" id="form">
    <div class="form__container">
      <!-- Левая часть -->
      <div class="form__info">
        <div class="form__info-top">
          <h3>
            Возможность работы <span class="highlight">для Вас!</span>
          </h3>
          <div class="tabs">
            <button
                v-for="(tab, i) in tabs"
                :key="i"
                :class="{ active: activeTab === i }"
                @click="activeTab = i"
            >
              {{ tab }}
            </button>
          </div>

        </div>
        <div class="form__info-bottom">
          <p>Заполните форму, и наш специалист свяжется с вами.</p>
        </div>
      </div>

      <!-- Правая часть -->
      <form class="form__box">
        <input type="text" placeholder="Имя и фамилия" required />
        <div class="form__row">
          <input type="text" placeholder="Телефон" required />
          <input type="text" placeholder="Город" required />
        </div>
        <label class="checkbox">
          <input type="checkbox" required />
          <span>Вы даете согласие на <a class="form__box-link" href="/docs/applicant_agreement.pdf" target="_blank">обработку персональных данных</a></span>
        </label>
        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const tabs = ['Работа', 'Подработка', 'Вахта']
const activeTab = ref(0) // по умолчанию
const route = useRoute()

// Функция для установки таба
const setTabFromRoute = () => {
  const tab = Number(route.query.tab)
  if (!isNaN(tab)) {
    activeTab.value = tab
  }
}

// Следим за изменениями маршрута
watch(
    () => route.query.tab,
    () => {
      setTabFromRoute()
    },
    { immediate: true }
)


</script>

<style scoped>

#form{
  scroll-margin-top: 150px;
}

.form__container {
  height: 483px;
}

</style>
