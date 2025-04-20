<template>
  <section class="container goal">
    <h2 class="headline">Наша цель – <span class="highlight">ваш успех!</span></h2>

    <div class="goal__content">
      <!-- Левая часть -->
      <div class="goal__left">
        <h3>Аутсорсинг</h3>
        <div class="goal__points">
           <GoalCard v-for="(point, index) in points" :key="index"
              :number="index+1"
              :description="point"
           />
        </div>

        <Pagination
            :current="0"
            :total="4"
        />
      </div>

      <!-- Правая часть -->
      <div class="goal__right">
        <img src="/about/goal.png" alt="Цель" class="goal__image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import GoalCard from "~/components/cards/GoalCard.vue";
import Pagination from "~/components/elements/Pagination.vue";

const points = [
  '5000+ сотрудников ежедневно оказывают услуги на объектах наших клиентов',
  'Состоим в ассоциации ФМ.РАДО.РУС и соблюдаем законодательство РФ.',
  'Зона покрытия — вся Россия',
  'Оперативный запуск проектов'
]
</script>

<style scoped>

.goal .headline{
  padding: 0;
}

.highlight {
  color: #1c9eff;
}

.goal__content {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
}

.goal__left {
  flex: 1 1 480px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.goal__subtitle {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.goal__points {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.point-card {
  background: #f3f9ff;
  padding: 20px;
  border-radius: 16px;
  font-size: 16px;
  color: #2c3e50;
}

.point-number {
  font-weight: 700;
  color: #5c1ce0;
  margin-bottom: 8px;
}

.dot {
  font-size: 10px;
  vertical-align: middle;
}

.goal__pagination {
  display: flex;
  gap: 12px;
  font-weight: 600;
  color: #2c3e50;
  align-items: center;
  margin-top: auto;
}

.arrow {
  font-size: 18px;
  cursor: pointer;
}

.page {
  font-weight: bold;
}

.goal__right {
  flex: 1 1 480px;
  position: relative;
  display: flex;
  justify-content: center;
}

.goal__image-wrapper {
  background: url("/about/goal.png");
  position: relative;
}


.goal__image {
  object-fit: cover;
  width: 100%;
}
@media (max-width: 960px) {
  .goal__content {
    flex-direction: column;
  }

  .goal__points {
    grid-template-columns: 1fr;
  }

  .goal__image {
    max-width: 100%;
  }
}
</style>
