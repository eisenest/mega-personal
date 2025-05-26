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

          <template v-if="!isSubmitted">
            <h3>
              {{ tabHeadlines[activeTab].text }}
              <span class="highlight">{{ tabHeadlines[activeTab].highlight }}</span>
            </h3>
          </template>

          <template v-else>
            <h3>Спасибо за <span class="highlight">оставленную заявку! </span></h3>
          </template>
        </div>

        <div class="form__info-bottom">
          <template v-if="!isSubmitted">
            <p>Заполните форму, и наш специалист свяжется с вами.</p>
          </template>

          <template v-else>
            <p v-if="activeTab === 0">
              Наш менеджер свяжется с вами в ближайшее время, чтобы обсудить ваши потребности и предложить оптимальные решения.
            </p>
            <p v-else-if="activeTab === 1">
              Наш HR-менеджер свяжется с вами в ближайшее время для обсуждения дальнейших шагов.
            </p>
            <p v-else>
              Наш менеджер свяжется с вами в ближайшее время для обсуждения возможных вариантов партнерства.
            </p>
          </template>
        </div>
      </div>


      <!-- Правая часть -->
      <form class="form__box" @submit.prevent="submitForm" v-if="!isSubmitted">
        <template v-if="activeTab === 0">
          <div class="form__row">
            <input
                v-model="form.phone"
                :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'"
                :class="{ 'input--error': errors.phone }"
                v-phone-mask
            />
            <input
                v-model="form.email"
                :placeholder="errors.email ? 'Введите email' : 'email'"
                :class="{ 'input--error': errors.email }"
            />
          </div>
          <div class="form__row">
            <input
                v-model="form.company_name"
                :placeholder="errors.company_name ? 'Введите организацию' : 'Организация'"
                :class="{ 'input--error': errors.company_name }"
            />
            <input
                v-model="form.address"
                :placeholder="errors.address ? 'Введите город проекта' : 'Город проекта'"
                :class="{ 'input--error': errors.address }"
            />
          </div>
          <textarea
              v-model="form.comment"
              :placeholder="errors.comment ? 'Введите комментарий' : 'Комментарий'"
              :class="{ 'input--error': errors.comment }"
          ></textarea>
        </template>

        <template v-else-if="activeTab === 1">
          <input
              v-model="form.first_name"
              :placeholder="errors.first_name ? 'Введите имя и фамилию' : 'Имя и фамилия'"
              :class="{ 'input--error': errors.first_name }"
          />
          <div class="form__row">
            <input
                v-model="form.phone"
                :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'"
                :class="{ 'input--error': errors.phone }"
                v-phone-mask
            />
            <input
                v-model="form.city"
                :placeholder="errors.city ? 'Введите город' : 'Город'"
                :class="{ 'input--error': errors.city }"
            />
          </div>
        </template>

        <template v-else>
          <div class="form__row">
            <input
                v-model="form.first_name"
                :placeholder="errors.first_name ? 'Введите имя' : 'Имя'"
                :class="{ 'input--error': errors.first_name }"
            />
            <input
                v-model="form.last_name"
                :placeholder="errors.last_name ? 'Введите фамилию' : 'Фамилия'"
                :class="{ 'input--error': errors.last_name }"
            />
          </div>
          <input
              v-model="form.middle_name"
              :placeholder="errors.middle_name ? 'Введите отчество' : 'Отчество'"
              :class="{ 'input--error': errors.middle_name }"
          />
          <div class="form__row">
            <input
                v-model="form.email"
                :placeholder="errors.email ? 'Введите почту' : 'Почта'"
                :class="{ 'input--error': errors.email }"
            />
            <input
                v-model="form.date_of_birth"
                :placeholder="errors.date_of_birth ? 'Введите дату рождения' : 'дд.мм.гггг'"
                :class="{ 'input--error': errors.date_of_birth }"
                v-date-mask
            />
          </div>
          <div class="form__row">
            <input
                v-model="form.phone"
                :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'"
                :class="{ 'input--error': errors.phone }"
                v-phone-mask
            />
            <DropdownSelect
                v-model="entityType"
                placeholder="Тип юридического лица"
                :options="['ИП', 'Самозанятый']"
            />
          </div>

          <div class="form__row">
            <input
                v-if="labelToIdMap['Серия паспорта']"
                :placeholder="errors[labelToIdMap['Серия паспорта']] ? 'Введите серию паспорта' : 'Серия паспорта'"
                v-model="form.fields[labelToIdMap['Серия паспорта']]"
                :class="{ 'input--error': errors[labelToIdMap['Серия паспорта']] }"
            />
            <input
                v-if="labelToIdMap['Номер паспорта']"
                :placeholder="errors[labelToIdMap['Номер паспорта']] ? 'Введите номер паспорта' : 'Номер паспорта'"
                v-model="form.fields[labelToIdMap['Номер паспорта']]"
                :class="{ 'input--error': errors[labelToIdMap['Номер паспорта']] }"
            />
          </div>

          <div class="form__row">
            <input
                v-if="labelToIdMap['Наименование банка']"
                :placeholder="errors[labelToIdMap['Наименование банка']] ? 'Введите наименование банка' : 'Наименование банка'"
                v-model="form.fields[labelToIdMap['Наименование банка']]"
                :class="{ 'input--error': errors[labelToIdMap['Наименование банка']] }"
            />
            <input
                v-if="labelToIdMap['БИК банка']"
                :placeholder="errors[labelToIdMap['БИК банка']] ? 'Введите БИК банка' : 'БИК банка'"
                v-model="form.fields[labelToIdMap['БИК банка']]"
                :class="{ 'input--error': errors[labelToIdMap['БИК банка']] }"
            />
          </div>

          <div class="form__row">
            <input
                v-if="labelToIdMap['Корреспондентский счет']"
                :placeholder="errors[labelToIdMap['Корреспондентский счет']] ? 'Введите корреспондентский счёт' : 'Корреспондентский счет'"
                v-model="form.fields[labelToIdMap['Корреспондентский счет']]"
                :class="{ 'input--error': errors[labelToIdMap['Корреспондентский счет']] }"
            />
            <input
                v-if="labelToIdMap['Расчетный счет']"
                :placeholder="errors[labelToIdMap['Расчетный счет']] ? 'Введите расчётный счёт' : 'Расчетный счет'"
                v-model="form.fields[labelToIdMap['Расчетный счет']]"
                :class="{ 'input--error': errors[labelToIdMap['Расчетный счет']] }"
            />
          </div>

          <div class="form__row" v-if="entityType === 'Самозанятый'">
            <input
                v-if="labelToIdMap['ИНН банка']"
                :placeholder="errors[labelToIdMap['ИНН банка']] ? 'Введите ИНН банка' : 'ИНН банка'"
                v-model="form.fields[labelToIdMap['ИНН банка']]"
                :class="{ 'input--error': errors[labelToIdMap['ИНН банка']] }"
            />
            <input
                v-if="labelToIdMap['Адрес регистрации']"
                :placeholder="errors[labelToIdMap['Адрес регистрации']] ? 'Введите адрес регистрации' : 'Адрес регистрации'"
                v-model="form.fields[labelToIdMap['Адрес регистрации']]"
                :class="{ 'input--error': errors[labelToIdMap['Адрес регистрации']] }"
            />
          </div>
          <div class="form__row" v-else-if="entityType === 'ИП'">
            <input
                v-if="labelToIdMap['ИНН']"
                :placeholder="errors[labelToIdMap['ИНН']] ? 'Введите ИНН' : 'ИНН'"
                v-model="form.fields[labelToIdMap['ИНН']]"
                :class="{ 'input--error': errors[labelToIdMap['ИНН']] }"
            />
            <input
                v-if="labelToIdMap['КПП']"
                :placeholder="errors[labelToIdMap['КПП']] ? 'Введите КПП' : 'КПП'"
                v-model="form.fields[labelToIdMap['КПП']]"
                :class="{ 'input--error': errors[labelToIdMap['КПП']] }"
            />
          </div>

          <div class="form__row" v-if="entityType === 'ИП'">
            <input
                v-if="labelToIdMap['ОГРН']"
                :placeholder="errors[labelToIdMap['ОГРН']] ? 'Введите ОГРН' : 'ОГРН'"
                v-model="form.fields[labelToIdMap['ОГРН']]"
                :class="{ 'input--error': errors[labelToIdMap['ОГРН']] }"
            />
            <input
                v-if="labelToIdMap['Адрес регистрации']"
                :placeholder="errors[labelToIdMap['Адрес регистрации']] ? 'Введите адрес регистрации' : 'Адрес регистрации'"
                v-model="form.fields[labelToIdMap['Адрес регистрации']]"
                :class="{ 'input--error': errors[labelToIdMap['Адрес регистрации']] }"
            />
          </div>

          <input
              v-if="labelToIdMap['ИНН физ. лица']"
              :placeholder="errors[labelToIdMap['ИНН физ. лица']] ? 'Введите ИНН физ. лица' : 'ИНН физ. лица'"
              v-model="form.fields[labelToIdMap['ИНН физ. лица']]"
              :class="{ 'input--error': errors[labelToIdMap['ИНН физ. лица']] }"
          />

          <!-- Загрузка файлов (upload-links) -->
          <div class="upload-links">
            <div v-if="entityType === 'Самозанятый' && labelToIdMap['Справка самозанятого о постановке на учет']">
              <p
                  @click="triggerUpload('doc1')"
                  :class="{ 'input--error': errors[labelToIdMap['Справка самозанятого о постановке на учет']] }"
              >
                <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
                Справка самозанятого о постановке на учет
                <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
              </p>
              <input ref="doc1" type="file" @change="handleFileUpload($event, 'doc1')" style="display: none" />
            </div>

            <div v-if="entityType === 'ИП' && labelToIdMap['Лист записи о регистрации ИП']">
              <p
                  @click="triggerUpload('doc1')"
                  :class="{ 'input--error': errors[labelToIdMap['Лист записи о регистрации ИП']] }"
              >
                <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
                Лист записи о регистрации ИП
                <span v-if="uploadedFiles.doc1"> — {{ uploadedFiles.doc1.name }}</span>
              </p>
              <input ref="doc1" type="file" @change="handleFileUpload($event, 'doc1')" style="display: none" />
            </div>

            <div v-if="labelToIdMap['Скан паспорта (1 страница)']">
              <p
                  @click="triggerUpload('doc2')"
                  :class="{ 'input--error': errors[labelToIdMap['Скан паспорта (1 страница)']] }"
              >
                <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
                Скан паспорта (1 страница)
                <span v-if="uploadedFiles.doc2"> — {{ uploadedFiles.doc2.name }}</span>
              </p>
              <input ref="doc2" type="file" @change="handleFileUpload($event, 'doc2')" style="display: none" />
            </div>

            <div v-if="labelToIdMap['Скан паспорта (Регистрация)']">
              <p
                  @click="triggerUpload('doc3')"
                  :class="{ 'input--error': errors[labelToIdMap['Скан паспорта (Регистрация)']] }"
              >
                <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
                Скан паспорта (Регистрация)
                <span v-if="uploadedFiles.doc3"> — {{ uploadedFiles.doc3.name }}</span>
              </p>
              <input ref="doc3" type="file" @change="handleFileUpload($event, 'doc3')" style="display: none" />
            </div>
          </div>

        </template>

        <label class="checkbox">
          <input type="checkbox" required />
          <span class="form_checkbox">
            Вы даете согласие на
            <a class="form__box-link"
               :href=" activeTab === 0 ? '/docs/client_agreement.pdf'  :  '/docs/applicant_agreement.pdf'"
               target="_blank">обработку персональных данных
            </a>
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
const errors = reactive<Record<string, string>>({})

const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  return '+7' + digits.slice(-10) // берём последние 10 цифр
}

const sendYandexGoal = () => {
  if (typeof window !== 'undefined' && typeof ym === 'function') {
    const goals = ['client_lead', 'worker_lead', 'freelance_lead']
    const goal = goals[activeTab.value]
    ym(90744296, 'reachGoal', goal)
    console.log('Yandex goal sent:', goal)
  }
}

const submitForm = async () => {
  form.phone = normalizePhone(form.phone)
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
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await res.json()

    if (result.errors) {
      Object.keys(result.errors).forEach((key) => {
        const errorMessage = result.errors[key][0] || 'Ошибка валидации'

        // Простые поля (first_name, email, и т.д.)
        if (key in form) {
          errors[key] = errorMessage
        }

        // Поля formEntry.data.{id}
        if (key.startsWith('formEntry.data.')) {
          const id = key.replace('formEntry.data.', '')
          errors[id] = errorMessage
        }
      })

      console.warn('Валидация не пройдена', errors)
      return // Не продолжаем — неуспешная отправка
    }
    isSubmitted.value = true
    sendYandexGoal()
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

.input--error {
  border: 1px solid #F44336 !important;
  outline: none;
}
.input--error::placeholder {
  color: #F44336;
  opacity: 1;
}

a:hover{
  color: #5c1ce0 !important;
}


</style>