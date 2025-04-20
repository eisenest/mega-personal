<template>
  <section class="expectations container">
    <h3 class="headline">Что мы ожидаем от вас</h3>

    <div class="expectations__item">
      <div class="expectations__image">
        <img src="/expectations/1.png" alt="Документ с требованиями" />
      </div>
      <div class="expectations__text p24">
        <h4>Опыт в подборе персонала и наличие своей базы кандидатов</h4>
        <p>
          Мы ищем профессионалов с опытом в подборе персонала, которые уверенно работают с вакансиями и обладают собственной базой кандидатов.
          Наличие такой базы позволит вам быстрее находить подходящих специалистов, оптимизировать процесс рекрутинга и добиваться лучших результатов в кратчайшие сроки.
        </p>
      </div>
    </div>

    <div class="expectations__item reverse">
      <div class="expectations__text p24">
        <h4>Готовность активно взаимодействовать с нашей командой.</h4>
        <p>
          Мы ценим открытость и командную работу, поэтому ищем специалистов, готовых активно взаимодействовать с нашей командой.
          Взаимная поддержка, обмен опытом и эффективное сотрудничество помогут достигать высоких результатов и успешно решать профессиональные задачи.
        </p>
      </div>
      <div class="expectations__image">
        <img src="/expectations/2.png" alt="Совместная работа за ноутбуком" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.expectations {
  display: flex;
  flex-direction: column;
  gap: 48px;
}


.expectations__item {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.expectations__image {
  flex: 1 1 400px;
  border-radius: 24px;
  overflow: hidden;
}

.expectations__image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 24px;
}

.expectations__text {
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .expectations__item,
  .expectations__item.reverse {
    flex-direction: column;
  }

  .expectations__image,
  .expectations__text {
    flex: 1 1 100%;
  }
}
</style>
