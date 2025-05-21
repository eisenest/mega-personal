<template>
  <section class="newsletter-banner">
    <div class="newsletter-container">
      <!-- Левая часть -->
      <div class="newsletter-left">
        <h3>
          Подпишитесь на наши новости, <br />кейсы и исследования!
        </h3>
        <p>Или читайте последние обновления в нашем блоге</p>
        <a href="/blog" class="read-news">
          Читать новости <span>&rarr;</span>
        </a>
      </div>

      <!-- Правая часть -->
      <form class="newsletter-form" @submit.prevent="submitForm">
        <input type="email" v-model="email" placeholder="Ваш email" required />

        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="agree" required />
          <span>Вы даете согласие на <a href="#">рекламную рассылку</a></span>
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

async function submitForm() {
  if (!agree.value || !email.value) return

  const baseUrl = 'https://api.unisender.com/ru/api/subscribe?format=json'

  const queryParams = new URLSearchParams({
    api_key: '65of35pcyrihu56qsfq6iu49r8a4r14wmbqseffo',
    list_ids: '7504418',
    'fields[email]': email.value,
    double_optin: '1', // либо '3', если не нужно подтверждение
    request_ip: window.location.hostname,
    request_time: Math.floor(Date.now() / 1000).toString()
  })

  const url = `${baseUrl}&${queryParams.toString()}`

  try {
    const res = await fetch(url)
    const result = await res.json()

    if (result.result) {
      alert('Вы успешно подписались! Проверьте почту для подтверждения.')
      email.value = ''
      agree.value = false
    } else {
      alert('Ошибка: ' + result.error)
    }
  } catch (err) {
    alert('Произошла ошибка при отправке формы')
    console.error(err)
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
