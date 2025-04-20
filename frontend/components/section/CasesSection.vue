<template>
  <section class="container">
    <div class="cases__container">
      <div class="cases__header">
        <h2>Кейсы</h2>
        <Pagination
            :current="0"
            :total="4"
        />
      </div>

      <div class="cases__content">
        <div class="cases__left">
          <h4>50 грузчиков на труднодоступный объект г. Москва</h4>
        </div>

        <div class="cases__right">
          <div class="case-block">
            <h5>Задачи</h5>
            <p>
              Для успешного закрытия заявки за две недели мы реализовали несколько стратегий:
            </p>
            <ul>
              <li>Подключение бригадиров: Привлекли двух бригадиров для собеседований в разные часы, что увеличило охват кандидатов.</li>
              <li>Встречи на объекте: Бригадиры встречали кандидатов на месте, упрощая процесс адаптации.</li>
              <li>Резерв сотрудников: Организовали резерв на уровне 20% для быстрой замены.</li>
              <li>Бесплатное питание: Предложили бесплатное питание для работников.</li>
              <li>Еженедельные выплаты: Внедрили систему еженедельных выплат для привлечения соискателей.</li>
              <li>Возврат патента: Предложили возврат НДФЛ по сумме авансового платежа по патенту иностранным гражданам.</li>
            </ul>
          </div>

          <div class="case-block">
            <h5>Решение</h5>
            <p>Все меры позволили успешно закрыть заявку на 50 грузчиков в срок.</p>
          </div>

          <div class="case-block">
            <h5>Вывод</h5>
            <p>
              Данный кейс показал, что комплексный подход может существенно повысить эффективность процесса.
              Важно учитывать не только финансовые аспекты, но и условия работы, а также потребности и ожидания кандидатов.
              Реализация предложенных мер позволила нам не только успешно закрыть заявку, но и создать положительный имидж компании
              как работодателя, готового идти навстречу своим сотрудникам.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Здесь можно позже подключить слайдер или логику пагинации
import Pagination from "~/components/elements/Pagination.vue";
</script>

<style scoped>

.cases__container {
  margin: 0 auto;
}

.cases__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
  margin-top: 200px;
}

.cases__header h2{
  padding: 0;
}


.cases__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
}

.cases__right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.case-block {
  background: white;
  border-radius: 16px;
  padding: 24px;
}

.case-block h5{
  margin: 0;
}

.case-block h4{
  margin-bottom: 0;
}

.case-block ul {
  margin-top: 8px;
  padding-left: 20px;
  list-style: disc;
}

@media (max-width: 1024px) {
  .cases__content {
    grid-template-columns: 1fr;
  }
  .cases__left {
    margin-bottom: 24px;
  }
}
</style>
