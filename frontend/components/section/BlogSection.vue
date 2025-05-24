<template>
  <section class="container">
    <div class="blog__container">
      <h2 :class="{ headline: isMain }">{{ title }}</h2>
      <div class="blog__grid">
        <div
            class="blog-card"
            v-for="(post, i) in displayedPosts"
            :key="i"
        >
          <a :href="`/blog/${post.slug}`" class="href">
            <div class="blog-card__image-wrapper">
              <img :src="getImageUrl(post.image)" alt="" class="blog-card__image" />
              <div class="blog-card__overlay"></div>
            </div>
            <small class="blog-card__date">{{ formatDate(post.date) }}</small>
            <h3 class="blog-card__title">{{ post.title }}</h3>
            <p class="blog-card__excerpt">{{ post.intro }}</p>
          </a>
        </div>
      </div>

      <Pagination
          v-if="isMain && isMobile"
          :current="currentIndex"
          :total="posts.length"
          @prev="() => { if (currentIndex > 0) currentIndex-- }"
          @next="() => { if (currentIndex < posts.length - 1) currentIndex++ }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Pagination from '~/components/elements/Pagination.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Блог',
  },
  isMain: Boolean,
  posts: Object,
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const isMobile = ref(false)
const currentIndex = ref(0)

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 480
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

const displayedPosts = computed(() => {
  if (props.isMain && isMobile.value) {
    return [props.posts[currentIndex.value]]
  }
  return props.isMain ? props.posts.slice(0, 4) : props.posts
})

function getImageUrl(image?: string): string {
  const publicHost = useRuntimeConfig().public.publicHost
  if (!image) return ''
  return `${publicHost}/uploads/${image}`
}
</script>

<style scoped>
.blog-card:hover h3 {
  color: var(--main-blue, #00A2F6);
}

.blog__container h2 {
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
  margin-bottom: 8px;
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
  margin-bottom: 8px;
  color: #555;
}

.blog-card__title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.blog-card__excerpt {
  font-size: 18px;
  color: #333;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .blog__grid {
    grid-template-columns: repeat(1, 1fr) !important;
  }
  .pagination{
     margin-top: 24px;
   }
}

@media (max-width: 800px) {
  .blog__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
