<template>
  <section class="blog-article container">
    <!-- Header -->
    <div class="article-header">
      <div class="article-header__image">
        <img src="/blog/1.png" alt="Фото статьи" class="article-image" />
      </div>
      <div class="article-header__text">
        <p class="article-date">28 Апреля 2024</p>
        <h1 class="article-title">
          Как понять, что перед вами <span class="highlight">идеальный кандидат?</span>
        </h1>
        <p class="article-intro">
          Найм сотрудника – ответственная задача, от которой зависит успех компании. Идеальный кандидат — это не только человек с нужными компетенциями, но и тот, кто подходит по духу команде, разделяет ценности компании и способен адаптироваться к рабочей среде. Рассмотрим ключевые признаки, которые помогут определить идеального кандидата.
        </p>
        <div class="share-links">
          <span>Поделиться</span>
          <a href="#"><img src="/icon/tg2.svg" alt="Telegram" /></a>
          <a href="#"><img src="/icon/vk2.svg" alt="VK" /></a>
        </div>
      </div>

    </div>

    <!-- Content layout -->
    <div class="article-content">
      <aside class="article-toc">
        <h5>Содержание</h5>
        <ul>
          <li><a href="#professional">1. Соответствие профессиональным требованиям</a></li>
          <li><a href="#flexibility">2. Гибкость и обучаемость</a></li>
          <li><a href="#motivation">3. Мотивация и интерес к работе</a></li>
          <li><a href="#responsibility">4. Ответственность</a></li>
          <li><a href="#conclusion">5. Вывод</a></li>
        </ul>
      </aside>

      <article class="article-body">
        <section id="professional">
          <h4>Соответствие профессиональным требованиям</h4>
          <p>
            Первой и самой очевидной фразой – это соответствие кандидата требованиям вакансии. Обратите внимание на:
          </p>
          <ul>
            <li>Образование и квалификацию</li>
            <li>Опыт работы в аналогичной сфере</li>
            <li>Навыки владения оборудованием и инструментами</li>
            <li>Портфолио (если применимо)</li>
          </ul>
          <p>Даже если компетенции соответствуют, задайте себе дополнительные вопросы: насколько он открыт, умеет ли адаптироваться?</p>
        </section>

        <section id="flexibility">
          <h4>Гибкость и обучаемость</h4>
          <p>
            Мир быстро меняется, и способность адаптироваться к новым условиям – важное качество. Идеальный кандидат:
            Быстро усваивает новую информацию. Открыт к изменениям и развитию. Готов осваивать новые технологии и подходы.
            При этом даже самый опытный специалист может не вписаться в коллектив. Стоит оценить, совпадают ли его ценности с корпоративными, комфортно ли ему будет работать в команде и сможет ли он адаптироваться к вашей рабочей среде. Командная работа – основа успеха большинства компаний, поэтому важно, чтобы кандидат умел ясно излагать мысли, внимательно слушал и задавал уточняющие вопросы, проявлял эмпатию и уважение к собеседнику.          </p>
        </section>

        <section id="motivation">
          <h4>Мотивация и интерес к работе</h4>
          <p>
            Также немаловажным фактором являются ответственность и организованность. Человек, который способен брать на себя ответственность и грамотно управлять своим временем, является ценным сотрудником. Хороший кандидат держит слово и выполняет обещания, соблюдает сроки и организует рабочий процесс, проявляет самостоятельность в решении задач. Если у него есть успешный опыт работы, коллеги и бывшие работодатели могут дать ему рекомендации, и положительные отзывы о прошлом опыте станут дополнительным плюсом.          </p>
        </section>

        <section id="responsibility">
          <h4>Ответственность</h4>
          <p>
            Человек, который способен брать на себя ответственность и грамотно управлять своим временем, – ценный сотрудник. Хороший кандидат:
            Держит слово и выполняет обещания.
            Соблюдает сроки и организует рабочий процесс.
            Проявляет самостоятельность в решении задач.
            7. Профессиональная репутация и рекомендации
            Если у кандидата есть успешный опыт работы, коллеги и бывшие работодатели могут дать ему рекомендации. Хорошие отзывы о прошлом опыте – важный плюс.
            8. Тестовое задание и пробный период
            Если кандидат соответствует большинству критериев, но у вас остаются сомнения, предложите выполнить тестовое задание или пройти испытательный срок. Это поможет на практике увидеть его в деле.          </p>
        </section>

        <section id="conclusion">
          <h4>Вывод</h4>
          <p>
            Идеальный кандидат – это не только профессионал, но и человек, который гармонично вольётся в команду и будет разделять цели компании. Оценивая не только профессиональные качества, но и личностные характеристики, вы сможете сделать правильный выбор и найти сотрудника, который принесёт компании максимальную пользу.          </p>
        </section>
        <div class="article-footer">
          <a href="#" class="prev">
            <img src="/icon/left-blue-arrow.svg" alt="">
            Предыдущая статья
          </a>
          <a href="#" class="next">
            Следующая статья
            <img src="/icon/left-blue-arrow.svg" alt="">
          </a>
        </div>
      </article>
    </div>

  </section>
</template>

<style scoped>
.blog-article {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.article-header {
  text-align: left;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 12px;
}

.article-intro {
  margin-top: 16px;
}

.highlight {
  color: #3795f4;
}

.share-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.article-content {
  display: flex;
  gap: 32px;
}

.article-toc {
  background: #f7fbff;
  padding: 16px;
  border-radius: 12px;
  //font-size: 14px;
}

.article-toc ul {
  padding-left: 18px;
}

.article-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-body h4 {
  margin: 40px 0;
}

.article-body ul {
  padding-left: 20px;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  font-weight: 600;
}

.prev, .next {
  color: var(--violet, #6700D1);
  text-decoration: none;
  align-items: center;
  display: flex;
  gap: 12px;
}

.article-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  align-items: start;
  margin-bottom: 40px;
}

.article-header__image img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.article-header__text {
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
}

.article-intro {
  color: #333;
}

.share-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.highlight {
  color: #3795f4;
}

.article-content {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 1/3 и 2/3 */
  margin-top: 48px;
  align-items: start;
}

.article-toc {
  background: #f8fbff;
  padding: 24px;
  border-radius: 16px;
  font-size: 16px;
}

.article-toc h3 {
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 700;
}

.article-toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-toc li {
  margin-bottom: 12px;
}

.article-toc a {
  color: #3795f4;
  text-decoration: none;
}

.article-body {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.6;
}

.article-body h2 {
  font-size: 22px;
  margin-bottom: 12px;
  font-weight: 700;
}

.article-toc a.active {
  color: #6800d4;
  font-weight: 700;
}

.share-links img{
  width: 32px;
}


@media (max-width: 768px) {
  .article-header {
    grid-template-columns: 1fr;
  }
}


@media (max-width: 768px) {
  .article-content {
    grid-template-columns: 1fr; /* Стакается */
  }

  .article-toc {
    order: 2;
    margin-top: 32px;
  }

  .article-body {
    order: 1;
  }
}

</style>
<script setup lang="ts">
</script>