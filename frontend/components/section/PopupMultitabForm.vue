<template>
  <div>
    <!-- Кнопка вызова -->
<!--    <button @click="showModal = true">Открыть форму</button>-->

    <!-- Модалка -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <button class="modal-close" @click="showModal = false">
          <img src="/icon/close.svg" alt="Закрыть" />
        </button>

        <h2 class="modal-title" v-html="`${currentTitle.title}<br>${currentTitle.subtitle}`"></h2>

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
              <DropdownSelect v-model="entityType" placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
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
            <div class="form-row" v-if="entityType === 'Самозанятый'">
              <input placeholder="Адрес регистрации" />
              <input placeholder="ИНН банка" />
            </div>
            <div class="form-row" v-else-if="entityType === 'ИП'">
              <input placeholder="ИНН банка" />
              <input placeholder="КПП" />
            </div>
            <div class="form-row" v-if="entityType === 'ИП'">
              <input placeholder="ОРГН" />
              <input placeholder="Адрес регистрации" />
            </div>
            <input placeholder="ИНН физ. лица" />

<!--            <div class="upload-links">
              <p v-if="entityType === 'Самозанятый'" >📎 Справка самозанятого о постановке на учет</p>
              <p v-else-if="entityType === 'ИП'">📎 Лист записи о регистрации ИП</p>
              <p>📎 Скан паспорта (1 страница)</p>
              <p>📎 Скан паспорта (Регистрация)</p>
            </div>-->


            <div class="upload-links">
              <!-- Самозанятый -->
              <p
                  v-if="entityType === 'Самозанятый'"
                  @click="triggerUpload('doc1')"
              >
                <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
                Справка самозанятого о постановке на учет
                <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
              </p>
              <input
                  ref="doc1"
                  type="file"
                  @change="handleFileUpload($event, 'doc1')"
                  style="display: none"
              />

              <!-- ИП -->
              <p
                  v-if="entityType === 'ИП'"
                  @click="triggerUpload('doc1')"
              >
                <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
                Лист записи о регистрации ИП
                <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
              </p>
              <input
                  ref="doc1"
                  type="file"
                  @change="handleFileUpload($event, 'doc1')"
                  style="display: none"
              />

              <!-- Общие -->
              <p @click="triggerUpload('doc2')">
                <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
                Скан паспорта (1 страница)
                <span v-if="uploadedFiles.doc2"> — {{ uploadedFiles.doc2.name }}</span>
              </p>
              <input
                  ref="doc2"
                  type="file"
                  @change="handleFileUpload($event, 'doc2')"
                  style="display: none"
              />

              <p @click="triggerUpload('doc3')">
                <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
                Скан паспорта (Регистрация)
                <span v-if="uploadedFiles.doc3"> — {{ uploadedFiles.doc3.name }}</span>
              </p>
              <input
                  ref="doc3"
                  type="file"
                  @change="handleFileUpload($event, 'doc3')"
                  style="display: none"
              />
            </div>

          </template>

          <label class="checkbox">
            <input type="checkbox" />
            <span>Вы даете согласие на <a href="/docs/applicant_agreement.pdf" target="_blank">обработку персональных данных</a></span>
          </label>

          <button type="submit" class="submit">Оставить заявку</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import DropdownSelect from "~/components/elements/DropdownSelect.vue";

// Управляемые состояния
const showModal = ref(false)
const activeTab = ref(0)

// Управляем компонентом извне
defineExpose({
  open(tab = 0) {
    activeTab.value = tab
    showModal.value = true
  },
  close() {
    showModal.value = false
  }
})

const entityType = ref('ИП')

const closeModal = () => {
  showModal.value = false
}

const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']

const tabTitles = [
  {
    title: 'Свяжитесь с нами!',
    subtitle: 'Мы поможем вам найти сотрудников'
  },
  {
    title: 'Свяжитесь с нами!',
    subtitle: 'Мы поможем вам найти работу!'
  },
  {
    title: 'Получайте неограниченный доход',
    subtitle: 'за трудоустроенных кандидатов!'
  }
]

const currentTitle = computed(() => tabTitles[activeTab.value])


const doc1 = ref(null)
const doc2 = ref(null)
const doc3 = ref(null)

const uploadedFiles = reactive({
  doc1: null,
  doc2: null,
  doc3: null,
})

const triggerUpload = (name) => {
  if (name === 'doc1') doc1.value?.click()
  if (name === 'doc2') doc2.value?.click()
  if (name === 'doc3') doc3.value?.click()
}

const handleFileUpload = (event, name) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFiles[name] = file
    console.log(`Загружен файл ${file.name} (${name})`)
  }
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);

  /* заменяем вот это: */
/*   align-items: center;
   justify-content: center;*/

  display: block;
  overflow-y: auto;
  z-index: 999;
  padding: 40px 16px;
}
.modal {
  margin: 40px auto;
  background: white;
  border-radius: 20px;
  max-width: 768px;
  width: 100%;
  padding: 32px;
  position: relative;
/*  max-height: 90vh;
  overflow-y: auto;*/
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
  font-size: clamp(15px, 1vw, 18px);
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
  font-family: 'Inter';
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
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 12px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.modal-close img {
  width: 24px;
  height: 24px;
  display: block;
}

.upload-links p{
  color: var(--main-blue, #00A2F6);
  align-items: center;
  display: flex;
  gap: 8px;
}

</style>
