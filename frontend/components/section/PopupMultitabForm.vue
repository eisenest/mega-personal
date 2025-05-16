<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <button class="modal-close" @click="closeModal">
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

      <div v-if="!isSubmitted">
        <form class="form-content" @submit.prevent="submitForm">
          <template v-if="activeTab === 0">
            <div class="form-row">
              <input v-model="form.phone" :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'" :class="{ 'input--error': errors.phone }" v-phone-mask />
              <input v-model="form.email" :placeholder="errors.email ? 'Введите email' : 'email'" :class="{ 'input--error': errors.email }" />
            </div>
            <div class="form-row">
              <input v-model="form.company_name" :placeholder="errors.company_name ? 'Введите организацию' : 'Организация'" :class="{ 'input--error': errors.company_name }" />
              <input v-model="form.address" :placeholder="errors.address ? 'Введите город проекта' : 'Город проекта'" :class="{ 'input--error': errors.address }" />
            </div>
            <textarea v-model="form.comment" :placeholder="errors.comment ? 'Введите комментарий' : 'Комментарий'" :class="{ 'input--error': errors.comment }"></textarea>
          </template>

          <template v-else-if="activeTab === 1">
            <input v-model="form.first_name" :placeholder="errors.first_name ? 'Введите имя и фамилию' : 'Имя и фамилия'" :class="{ 'input--error': errors.first_name }" />
            <div class="form-row">
              <input v-model="form.phone" :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'" :class="{ 'input--error': errors.phone }" v-phone-mask />
              <input v-model="form.city" :placeholder="errors.city ? 'Введите город' : 'Город'" :class="{ 'input--error': errors.city }" />
            </div>
          </template>

          <template v-else>
            <input v-model="form.first_name" :placeholder="errors.first_name ? 'Введите имя' : 'Имя'" :class="{ 'input--error': errors.first_name }" />
            <div class="form-row">
              <input v-model="form.last_name" :placeholder="errors.last_name ? 'Введите фамилию' : 'Фамилия'" :class="{ 'input--error': errors.last_name }" />
              <input v-model="form.middle_name" :placeholder="errors.middle_name ? 'Введите отчество' : 'Отчество'" :class="{ 'input--error': errors.middle_name }" />
            </div>
            <div class="form-row">
              <input v-model="form.email" :placeholder="errors.email ? 'Введите почту' : 'Почта'" :class="{ 'input--error': errors.email }" />
              <input v-model="form.date_of_birth" type="date" :placeholder="errors.date_of_birth ? 'Введите дату рождения' : 'Дата рождения'" :class="{ 'input--error': errors.date_of_birth }" />
            </div>
            <div class="form-row">
              <input v-model="form.phone" :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'" :class="{ 'input--error': errors.phone }" v-phone-mask />
              <DropdownSelect v-model="entityType" placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
            </div>

            <!-- Серия и номер паспорта -->
            <div class="form-row">
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

            <!-- Банк -->
            <div class="form-row">
              <input
                  v-if="labelToIdMap['Наименование банка']"
                  :placeholder="errors[labelToIdMap['Наименование банка']] ? 'Введите банк' : 'Наименование банка'"
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

            <!-- Счета -->
            <div class="form-row">
              <input
                  v-if="labelToIdMap['Корреспондентский счет']"
                  :placeholder="errors[labelToIdMap['Корреспондентский счет']] ? 'Введите корр. счёт' : 'Корреспондентский счет'"
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

            <!-- Доп. поля -->
            <div class="form-row" v-if="entityType === 'Самозанятый'">
              <input
                  v-if="labelToIdMap['Адрес регистрации']"
                  :placeholder="errors[labelToIdMap['Адрес регистрации']] ? 'Введите адрес регистрации' : 'Адрес регистрации'"
                  v-model="form.fields[labelToIdMap['Адрес регистрации']]"
                  :class="{ 'input--error': errors[labelToIdMap['Адрес регистрации']] }"
              />
              <input
                  v-if="labelToIdMap['ИНН банка']"
                  :placeholder="errors[labelToIdMap['ИНН банка']] ? 'Введите ИНН банка' : 'ИНН банка'"
                  v-model="form.fields[labelToIdMap['ИНН банка']]"
                  :class="{ 'input--error': errors[labelToIdMap['ИНН банка']] }"
              />
            </div>

            <div class="form-row" v-else-if="entityType === 'ИП'">
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

            <div class="form-row" v-if="entityType === 'ИП'">
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

            <div class="upload-links">
              <div v-if="entityType === 'Самозанятый' && labelToIdMap['Справка самозанятого о постановке на учет']">
                <p
                    @click="triggerUpload('doc1')"
                    :class="{ 'input--error': errors[labelToIdMap['Справка самозанятого о постановке на учет']] }"
                >
                  <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
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
                  <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
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
                  <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
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
                  <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
                  Скан паспорта (Регистрация)
                  <span v-if="uploadedFiles.doc3"> — {{ uploadedFiles.doc3.name }}</span>
                </p>
                <input ref="doc3" type="file" @change="handleFileUpload($event, 'doc3')" style="display: none" />
              </div>
            </div>
          </template>

          <label class="checkbox">
            <input type="checkbox" required />
            <span>Вы даете согласие на <a href="/docs/applicant_agreement.pdf" target="_blank">обработку персональных данных</a></span>
          </label>

          <button type="submit" class="submit">Оставить заявку</button>
        </form>
      </div>

      <div v-else>
        <h3>Спасибо за <span class="highlight">оставленную заявку!</span></h3>
        <p v-if="activeTab === 0">
          Наш менеджер свяжется с вами в ближайшее время, чтобы обсудить ваши потребности и предложить оптимальные решения.
        </p>
        <p v-else-if="activeTab === 1">
          Наш HR-менеджер свяжется с вами в ближайшее время для обсуждения дальнейших шагов.
        </p>
        <p v-else>
          Наш менеджер свяжется с вами в ближайшее время для обсуждения возможных вариантов партнерства.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import DropdownSelect from '~/components/elements/DropdownSelect.vue'

const showModal = ref(false)
const activeTab = ref(0)
const isSubmitted = ref(false)

const entityType = ref('ИП')
const selectedTypeObject = ref(null)
const labelToIdMap = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})
const publicHost = useRuntimeConfig().public.publicHost

const closeModal = () => {
  showModal.value = false
  isSubmitted.value = false
}

// Экспорт наружу
defineExpose({
  open(tab = 0) {
    activeTab.value = tab
    showModal.value = true
  },
  close: closeModal
})

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
  fields: {}
})

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

const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  return '+7' + digits.slice(-10)
}

const sendYandexGoal = () => {
  if (typeof window !== 'undefined' && typeof ym === 'function') {
    const goals = ['client_lead', 'worker_lead', 'freelance_lead']
    ym(90744296, 'reachGoal', goals[activeTab.value])
  }
}

const submitForm = async () => {
  form.phone = normalizePhone(form.phone)
  errors.value = {}

  let url = ''
  let payload = {}

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()

    if (result.errors) {
      for (const key in result.errors) {
        const msg = result.errors[key][0] || 'Ошибка валидации'
        if (key in form) errors[key] = msg
        if (key.startsWith('formEntry.data.')) {
          const id = key.replace('formEntry.data.', '')
          errors[id] = msg
        }
      }
      return
    }

    isSubmitted.value = true
    sendYandexGoal()
  } catch (e) {
    console.error('Ошибка при отправке формы', e)
    alert('Ошибка при отправке формы.')
  }
}

watch([activeTab, entityType], async ([tab, type]) => {
  if (tab === 2) {
    try {
      const res = await fetch('https://api-1.beta.mega-personal.ru/omega/registration_request')
      const types = await res.json()
      selectedTypeObject.value = types.find(t => t.name === type)

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
})


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



</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
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

.modal span.highlight {
  font-size: unset;
  color: var(--main-blue, #00A2F6) !important;
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

.input--error {
  border: 1px solid #f44336 !important;
  outline: none;
}
.input--error::placeholder {
  color: #f44336;
  opacity: 1;
}

</style>
