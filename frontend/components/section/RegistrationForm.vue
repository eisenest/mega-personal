<template>
  <section class="container white form">
    <div class="form__container">
      <!-- Левая часть -->
      <div class="form__info">
        <div class="form__info-top">
          <div class="tabs">
            <button> Рекрутерам </button>
          </div>
          <h3>
            Зарегистрируйтесь на нашей платформе – получайте <br />
            <span class="highlight">неограниченный доход</span> за трудоустроенных кандидатов!
          </h3>
        </div>
        <div class="form__info-bottom">
          <p>
            Заполните форму и получите доступ к широкой <br />
            базе вакансий в вашем личном кабинете
          </p>
        </div>
      </div>

      <!-- Правая часть -->
      <form class="form__box">
        <input type="text" placeholder="Имя, Фамилия, Отчество" />

        <div class="form__row">
          <input type="email" placeholder="Почта" />
          <input type="date" placeholder="Дата Рождения" />
        </div>

        <div class="form__row">
          <input type="tel" placeholder="Телефон" />
          <select>
            <option disabled selected>Тип юридического лица</option>
            <option>ИП</option>
            <option>Самозанятый</option>
          </select>
        </div>

        <div class="form__row">
          <input type="text" placeholder="Серия паспорта" />
          <input type="text" placeholder="Номер паспорта" />
        </div>

        <div class="form__row">
          <input type="text" placeholder="Наименование банка" />
          <input type="text" placeholder="БИК банка" />
        </div>

        <div class="form__row">
          <input type="text" placeholder="Корреспондентский счет" />
          <input type="text" placeholder="Расчетный счет" />
        </div>

        <div class="form__row">
          <input type="text" placeholder="Адрес регистрации" />
          <input type="text" placeholder="ИНН банка" />
        </div>

        <div class="upload-links">
          <p>📎 Справка самозанятого о постановке на учет</p>
          <p>📎 Скан паспорта (1 страница)</p>
          <p>📎 Скан паспорта (Регистрация)</p>
        </div>

        <label class="checkbox">
          <input type="checkbox" />
          <span>Вы даете согласие на обработку персональных данных</span>
        </label>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  </section>
</template>

<style scoped>

.form__container {
  height: 1096px;
}


</style>
