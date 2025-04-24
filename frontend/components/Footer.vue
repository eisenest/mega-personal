<template>
  <footer class="container white footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__column logo">
          <img src="/logo.svg" alt="Mega Personal" class="logo__image" />
          <p class="email"><a href="mailto:info@mega-personal.ru">info@mega-personal.ru</a></p>
          <div class="radio-badge">
            <a href="https://инфоресурсфм.рус/reestr/card/?id=18515" target="_blank">
              <img src="/icon/fmrado.png" alt="ФМ.РАДО.РУС" />
              <p class="radio">Мы на ФМ.РАДО.РУС</p>
            </a>
          </div>
        </div>

        <div class="footer__column contacts">
          <p><strong>Отдел развития</strong><br /><a href="tel:+79151724404">+7 915 172 44 04</a></p>
          <p><strong>Ресепшен</strong><br /><a href="tel:+74993466006">+7 499 346 60 06</a></p>
          <p><strong>Для соискателей</strong><br /><a href="tel:+78002229939">+7 800 222 99 39</a></p>
          <p><strong>Адрес</strong><br />г. Москва, Волгоградский проспект, 43, к3</p>
        </div>

        <div class="footer__column nav">
          <ul class="col-first">
            <li>Аутсорсинг</li>
            <li>Рекрутмент</li>
            <li>Предоставление персонала</li>
            <li>Вакансии</li>
            <li>Партнерская программа</li>
          </ul>
        </div>
        <div class="footer__column nav">
          <ul class="col-second">
            <li>Блог</li>
            <li>Контакты</li>
            <li>Охрана труда</li>
          </ul>
        </div>

        <div class="footer__column social">
          <ul class="col-third social-links">
            <li>
              <a href="https://t.me/MegaPERSONAL_B2B" target="_blank">
                <img src="/icon/tg.svg" alt="Телеграм" />
                <span>Телеграм-канал</span>
              </a>
            </li>
            <li>
              <a href="https://vc.ru/id4617498" target="_blank">
                <img src="/icon/vc.svg" alt="VC.ru" />
                <span>VC.ru</span>
              </a>
            </li>
            <li>
              <a href="https://dzen.ru/megapersonal?shareto=link" target="_blank">
                <img src="/icon/dzen.svg" alt="Дзен" />
                <span>Дзен</span>
              </a>
            </li>
          </ul>
          <button>Вход в кабинет</button>
        </div>
      </div>

      <div class="footer__bottom">
        <p>Политика обработки персональных данных</p>
        <p>Согласие на обработку персональных данных для работодателей</p>
        <p>Согласие на обработку персональных данных для соискателей</p>
      </div>
      <div class="footer__bottom">
        <p class="copyright">© 2025 Mega-Personal</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 200px;
  padding: 2rem;
}

.footer__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 32px;
}

.footer__column {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
}

.footer__column ul{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.footer__column .col-first{
  height: 100%;
}

.footer__column .col-second {
  height: 50%;
}

.footer__column .col-third {
  height: auto;
}

.logo__image {
  max-width: 140px;
}

.email {
  font-weight: 600;
}

.radio {
  color: #2c3e50;
  font-weight: 700;
}

.nav ul, .social ul {
  list-style: none;
  padding: 0;
}

.nav li, .social li {
  margin-bottom: 4px;
  font-weight: 600;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 13px;
  color: #555;
  border-top: 1px solid #eee;
}

.footer__bottom p{
  font-size: clamp(14px, 0.5vw, 18px);
}

.creator {
  margin-left: auto;
  color: #999;
}
.copyright {
  margin-right: auto;
  color: #999;
}

.radio-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #2c3e50;
}

.radio-badge img {
  width: 32px;
  height: 32px;
}

.social-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.social-links li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #2c3e50;
}

.social-links a {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.social-links img {
  width: 20px;
  height: 20px;
}

.radio-badge a {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
</script>