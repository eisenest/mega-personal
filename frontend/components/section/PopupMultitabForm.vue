<template>
  <div>
    <!-- Кнопка вызова -->
    <button @click="showModal = true">Открыть форму</button>

    <!-- Модалка -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <button class="modal-close" @click="showModal = false">&times;</button>

        <h2 class="modal-title">Свяжитесь с нами!<br>Мы поможем вам найти работу!</h2>

        <div class="tabs">
          <button
              v-for="(tab, i) in tabs"
              :key="i"
              :class="{ active: activeTab === i }"
              @click="activeTab = i"
          >{{ tab }}</button>
        </div>

        <form class="form-content">
          <template v-if="activeTab === 0">
            <!-- Работодателям -->
            <div class="form-row">
              <input placeholder="Телефон" />
              <input placeholder="email" />
            </div>
            <div class="form-row">
              <input placeholder="Организация" />
              <input placeholder="Город проекта" />
            </div>
            <textarea placeholder="Комментарий"></textarea>
          </template>

          <template v-else-if="activeTab === 1">
            <!-- Соискателям -->
            <input placeholder="Имя и фамилия" />
            <div class="form-row">
              <input placeholder="Телефон" />
              <input placeholder="Город" />
            </div>
          </template>

          <template v-else>
            <!-- Фрилансерам -->
            <input placeholder="Имя, Фамилия, Отчество" />
            <div class="form-row">
              <input placeholder="Почта" />
              <input type="date" placeholder="Дата Рождения" />
            </div>
            <div class="form-row">
              <input placeholder="Телефон" />
              <DropdownSelect placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
            </div>
            <div class="form-row">
              <input placeholder="Серия паспорта" />
              <input placeholder="Номер паспорта" />
            </div>
            <div class="form-row">
              <input placeholder="Наименование банка" />
              <input placeholder="БИК банка" />
            </div>
            <div class="form-row">
              <input placeholder="Корреспондентский счет" />
              <input placeholder="Расчетный счет" />
            </div>
            <div class="form-row">
              <input placeholder="Адрес регистрации" />
              <input placeholder="ИНН банка" />
            </div>

            <div class="upload-links">
              <p>📎 Справка самозанятого о постановке на учет</p>
              <p>📎 Скан паспорта (1 страница)</p>
              <p>📎 Скан паспорта (Регистрация)</p>
            </div>
          </template>

          <label class="checkbox">
            <input type="checkbox" />
            <span>Вы даете согласие на обработку персональных данных</span>
          </label>

          <button type="submit" class="submit">Оставить заявку</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DropdownSelect from "~/components/elements/DropdownSelect.vue";

const showModal = ref(false)
const activeTab = ref(0)

const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск']
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal {
  background: white;
  border-radius: 20px;
  max-width: 768px;
  width: 100%;
  padding: 32px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal span{
  color: var(--dark-grey, #2C3E50);
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.tabs button {
  padding: 10px 20px;
  border-radius: 24px;
  border: none;
  background: #f1f1f1;
  font-weight: 600;
}
.tabs .active {
  background: #00aaff;
  color: white;
}
.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-row {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
}
input, textarea, select {
  width: 100%;
  background: #f0f7ff;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.submit {
  padding: 18px;
  font-size: 16px;
  background: #6800d4;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 12px;
}
</style>
