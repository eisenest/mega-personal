<template>
  <section class="map-section white container">
    <div class="map-section__content">
      <h3>
        <span class="highlight">
          К новым горизонтам:<br />
          расширяем границы возможностей!
        </span>
      </h3>
      <p class="map-section__text">
        Мы успешно работаем как в крупнейших мегаполисах, так и в небольших городах страны, демонстрируя готовность эффективно сотрудничать в любом населённом пункте вне зависимости от численности населения.
      </p>
    </div>
    <div class="map-section__image">
      <img src="/about/map.png" alt="Карта России" />
    </div>
  </section>
</template>

<style scoped>
.map-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 4rem;
  gap: 40px;
}

.map-section__content {
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.map-section__text {
  font-size: 18px;
  line-height: 150%;
  max-width: 400px;
  margin-top: auto;
}

.map-section__image {
  flex: 1 1 600px;
  display: flex;
  justify-content: center;
}

.map-section__image img {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 1024px) {

  .map-section__content h3 {
    margin: 0;
  }

  .map-section__image img{
    height: fit-content;
  }

  .map-section__image {
    margin-top: 24px;
  }

  .map-section__text{
    margin: inherit;
  }
  .map-section {
    display: block;
  }


}

@media (max-width: 480px) {
  .map-section {
    padding: 1rem;
  }

  .map-section__image{
    flex: none;
  }

  .map-section__image img{
    width: 100%;
    height: auto;
  }

}

@media (max-width: 768px) {
  .map-section {
    flex-direction: column;
    align-items: flex-start;
    display: block;
  }

  .map-section__image {
    justify-content: flex-start;
  }

}
</style>
