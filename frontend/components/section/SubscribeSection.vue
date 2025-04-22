<template>
  <section class="newsletter-banner">
    <div class="newsletter-container">
      <!-- Левая часть -->
      <div class="newsletter-left">
        <h3>
          Подпишитесь на наши новости, <br />кейсы и исследования!
        </h3>
        <p>Или читайте последние обновления в нашем блоге</p>
        <a href="#" class="read-news">
          Читать новости <span>&rarr;</span>
        </a>
      </div>

      <!-- Правая часть -->
      <form class="newsletter-form">
        <input type="email" placeholder="Ваш email" required />

        <label class="checkbox-wrapper">
          <input type="checkbox" required />
          <span>Вы даете согласие на <a href="#">рекламную рассылку</a></span>
        </label>

        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </section>
</template>

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

/*.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #4aa5f8;
  border-radius: 4px;
  appearance: none;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"]:checked::before {
  content: '\2713';
  background-color: #4aa5f8;
  text-align: center;
  line-height: 18px;
  font-size: 14px;
  display: block;
  border-radius: 4px;
}*/

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
</style>