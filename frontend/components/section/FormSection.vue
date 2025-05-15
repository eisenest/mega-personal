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
          <h3 v-if="!isSubmitted">
            {{ tabHeadlines[internalTab].text }}<span class="highlight">{{ tabHeadlines[internalTab].highlight }}</span>
          </h3>
          <h3 v-else>Спасибо! <span class="highlight"> Заявка отправлена </span></h3>
        </div>
        <div class="form__info-bottom" v-if="!isSubmitted">
          <p>Заполните форму, и наш специалист свяжется с вами.</p>
        </div>
      </div>

      <!-- Правая часть -->
      <form class="form__box" @submit.prevent="submitForm" v-if="!isSubmitted">
        <template v-if="activeTab === 0">
          <div class="form__row">
            <input v-model="form.phone" placeholder="Телефон" />
            <input v-model="form.email" placeholder="email" />
          </div>
          <div class="form__row">
            <input v-model="form.company_name" placeholder="Организация" />
            <input v-model="form.address" placeholder="Город проекта" />
          </div>
          <textarea v-model="form.comment" placeholder="Комментарий"></textarea>
        </template>

        <template v-else-if="activeTab === 1">
          <input v-model="form.first_name" placeholder="Имя и фамилия" />
          <div class="form__row">
            <input v-model="form.phone" placeholder="Телефон" />
            <input v-model="form.city" placeholder="Город" />
          </div>
        </template>

        <template v-else>
          <div class="form__row">
            <input v-model="form.first_name" placeholder="Имя" />
            <input v-model="form.last_name" placeholder="Фамилия" />
          </div>
          <input v-model="form.middle_name" placeholder="Отчество" />
          <div class="form__row">
            <input v-model="form.email" placeholder="Почта" />
            <input v-model="form.date_of_birth" type="date" placeholder="Дата Рождения" />
          </div>
          <div class="form__row">
            <input v-model="form.phone" placeholder="Телефон" />
            <DropdownSelect v-model="entityType" placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
          </div>

          <div class="form__row">
            <input
                :placeholder="'Серия паспорта'"
                v-if="labelToIdMap['Серия паспорта']"
                v-model="form.fields[labelToIdMap['Серия паспорта']]"
            />
            <input
                :placeholder="'Номер паспорта'"
                v-if="labelToIdMap['Номер паспорта']"
                v-model="form.fields[labelToIdMap['Номер паспорта']]"
            />
          </div>
          <div class="form__row">
            <input
                :placeholder="'Наименование банка'"
                v-if="labelToIdMap['Наименование банка']"
                v-model="form.fields[labelToIdMap['Наименование банка']]"
            />
            <input
                :placeholder="'БИК банка'"
                v-if="labelToIdMap['БИК банка']"
                v-model="form.fields[labelToIdMap['БИК банка']]"
            />
          </div>
          <div class="form__row">
            <input
                :placeholder="'Корреспондентский счет'"
                v-if="labelToIdMap['Корреспондентский счет']"
                v-model="form.fields[labelToIdMap['Корреспондентский счет']]"
            />
            <input
                :placeholder="'Расчетный счет'"
                v-if="labelToIdMap['Расчетный счет']"
                v-model="form.fields[labelToIdMap['Расчетный счет']]"
            />
          </div>
          <div class="form__row" v-if="entityType === 'Самозанятый'">
            <input
                :placeholder="'Адрес регистрации'"
                v-if="labelToIdMap['Адрес регистрации']"
                v-model="form.fields[labelToIdMap['Адрес регистрации']]"
            />
            <input
                :placeholder="'ИНН банка'"
                v-if="labelToIdMap['ИНН банка']"
                v-model="form.fields[labelToIdMap['ИНН банка']]"
            />
          </div>
          <div class="form__row" v-else-if="entityType === 'ИП'">
            <input
                :placeholder="'ИНН'"
                v-if="labelToIdMap['ИНН']"
                v-model="form.fields[labelToIdMap['ИНН']]"
            />
            <input
                :placeholder="'КПП'"
                v-if="labelToIdMap['КПП']"
                v-model="form.fields[labelToIdMap['КПП']]"
            />
          </div>
          <div class="form__row" v-if="entityType === 'ИП'">
            <input
                :placeholder="'ОГРН'"
                v-if="labelToIdMap['ОГРН']"
                v-model="form.fields[labelToIdMap['ОГРН']]"
            />
            <input
                :placeholder="'Адрес регистрации'"
                v-if="labelToIdMap['Адрес регистрации']"
                v-model="form.fields[labelToIdMap['Адрес регистрации']]"
            />
          </div>

          <div class="upload-links">
            <p v-if="entityType === 'Самозанятый' && labelToIdMap['Справка самозанятого о постановке на учет']" @click="triggerUpload('doc1')">
              <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
              Справка самозанятого о постановке на учет
              <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
            </p>
            <input ref="doc1" type="file" @change="handleFileUpload($event, 'doc1')" style="display: none" />

            <p v-if="entityType === 'ИП' && labelToIdMap['Лист записи о регистрации ИП']" @click="triggerUpload('doc1')">
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
              Лист записи о регистрации ИП
              <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
            </p>
            <input ref="doc1" type="file" @change="handleFileUpload($event, 'doc1')" style="display: none" />

            <p v-if="labelToIdMap['Скан паспорта (1 страница)']" @click="triggerUpload('doc2')">
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
              Скан паспорта (1 страница)
              <span v-if="uploadedFiles.doc2"> — {{ uploadedFiles.doc2.name }}</span>
            </p>
            <input ref="doc2" type="file" @change="handleFileUpload($event, 'doc2')" style="display: none" />

            <p v-if="labelToIdMap['Скан паспорта (Регистрация)']" @click="triggerUpload('doc3')">
              <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
              Скан паспорта (Регистрация)
              <span v-if="uploadedFiles.doc3"> — {{ uploadedFiles.doc3.name }}</span>
            </p>
            <input ref="doc3" type="file" @change="handleFileUpload($event, 'doc3')" style="display: none" />
          </div>
        </template>

        <label class="checkbox">
          <input type="checkbox" required />
          <span class="form_checkbox">
            Вы даете согласие на
            <a class="form__box-link" href="/docs/applicant_agreement.pdf" target="_blank">обработку персональных данных</a>
          </span>
        </label>

        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>


<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import DropdownSelect from "~/components/elements/DropdownSelect.vue"

const { fixedTab } = defineProps({
  fixedTab: {
    type: Number,
    default: null
  }
})

const entityType = ref('ИП')
const tabs = ['Работодателям', 'Соискателям', 'Фрилансерам-рекрутерам']
const route = useRoute()
const publicHost = useRuntimeConfig().public.publicHost
const activeTab = computed(() => fixedTab !== null ? fixedTab : internalTab.value)
const internalTab = ref(0)
const isSubmitted = ref(false)


const form = reactive({
  phone: '',
  email: '',
  company_name: '',
  address: '',
  comment: '',
  first_name: '',
  city: '',
  date_of_birth: '',
  last_name: '',
  middle_name: '',
  fields: {} // сюда попадут значения из динамических полей
})

const selectedTypeObject = ref(null)
const labelToIdMap = reactive<Record<string, string>>({})
const submitForm = async () => {
  let payload = {}
  let url = ''

  if (activeTab.value === 0) {
    payload = {
      phone: form.phone,
      email: form.email,
      company_name: form.company_name,
      address: form.address,
      comment: form.comment
    }
    url = 'https://api-1.beta.mega-personal.ru/omega/project_request'
  } else if (activeTab.value === 1) {
    payload = {
      first_name: form.first_name,
      phone: form.phone,
      city: form.city,
      date_of_birth: form.date_of_birth
    }
    url = 'https://api-1.beta.mega-personal.ru/omega/person_worker_request'
  } else if (activeTab.value === 2 && selectedTypeObject.value) {
    const fieldData: Record<string, string> = {}
    for (const field of selectedTypeObject.value.form?.fields || []) {
      fieldData[field.id] = form.fields[field.id] || ''
    }
    payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      middle_name: form.middle_name,
      email: form.email,
      date_of_birth: form.date_of_birth,
      phone: form.phone,
      type: selectedTypeObject.value,
      formEntry: {
        data: fieldData
      }
    }
    url = 'https://api-1.beta.mega-personal.ru/omega/registration_request'
  }
  console.log(payload)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    console.log('Форма отправлена', result)
    isSubmitted.value = true
  } catch (e) {
    console.error('Ошибка отправки', e)
    alert('Ошибка при отправке формы.')
  }
}

const setTabFromRoute = () => {
  const tab = Number(route.query.tab)
  if (!isNaN(tab)) {
    internalTab.value = tab
  }
}

watch(
    () => route.query.tab,
    () => {
      if (fixedTab === null) {
        setTabFromRoute()
      }
    },
    { immediate: true }
)

watch([activeTab, entityType], async ([newTab, newEntity]) => {
  if (newTab === 2) {
    try {
      const res = await fetch('https://api-1.beta.mega-personal.ru/omega/registration_request')
      const types = await res.json()
      selectedTypeObject.value = types.find(t => t.name === newEntity)

      if (selectedTypeObject.value?.form?.fields) {
        selectedTypeObject.value.form.fields.forEach(field => {
          form.fields[field.id] = ''
          labelToIdMap[field.label] = field.id
        })
      }
    } catch (e) {
      console.error('Ошибка загрузки типов самозанятости:', e)
    }
  }
}, { immediate: true })

const doc1 = ref(null)
const doc2 = ref(null)
const doc3 = ref(null)

const uploadedFiles = reactive({
  doc1: null,
  doc2: null,
  doc3: null,
})

const triggerUpload = (name: 'doc1' | 'doc2' | 'doc3') => {
  if (name === 'doc1') doc1.value?.click()
  if (name === 'doc2') doc2.value?.click()
  if (name === 'doc3') doc3.value?.click()
}


const handleFileUpload = async (event, name) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('dir', 'crm') // если хочешь группировать папки

  try {
    const res = await fetch(`${publicHost}/api/upload`, {
      method: 'POST',
      body: formData
    })
    const { url } = await res.json()

    console.log(url)

    const labelToFieldMap = {
      doc1: entityType.value === 'ИП'
          ? 'Лист записи о регистрации ИП'
          : 'Справка самозанятого о постановке на учет',
      doc2: 'Скан паспорта (1 страница)',
      doc3: 'Скан паспорта (Регистрация)',
    }

    const label = labelToFieldMap[name]
    const fieldId = labelToIdMap[label]

    if (fieldId) {
      form.fields[fieldId] = url
      uploadedFiles[name] = file
    }

  } catch (err) {
    console.error('Ошибка при загрузке файла', err)
    alert('Ошибка при загрузке файла')
  }
}


const tabHeadlines = [
  {
    text: 'Оставьте заявку — мы поможем вам ',
    highlight: 'найти сотрудников!'
  },
  {
    text: 'Мы поможем вам найти ',
    highlight: 'работу!'
  },
  {
    text: 'Зарегистрируйтесь на нашей партнерской платформе — получайте ',
    highlight: 'неограниченный доход за трудоустроенных кандидатов'
  }
]
</script>

<style scoped>
#form {
  scroll-margin-top: 150px;
}

.upload-links p {
  color: #fff;
  align-items: center;
  display: flex;
  gap: 8px;
}

.form__box-link {
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
}
</style>