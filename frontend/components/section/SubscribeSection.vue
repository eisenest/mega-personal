<template>
  <section class="newsletter-banner">
    <div class="newsletter-container">
      <!-- Левая часть -->
      <div class="newsletter-left">
        <h3 v-if="!successMessage">
          Подпишитесь на наши новости, <br />кейсы и исследования!
        </h3>
        <h3 v-else>
          {{ successMessage }}
        </h3>
        <p>Или читайте последние обновления в нашем блоге</p>
        <a href="/blog" class="read-news">
          Читать новости <span>&rarr;</span>
        </a>
      </div>

      <!-- Правая часть -->
      <form v-if="!successMessage" class="newsletter-form" @submit.prevent="submitForm">
        <input type="email" v-model="email" placeholder="Ваш email" required />

        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="agree" required />
          <span>Вы даете согласие на <a target="_blank" href="/docs/consent_advertising_referrals.pdf">рекламную рассылку</a></span>
        </label>

        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const agree = ref(false)
const successMessage = ref('')

async function submitForm() {
  if (!agree.value || !email.value) return

  const config = useRuntimeConfig()

  const { data, error } = await useFetch('/api/subscribe', {
    baseURL: config.public.publicHost,
    method: 'POST',
    body: { email: email.value },
  })

  if (data.value?.result) {
    successMessage.value = 'Спасибо! Подтвердите подписку в письме.'
    email.value = ''
    agree.value = false
  } else {
    alert('Ошибка: ' + (data.value?.error || error.value?.message))
  }

}
</script>

<style scoped>
.newsletter-banner {
  background: #4aa5f8;
  padding: 48px;
  border-radius: 24px;
  margin-top: 200px;
}

.newsletter-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.newsletter-left {
  color: white;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.newsletter-left h3 {
  color: #ffffff !important;
  font-weight: 800;
  margin: 0 0 24px;
}

.newsletter-left p {
  color: #ffffff !important;
  margin-bottom: 24px;
}

.read-news {
  font-weight: 700;
  font-size: 20px;
  color: white;
  text-decoration: none;
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.read-news:hover{
  color: var(--violet, #6700D1) !important;
}

.newsletter-form {
  background: white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 300px;
}

.newsletter-form input[type="email"] {
  padding: 16px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  background: #f0f8ff;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2c3e50;
}

.checkbox-wrapper a {
  color: #4aa5f8;
  text-decoration: underline;
  font-size: 14px !important;
}

.newsletter-form button {
  background: #5b0ee3;
  color: white;
  border: none;
  border-radius: 36px;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.success-message {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
}

@media (max-width: 480px) {
  .newsletter-left {
    max-width: 100%;
  }

  .newsletter-banner {
    padding: 16px;
  }

  .newsletter-form {
    padding: 16px;
  }
}
</style>
