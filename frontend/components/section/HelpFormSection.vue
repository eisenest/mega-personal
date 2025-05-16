<template>
  <section class="container white form" id="form">
    <div class="form__container">
      <!-- Левая часть -->
      <div class="form__info">
        <div class="form__info-top">
          <h3 v-if="!isSubmitted">
            Возможность работы <span class="highlight">для Вас!</span>
          </h3>
          <h3 v-else>
            Спасибо за заявку!
            <span class="highlight"> Мы свяжемся с вами в ближайшее время.</span>
          </h3>
          <div class="tabs" v-if="!isSubmitted">
            <button
                v-for="(tab, i) in tabs"
                :key="i"
                :class="{ active: activeTab === i }"
                @click="activeTab = i"
            >
              {{ tab }}
            </button>
          </div>
        </div>
        <div class="form__info-bottom">
          <p v-if="!isSubmitted">Заполните форму, и наш специалист свяжется с вами.</p>
        </div>
      </div>

      <!-- Правая часть -->
      <form class="form__box" @submit.prevent="submitForm" v-if="!isSubmitted">
        <input v-model="form.first_name" type="text" placeholder="Имя и фамилия" required />
        <div class="form__row">
          <input v-model="form.phone" type="text" placeholder="Телефон" required v-phone-mask />
          <input v-model="form.city" type="text" placeholder="Город" required />
        </div>
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

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const tabs = ['Работа', 'Подработка', 'Вахта']
const activeTab = ref(0)
const isSubmitted = ref(false)

const form = ref({
  first_name: '',
  phone: '',
  city: '',
  date_of_birth: ''
})

const route = useRoute()

watch(
    () => route.query.tab,
    () => {
      const tab = Number(route.query.tab)
      if (!isNaN(tab)) activeTab.value = tab
    },
    { immediate: true }
)

const normalizePhone = (raw) => {
  const digits = raw.replace(/\D/g, '')
  return '+7' + digits.slice(-10)
}

const submitForm = async () => {
  form.value.phone = normalizePhone(form.value.phone)

  const payload = {
    first_name: form.value.first_name,
    phone: form.value.phone,
    city: form.value.city,
    date_of_birth: form.value.date_of_birth
  }

  try {
    const res = await fetch('https://api-1.beta.mega-personal.ru/omega/person_worker_request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()

    if (result.errors) {
      alert('Проверьте корректность заполнения формы.')
      return
    }

    if (typeof window !== 'undefined' && typeof ym === 'function') {
      ym(90744296, 'reachGoal', 'worker_lead')
    }

    isSubmitted.value = true
  } catch (e) {
    console.error('Ошибка при отправке формы', e)
    alert('Ошибка при отправке формы.')
  }
}
</script>

<style scoped>
#form {
  scroll-margin-top: 150px;
}

/*.form__container {
  height: 483px;
}*/

.form__box-link {
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
}
</style>
