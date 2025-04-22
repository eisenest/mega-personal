<template>
  <section class="contacts-section container">
    <h2 class="contacts-title">Контакты</h2>
    <div class="contacts-wrapper">
      <div class="map">
        <!-- Тут вставляется iframe или компонент карты -->
        <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3a0f9bcd4f12402e56fc89dba9e15c3e5d564b6b7e09d1c72c5a5d0d95b32a23&amp;source=constructor"
            width="100%"
            height="100%"
            frameborder="0"
        ></iframe>
      </div>
      <div class="contact-info">
        <a href="mailto:info@mega-personal.ru" class="email">info@mega-personal.ru</a>

        <div class="info-item">
          <strong>Адрес</strong>
          <p>г. Москва, Волгоградский проспект, 43, к3</p>
        </div>

        <div class="info-item">
          <strong>Отдел развития</strong>
          <p>+7 915 172 44 04</p>
        </div>

        <div class="info-item">
          <strong>Ресепшен</strong>
          <p>+7 499 346 60 06</p>
        </div>

        <div class="info-item">
          <strong>Для соискателей</strong>
          <p>+7 800 222 99 39</p>
        </div>



        <div class="info-item">
          <strong>Время работы</strong>
          <p>ПН – ПТ, 09:00–18:00</p>
        </div>

        <div class="info-item small">
          <p>
            Общество с ограниченной ответственностью «Ресурс Плюс»<br>
            Юридический адрес: 109316, г. Москва, вн. тер. г. муниципальный округ Текстильщики,
            пр-кт Волгоградский, д. 43, к. 3<br>
            ИНН: 7719492019<br>
            КПП: 772201001<br>
            ОГРН: 1197746321607
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 100px;
}

.contacts-title {
  font-size: clamp(28px, 6vw, 42px);
  font-weight: 700;
  margin: 0;
}

.contacts-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  gap: 24px;
}

.map {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
}

.map iframe {
  filter: grayscale(100%);
}

.contact-info {
  border-radius: 24px;
  background: white;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
}

.email {
  color: #3795f4;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  margin-bottom: 8px;
}

.info-item strong {
  display: block;
  font-weight: 700;
  margin-bottom: 4px;
}

.info-item.small p {
  font-size: 13px;
  line-height: 1.4;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .contacts-wrapper {
    grid-template-columns: 1fr;
  }
  .map {
    height: 300px;
  }
}


</style>
