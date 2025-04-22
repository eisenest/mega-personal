<template>
  <section class="container">
    <div class="cases__container">
      <div class="cases__header">
        <h2>Кейсы</h2>
        <Pagination
            :current="currentCaseIndex"
            :total="cases.length"
            @prev="prevCase"
            @next="nextCase"
        />
      </div>

      <div class="cases__content">
        <div class="cases__left">
          <h4>{{ currentCase.title }}</h4>
        </div>

        <div class="cases__right">
          <div class="case-block" v-for="(block, idx) in currentCase.blocks" :key="idx">
            <h5>{{ block.title }}</h5>
            <p v-if="block.text">{{ block.text }}</p>
            <ul v-if="block.list">
              <li v-for="(item, i) in block.list" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from "~/components/elements/Pagination.vue"

const cases = [{
  title: '50 грузчиков на труднодоступный объект г. Москва',
  blocks: [
    {
      title: 'Задачи',
      text: 'Для успешного закрытия заявки за две недели мы реализовали несколько стратегий:',
      list: [
        'Подключение бригадиров: Привлекли двух бригадиров для собеседований в разные часы, что увеличило охват кандидатов.',
        'Встречи на объекте: Бригадиры встречали кандидатов на месте, упрощая процесс адаптации.',
        'Резерв сотрудников: Организовали резерв на уровне 20% для быстрой замены.',
        'Бесплатное питание: Предложили бесплатное питание для работников.',
        'Еженедельные выплаты: Внедрили систему еженедельных выплат для привлечения соискателей.',
        'Возврат патента: Предложили возврат НДФЛ по сумме авансового платежа по патенту иностранным гражданам.'
      ]
    },
    {
      title: 'Решение',
      text: 'Все меры позволили успешно закрыть заявку на 50 грузчиков в срок.'
    },
    {
      title: 'Вывод',
      text: 'Данный кейс показал, что комплексный подход может существенно повысить эффективность процесса. Важно учитывать не только финансовые аспекты, но и условия работы, а также потребности и ожидания кандидатов. Реализация предложенных мер позволила нам не только успешно закрыть заявку, но и создать положительный имидж компании как работодателя, готового идти навстречу своим сотрудникам.'
    }
  ]
},{
  title: '49 грузчиков на труднодоступный объект г. Подольск',
  blocks: [
    {
      title: 'Задачи',
      text: 'Для  закрытия заявки за две недели мы реализовали несколько стратегий:',
      list: [
        'Подключение бригадиров: Привлекли двух бригадиров для собеседований в разные часы, что увеличило охват кандидатов.',
        'Встречи: Бригадиры встречали кандидатов на месте, упрощая процесс адаптации.',
        'Резерв сотрудников: Организовали резерв на уровне 20% для быстрой замены.',
        'Бесплатное питание: Предложили бесплатное питание для работников.',
        'Еженедельные выплаты: Внедрили систему еженедельных выплат для привлечения .',
        'Возврат патента: Предложили возврат НДФЛ по сумме авансового платежа по патенту иностранным гражданам.'
      ]
    },
    {
      title: 'Решение',
      text: 'Все меры позволили успешно закрыть заявку на 50 грузчиков в срок.'
    },
    {
      title: 'Вывод',
      text: 'Данный кейс показал, что комплексный подход может существенно повысить эффективность процесса. Важно учитывать не только финансовые аспекты, но и условия работы, а также потребности и ожидания кандидатов. Реализация предложенных мер позволила нам не только успешно закрыть заявку, но и создать положительный имидж компании как работодателя, готового идти навстречу своим сотрудникам.'
    }
  ]
}]

// const cases = Array.from({ length: 4 }, () => JSON.parse(JSON.stringify(baseCase)))
const currentCaseIndex = ref(0)
const currentCase = computed(() => cases[currentCaseIndex.value])

function prevCase() {
  if (currentCaseIndex.value > 0) {
    currentCaseIndex.value--
  }
}

function nextCase() {
  if (currentCaseIndex.value < cases.length - 1) {
    currentCaseIndex.value++
  }
}
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

.cases__header h2 {
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

.case-block h5 {
  margin: 0;
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
