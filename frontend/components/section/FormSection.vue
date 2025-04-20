<template>
  <section class="container white form">
    <div class="form__container">
      <!-- Левая часть -->
      <div class="form__info">
        <div class="form__info-top">
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
          <h3>
            Мы поможем вам <span class="highlight">найти работу!</span>
          </h3>
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
          <select required>
            <option disabled selected>Город</option>
            <option>Москва</option>
            <option>Санкт-Петербург</option>
            <option>Казань</option>
          </select>
        </div>
        <label class="checkbox">
          <input type="checkbox" required />
          <span>Вы даете согласие на обработку персональных данных</span>
        </label>
        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>

<script setup>
const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
const activeTab = ref(1)
</script>

<style scoped>

.form__container {
  height: 483px;
}

</style>
