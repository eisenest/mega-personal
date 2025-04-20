<template>
  <section class="mission container white">
    <div class="mission__content">
      <h2 class="mission__title">
        Миссия компании <span class="highlight">Mega-Personal</span>
      </h2>
      <p class="mission__text">
        Мы предоставляем высококачественные услуги по подбору и управлению персоналом, помогая клиентам оптимизировать бизнес-процессы, сокращать затраты и устойчиво расти.
        Стремимся быть надёжным партнёром, снабжая компании трудовыми ресурсами, соблюдая законодательные нормы.
      </p>
    </div>
    <div class="mission__icon">
      <img src="/about/mission.png" alt="checkmark" />
    </div>
  </section>
</template>

<style scoped>
.mission {
  margin: 200px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 24px;
  background: white;
  gap: 40px;
  flex-wrap: wrap;
  padding: 2.5rem;
  height: 350px;
}

.mission__content {
  flex: 0 1 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}



.highlight {
  color: #1c9eff;
}

.mission__text {
  font-size: 18px;
  color: #2c3e50;
  line-height: 1.6;
}

.mission__icon {
  flex: 0 1 25%;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mission__icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

h2.mission__title {
  margin-top: 1rem;
}

p.mission__text {
  margin-bottom: 0;
}

</style>
