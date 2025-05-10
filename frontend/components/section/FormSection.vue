<template>
  <section class="container white form" id="form">
    <div class="form__container">
      <!-- Левая часть -->
      <div class="form__info">
        <div class="form__info-top">
          <div class="tabs">
            <template v-if="fixedTab !== null">
              <button class="active" disabled>
                {{ tabs[fixedTab] }}
              </button>
            </template>
            <template v-else>
              <button
                  v-for="(tab, i) in tabs"
                  :key="i"
                  :class="{ active: internalTab === i }"
                  @click="internalTab = i"
              >
                {{ tab }}
              </button>
            </template>
          </div>
          <h3>
            {{ tabHeadlines[internalTab].text }}<span class="highlight">{{ tabHeadlines[internalTab].highlight }}</span>
          </h3>
        </div>
        <div class="form__info-bottom">
          <p>Заполните форму, и наш специалист свяжется с вами.</p>
        </div>
      </div>

      <!-- Правая часть -->
      <form class="form__box">
        <template v-if="internalTab === 0">
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

        <template v-else-if="internalTab === 1">
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
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
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
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
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
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
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
          <input type="checkbox" required />
          <span>Вы даете согласие на <a class="form__box-link" href="/docs/applicant_agreement.pdf" target="_blank">обработку персональных данных</a></span>
        </label>

        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import {reactive, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import DropdownSelect from "~/components/elements/DropdownSelect.vue";
import { computed } from 'vue'

const { fixedTab } = defineProps({
  fixedTab: {
    type: Number,
    default: null
  }
})

const entityType = ref('ИП')
const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
// const activeTab = ref(0) // по умолчанию
const route = useRoute()

const activeTab = computed(() => fixedTab !== null ? fixedTab : internalTab)
const internalTab = ref(0)

const setTabFromRoute = () => {
  const tab = Number(route.query.tab)
  if (!isNaN(tab)) {
    internalTab.value = tab
  }
}

// Следим за табом в query только если fixedTab не передан
watch(
    () => route.query.tab,
    () => {
      if (fixedTab === null) {
        setTabFromRoute()
      }
    },
    { immediate: true }
)

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


const tabHeadlines = [
  {
    text: 'Мы поможем вам найти ',
    highlight: 'работу!'
  },
  {
    text: 'Оставьте заявку — мы поможем вам ',
    highlight: 'найти сотрудников!'
  },
  {
    text: 'Зарегистрируйтесь на нашей партнерской платформе — получайте ',
    highlight: 'неограниченный доход за трудоустроенных кандидатов'
  }
]


</script>

<style scoped>
#form{
  scroll-margin-top: 150px;
}


.upload-links p{
  color: #fff;
  align-items: center;
  display: flex;
  gap: 8px;
}


.form__box-link{
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
}

</style>
