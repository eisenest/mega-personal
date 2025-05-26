<template>
  <footer class="container white footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__column logo">
          <a href="/">
            <img src="/logo.svg" alt="Mega Personal" class="logo__image" />
          </a>
          <p class="email"><a href="mailto:info@mega-personal.ru">info@mega-personal.ru</a></p>
          <div class="radio-badge">
            <a href="https://инфоресурсфм.рус/reestr/card/?id=18515" target="_blank">
              <img src="/icon/fmrado.png" alt="ФМ.РАДО.РУС" />
              <p class="radio">Мы на ФМ.РАДО.РУС</p>
            </a>
          </div>
        </div>

        <div class="footer__column contacts">
          <p><span>Отдел развития</span><br /><a href="tel:+79151724404">+7 915 172 44 04</a></p>
          <p><span>Ресепшен</span><br /><a href="tel:+74993466006">+7 499 346 60 06</a></p>
          <p><span>Для соискателей</span><br /><a href="tel:+78002229939">+7 800 222 99 39</a></p>
          <p><span>Адрес</span><br />г. Москва, Волгоградский проспект, 43, к3</p>
        </div>

        <div class="footer__nav-wrapper">
          <div class="footer__column nav">
            <ul class="col-first">
              <li><a href="/frontend/pages/uslugi/autsorsing">Аутсорсинг</a></li>
              <li><a href="/frontend/pages/kategoriya/rekrutment">Рекрутмент</a></li>
              <li><a href="/kategoriya/predostavleniye-personala">Предоставление персонала</a></li>
              <li><a href="/vakansii">Вакансии</a></li>
              <li><a href="/partnerskaya-programma">Партнерская программа</a></li>
            </ul>
          </div>
          <div class="footer__column nav">
            <ul class="col-second">
              <li><a href="/blog">Блог</a></li>
              <li><a href="/kontakty">Контакты</a></li>
              <li><a href="/okhrana-truda">Охрана труда</a></li>
            </ul>
          </div>
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
          <a href="https://mega-personal.ru/#/ui/index" target="_blank">
            <button>
                Вход в кабинет
            </button>
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <a href="/docs/personal_data_policy.pdf">Политика обработки персональных данных</a>
        <a href="/docs/client_agreement.pdf">Согласие на обработку персональных данных для работодателей</a>
        <a href="/docs/applicant_agreement.pdf">Согласие на обработку персональных данных для соискателей</a>
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
  gap: 24px;
}

.footer__column.social button{
  margin-top: 38px;
}

.footer__column .col-first{
  height: 66%;
}

.col-first a, .col-second a{
  color: black;
}

.footer__column .col-second {
  height: 33%;
}

.footer__column .col-third {
  height: auto;
}

.logo__image {
  max-width: 140px;
}

.email {
  font-weight: 600;
  margin-top: 64px;
}

a:hover .radio{
  color: #00A2F6 !important
}

.radio {
  color: #2c3e50;
  font-weight: 700;
  margin: auto;
}

.contacts span{
  color: var(--grey, #797979);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
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
}

.footer__bottom a {
  color: #2c3e50;
  font-weight: 300;
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
  display: flex;
  flex-direction: column;
  gap: 16px !important;
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


@media (max-width: 480px) {


  .footer__column.social button{
    width: 100%;
  }


}

.footer__nav-wrapper {
  display: flex;
  flex-direction: row;
  gap: 16px; /* или сколько нужно */
}

@media (max-width: 1024px) {
  .contacts p{
    margin: 6px 0;
  }

  .footer{
    margin-top: 80px;
  }

  .email{
    margin-top: 6px;
  }

  .footer__top {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .footer__nav-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer__column.nav {
    flex: 1;
  }

  .footer__column{
    flex: 1 1;
  }

  .footer__column ul{
    gap: 8px;
  }

  .social-links{
    margin: 0;
  }

}


</style>
<script setup lang="ts">
</script>