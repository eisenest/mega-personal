<script setup lang="ts">

  const services = [
    { icon: '/resources/1.png', desc: 'Кадровое и бухгалтерское сопровождение' },
    { icon: '/resources/2.png', desc: 'Собственная CRM-система с кандидатами +50000' },
    { icon: '/resources/3.png', desc: 'Собственный call-центр и +30 рекрутеров' },
    { icon: '/resources/4.png', desc: 'Отдел подбора персонала по регионам ' },
    { icon: '/resources/5.png', desc: 'Офисы в +10 регионах' },
    { icon: '/resources/6.png', desc: 'HR-отдел  для онлайн и offline тренингов' },
    { icon: '/resources/7.png', desc: 'Постоянно растущая база опытных рекрутеров' },
    { icon: '/resources/8.png', desc: 'Отдел подбора персонала по Москве и МО' }
  ]
</script>

<template>
  <div class="resource-wrapper">
    <div class="resources-scroll">
      <div
          v-for="(card, index) in services"
          :key="index"
          class="resource-card"
      >
        <div class="icon-wrapper">
          <img :src="card.icon" alt="Иконка" class="icon" />
        </div>
        <p class="text">{{ card.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.resource-card{
  flex: 0 0 auto;
  display: flex;
  height: 208px;
  width: 426px;
  padding: 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 24px;
  background: var(--white, #FFF);
}

.resource-wrapper {
  overflow-x: auto;
  /*padding: 0 16px;*/
}

.resources-scroll {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  min-width: max-content;
}

.resource-wrapper {
  overflow-x: auto;
  -ms-overflow-style: none;     /* IE и Edge */
  scrollbar-width: none;        /* Firefox */
}

.resource-wrapper::-webkit-scrollbar {
  display: none;                /* Chrome, Safari */
}



</style>