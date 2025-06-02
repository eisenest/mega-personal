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
          <!-- Первая часть: обычные поля (text, email, date и т.д.) -->
          <div class="form__row">
            <input
                type="text"
                v-for="field in selectedTypeObject?.form?.fields?.filter(f => f.type !== 'file') || []"
                :key="'text-' + field.id"
                v-model="form.fields[field.id]"
                :placeholder="errors[field.id] ? 'Введите ' + field.label.toLowerCase() : field.label"
                :class="{ 'input--error': errors[field.id] }"
                v-dynamic-mask="field.config?.mask"
            />
          </div>

          <!-- Вторая часть: файлы -->
          <div class="upload-links">
            <div
                v-for="field in selectedTypeObject?.form?.fields?.filter(f => f.type === 'file') || []"
                :key="'file-' + field.id"
            >
              <p @click="triggerUpload(field.id)" :class="{ 'input--error': errors[field.id] }">
                <img src="/icon/upload-white.svg" alt="Upload" class="upload-icon" />
                {{ field.label }}
                <span v-if="uploadedFiles[field.id]"> — {{ uploadedFiles[field.id].name }}</span>
              </p>
              <input
                  type="file"
                  :ref="el => setInputRef(el, field.id)"
                  style="display: none"
                  @change="handleFileUpload($event, field.id)"
              />
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

const formStates = reactive<Record<number, any>>({
  0: {},
  1: {},
  2: {}
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
      date_of_birth: formatDateToISO(form.date_of_birth),
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

function formatDateToISO(dateStr: string): string {
  const [dd, mm, yyyy] = dateStr.split('.')
  return `${yyyy}-${mm}-${dd}`
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

watch(activeTab, (newTab, oldTab) => {
  // Сохраняем предыдущее состояние формы
  if (oldTab !== null && oldTab !== undefined) {
    formStates[oldTab] = JSON.parse(JSON.stringify(form))
  }

  // Очищаем текущую форму
  Object.keys(form).forEach(key => {
    if (typeof form[key] === 'object' && form[key] !== null) {
      form[key] = {}
    } else {
      form[key] = ''
    }
  })

  // Загружаем новое состояние, если оно было
  if (formStates[newTab]) {
    Object.assign(form, JSON.parse(JSON.stringify(formStates[newTab])))
  }

  // Очищаем ошибки
  Object.keys(errors).forEach(k => delete errors[k])
})

const uploadedFiles = reactive<Record<string, File | null>>({})

const inputRefs = ref<Record<string, HTMLInputElement | null>>({})
const setInputRef = (el: HTMLInputElement | null, id: string) => {
  inputRefs.value[id] = el
}

const triggerUpload = (fieldId: string) => {
  const input = inputRefs.value[fieldId]
  if (input && typeof input.click === 'function') {
    input.click()
  } else {
    console.warn(`Поле загрузки не найдено для id: ${fieldId}`)
  }
}

const handleFileUpload = async (event, fieldId) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("dir", "crm");

  try {
    const res = await fetch("https://api-1.beta.mega-personal.ru/file", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    // Сохраняем весь объект вместо просто URL
    form.fields[fieldId] = {
      id: result.id,
      filename: result.filename,
      extension: result.extension,
      path: result.path,
      fullName: result.fullName,
    };

    uploadedFiles[fieldId] = file;
  } catch (err) {
    console.error("Ошибка при загрузке файла", err);
    alert("Ошибка при загрузке файла");
  }
};


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
  flex-wrap: wrap;
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


.form__row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Если элемент последний в строке и он один — растягиваем */
.form__row > *:nth-last-child(1):nth-child(odd) {
  grid-column: span 2;
}


</style>