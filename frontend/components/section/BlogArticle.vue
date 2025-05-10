<script setup lang="ts">

import { parseDocument } from 'htmlparser2'
import { DomUtils } from 'htmlparser2'
import { watch, ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'


const { article } = defineProps({
  article: Object,
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const publicHost = useRuntimeConfig().public.publicHost
const fullImageUrl = computed(() =>
    article?.image ? `${publicHost}${article.image}` : ''
)

function extractHeadings(html: string) {
  const doc = parseDocument(html)
  const headings: { id: string; level: string; text: string }[] = []

  const tags = ['h2', 'h3', 'h4']

  let index = 1
  DomUtils.findAll(el => {
    if (el.type === 'tag' && tags.includes(el.name) && el.children?.length) {
      const text = DomUtils.textContent(el).trim()
      const id = `section-${index++}`

      el.attribs = { ...el.attribs, id }

      headings.push({
        id,
        level: el.name,
        text,
      })
    }
    return false
  }, doc.children)

  const updatedHtml = DomUtils.getOuterHTML(doc)
  return { headings, updatedHtml }
}


const { headings, updatedHtml } = extractHeadings(article.content)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const yOffset = -200 // отступ сверху
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  })
}


function scrollToIfAnchorClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  // Найдём ближайшую ссылку
  const link = target.closest('a')
  if (!link) return

  const href = link.getAttribute('href')
  if (href && href.startsWith('#')) {
    event.preventDefault()

    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -200
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
}

onMounted(() => {
  const toc = document.querySelector('.article-toc')
  toc?.addEventListener('click', scrollToIfAnchorClick)
})

</script>
<template>
  <section class="blog-article container">
    <!-- Header -->
    <div class="article-header">
      <div class="article-header__image">
        <img :src="fullImageUrl" alt="Фото статьи" class="article-image" />
      </div>
      <div class="article-header__text">
        <p class="article-date">{{ formatDate(article.date) }}</p>
        <h1 class="article-title" v-html="article.title"></h1>
        <p class="article-intro">
          {{ article.intro }}
        </p>
        <div class="share-links">
          <span>Поделиться</span>
          <a href="#"><img src="/icon/tg-white.svg" alt="Telegram" /></a>
          <a href="#"><img src="/icon/vk-white.svg" alt="VK" /></a>
        </div>
      </div>

    </div>

    <!-- Content layout -->
    <div class="article-content">
      <aside class="article-toc">
        <h5>Содержание</h5>
        <ul>
          <li v-for="(item, index) in headings" :key="item.id">
            <a
                :href="`#${item.id}`">
              {{ index + 1 }}. {{ item.text }}
            </a>
          </li>
        </ul>
      </aside>


      <article class="article-body">
        <div ref="articleContent" v-html="updatedHtml">

        </div>

        <div class="article-footer">
          <a
              :href="article.prev?.slug || '#'"
              class="prev"
              :class="{ disabled: !article.prev }"
          >
            <img src="/icon/left-blue-arrow.svg" alt="">
            Предыдущая статья
          </a>

          <a
              :href="article.next?.slug || '#'"
              class="next"
              :class="{ disabled: !article.next }"
          >
            Следующая статья
            <img src="/icon/right-blue-arrow.svg" alt="">
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

.article-footer a.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 12px;
}

.article-intro {
  margin-top: 16px;
}

[id^="section-"], h2, h3, h4 {
  scroll-margin-top: 100px;
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
}

.article-header__image{
  max-height: 420px;
  display: flex;
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
  position: sticky;
  top: 100px;
  align-self: start;
  height: fit-content;
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
  color: #2C3E50;
  text-decoration: none;
}

.article-toc a:hover{
  color: var(--main-blue, #00A2F6);
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

.share-links a{
  width: 40px;
  height: 40px;
  background-color: #6700D1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
}

.share-links img{
  width: 20px;
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
