<template>
  <section class="container white form" id="form">
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
        <template v-if="activeTab === 0">
          <div class="form__row">
            <input placeholder="Телефон" />
            <input placeholder="email" />
          </div>
          <div class="form__row">
            <input placeholder="Организация" />
            <input placeholder="Город проекта" />
          </div>
          <textarea placeholder="Комментарий"></textarea>
        </template>

        <template v-else-if="activeTab === 1">
          <input placeholder="Имя и фамилия" />
          <div class="form__row">
            <input placeholder="Телефон" />
            <input placeholder="Город" />
          </div>
        </template>

        <template v-else>
          <input placeholder="Имя, Фамилия, Отчество" />
          <div class="form__row">
            <input placeholder="Почта" />
            <input type="date" placeholder="Дата Рождения" />
          </div>
          <div class="form__row">
            <input placeholder="Телефон" />
            <DropdownSelect v-model="entityType" placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
          </div>
          <div class="form__row">
            <input placeholder="Серия паспорта" />
            <input placeholder="Номер паспорта" />
          </div>
          <div class="form__row">
            <input placeholder="Наименование банка" />
            <input placeholder="БИК банка" />
          </div>
          <div class="form__row">
            <input placeholder="Корреспондентский счет" />
            <input placeholder="Расчетный счет" />
          </div>
          <div class="form__row" v-if="entityType === 'Самозанятый'">
            <input placeholder="Адрес регистрации" />
            <input placeholder="ИНН банка" />
          </div>
          <div class="form__row" v-else-if="entityType === 'ИП'">
            <input placeholder="ИНН" />
            <input placeholder="КПП" />
          </div>
          <div class="form__row" v-if="entityType === 'ИП'">
            <input placeholder="ОРГН" />
            <input placeholder="Адрес регистрации" />
          </div>

          <div class="upload-links">
            <p v-if="entityType === 'Самозанятый'" >📎 Справка самозанятого о постановке на учет</p>
            <p v-else-if="entityType === 'ИП'">📎 Лист записи о регистрации ИП</p>
            <p>📎 Скан паспорта (1 страница)</p>
            <p>📎 Скан паспорта (Регистрация)</p>
          </div>
        </template>

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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DropdownSelect from "~/components/elements/DropdownSelect.vue";

const entityType = ref('')
const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
const activeTab = ref(1) // по умолчанию
const route = useRoute()

const setTabFromRoute = () => {
  const tab = Number(route.query.tab)
  if (!isNaN(tab)) {
    activeTab.value = tab
  }
}

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


.upload-links p{
  color: #fff;
}


</style>
