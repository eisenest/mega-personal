<template>
  <section class="container">
    <div class="blog__container">
      <h2 :class="{ headline: isMain }">Блог</h2>
      <div class="blog__grid">
        <div
            class="blog-card"
            v-for="(post, i) in displayedPosts"
            :key="i"
        >
          <div class="blog-card__image-wrapper">
            <img :src="post.image" alt="" class="blog-card__image" />
            <div class="blog-card__overlay"></div>
          </div>
          <small class="blog-card__date">{{ post.date }}</small>
          <h3 class="blog-card__title">{{ post.title }}</h3>
          <p class="blog-card__excerpt">{{ post.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  isMain: Boolean,
})

const posts = [
  {
    date: '12 марта 2024',
    title: 'Легендарная выгода со Stardogs!',
    description: 'Вас ждут франшизы HoReCa, услуг и ритейла с инвестициями от 1 млн до 50+ млн рублей и насыщенная программа.',
    image: '/blog/1.png'
  },
  {
    date: '12 марта 2024',
    title: 'Как понять, что перед вами идеальный кандидат?',
    description: 'Найти подходящего сотрудника — задача не из лёгких. Как же понять, что кандидат действительно идеален для вашей компании?',
    image: '/blog/2.png'
  },
  {
    date: '25 марта 2024',
    title: 'Почему вакансия "висит", а откликов нет? Разбираем ошибки',
    description: 'Ваши объявления о вакансиях долго остаются без внимания? Возможно, проблема в одном из этих пунктов:',
    image: '/blog/3.png'
  },
  {
    date: '25 марта 2024',
    title: 'Тренды найма 2025 — на что обратить внимание работодателям?',
    description: 'Мир работы меняется, и чтобы оставаться в игре, компаниям важно учитывать новые тенденции...',
    image: '/blog/4.png'
  },
  {
    date: '12 марта 2024',
    title: 'Легендарная выгода со Stardogs!',
    description: 'Вас ждут франшизы HoReCa, услуг и ритейла с инвестициями от 1 млн до 50+ млн рублей и насыщенная программа.',
    image: '/blog/1.png'
  },
  {
    date: '12 марта 2024',
    title: 'Как понять, что перед вами идеальный кандидат?',
    description: 'Найти подходящего сотрудника — задача не из лёгких. Как же понять, что кандидат действительно идеален для вашей компании?',
    image: '/blog/2.png'
  },
  {
    date: '25 марта 2024',
    title: 'Почему вакансия "висит", а откликов нет? Разбираем ошибки',
    description: 'Ваши объявления о вакансиях долго остаются без внимания? Возможно, проблема в одном из этих пунктов:',
    image: '/blog/3.png'
  },
  {
    date: '25 марта 2024',
    title: 'Тренды найма 2025 — на что обратить внимание работодателям?',
    description: 'Мир работы меняется, и чтобы оставаться в игре, компаниям важно учитывать новые тенденции...',
    image: '/blog/4.png'
  }
]

// Ограничение постов, если это главная страница
const displayedPosts = computed(() =>
    props.isMain ? posts.slice(0, 4) : posts
)

</script>

<style scoped>

.blog__container h2{
  padding: 0;
}

.blog__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  row-gap: 4rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #2c3e50;
}

.blog-card__image-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 24px;
  overflow: hidden;
}

.blog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(231deg, #0C90F2 9.17%, #571BD8 92.72%);
  opacity: 0.4;
  pointer-events: none;
}

.blog-card__date {
  font-size: 14px;
  color: #555;
}

.blog-card__title {
  font-size: 18px;
  font-weight: 700;
  height: 38px;
  margin: 0 0 8px 0;
}

.blog-card__excerpt {
  font-size: 18px;
  color: #333;
  margin: 0;
}
</style>
