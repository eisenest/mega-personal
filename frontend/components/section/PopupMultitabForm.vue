<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <button class="modal-close" @click="closeModal">
        <img src="/icon/close.svg" alt="Закрыть" />
      </button>

      <h2 v-if="!isSubmitted" class="modal-title" v-html="`${currentTitle.title}<br>${currentTitle.subtitle}`"></h2>

      <div class="tabs" v-if="!isSubmitted">
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
              <input
                  v-model="form.date_of_birth"
                  :placeholder="errors.date_of_birth ? 'Введите дату рождения' : 'дд.мм.гггг'"
                  :class="{ 'input--error': errors.date_of_birth }"
                  v-date-mask
              />
            </div>
            <div class="form-row">
              <input v-model="form.phone" :placeholder="errors.phone ? 'Введите телефон' : 'Телефон'" :class="{ 'input--error': errors.phone }" v-phone-mask />
              <DropdownSelect v-model="entityType" placeholder="Тип юридического лица" :options="['ИП', 'Самозанятый']" />
            </div>

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
                  <img src="/icon/upload.svg" alt="Upload" class="upload-icon" />
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
            <span>Вы даете согласие на
              <a class="form__box-link"
                 :href=" activeTab === 0 ? '/docs/client_agreement.pdf'  :  '/docs/applicant_agreement.pdf'"
                 target="_blank">обработку персональных данных
              </a>
            </span>
          </label>

          <button type="submit" class="submit">Оставить заявку</button>
        </form>
      </div>

      <div v-else>
        <h3>Спасибо за <span class="highlight">оставленную заявку!</span></h3>
        <p>
          Наш менеджер свяжется с вами в ближайшее время.
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
  flex-wrap: wrap;
}

.input--error {
  border: 1px solid #f44336 !important;
  outline: none;
}
.input--error::placeholder {
  color: #f44336;
  opacity: 1;
}

@media screen and (max-width:480px ){
  .form-row {
    grid-template-columns: repeat(1, 1fr);
  }

  .modal{
    padding: 1rem;
  }

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
