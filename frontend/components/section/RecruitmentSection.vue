<template>
  <section class="container recruitment">
    <div class="recruitment__head">
      <h1 class="highlight title">Рекрутмент</h1>
      <h3 class="subtitle">Найдём лучших за вас!</h3>
      <p class="text">
        Мы подбираем только лучших специалистов, которые идеально впишутся в вашу команду,
        и создаём мощные коллективы, способные решать самые сложные задачи.
        Быстро, эффективно и с точным попаданием в ваши бизнес-цели!
      </p>
    </div>

    <div class="recruitment__cards">
      <div class="card card--left">
        <div class="card__text">
          <h4>Поиск и подбор специалистов</h4>
          <a href="#" class="card__link">
            Подробнее
            <span class="icon">❯</span>
          </a>
        </div>
        <div class="card__img" style="background-image: url('/recruitment/1.png');"></div>
      </div>

      <div class="card card--right">
        <div class="card__text">
          <h4>Массовый рекрутмент</h4>
          <a href="#" class="card__link">
            Подробнее
            <span class="icon">❯</span>
          </a>
        </div>
        <div class="card__img" style="background-image: url('/recruitment/2.png');"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.recruitment {
  display: flex;
  flex-direction: column;
  gap: 32px;
  //padding: 64px 0;
}

.recruitment__head {
  text-align: center;
  background: #fff;
  padding: 48px;
  border-radius: 24px;
}

.title {
  //font-size: 48px;
  //font-weight: 800;
  //color: #3398ff;
  margin-bottom: 16px;
  margin-top: 0;
}

.subtitle {
  //font-size: 28px;
  //font-weight: 800;
  //color: #2c3e50;
  margin: 16px 0;
}

.text {
  font-size: 24px;
  margin: 16px auto;
  width: 70%;
}

.recruitment__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  gap: 16px;
  position: relative;
  min-height: 280px;
}

.card__text {
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 32px;
}

.card__text h4 {
  font-size: 32px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 12px;
  margin-top: 0;
}

.card__link {
  font-size: 16px;
  font-weight: 600;
  color: #6d00c4;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 14px;
}

.card__img {
  width: 50%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
