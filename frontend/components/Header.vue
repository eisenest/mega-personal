<template>
  <header class="header">
    <div class="header__container">
      <!-- Логотип -->
      <a href="/" class="logo-link" @click="isMenuOpen = false">
        <img src="/logo.svg" alt="Mega Personal" class="logo" />
      </a>

      <!-- Бургер и навигация -->
      <button class="burger" @click="isMenuOpen = !isMenuOpen">
        <img src="/icon/burger.svg" alt="">
      </button>

      <nav :class="['nav', { open: isMenuOpen }]">
        <div
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-link-wrapper"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
        >
          <a
              :href="item.href"
              class="nav-link"
              :class="{
              active: route.path === item.href,
              disabled: item.disabled,
              'has-children': item.children && item.children.length > 0
            }"
              :tabindex="item.disabled ? -1 : 0"
              @click="isMenuOpen = false"
          >
            {{ item.label }}
          </a>
          <div v-if="item.children && hoveredIndex === index" class="submenu">
            <a
                v-for="(child, cIdx) in item.children"
                :key="cIdx"
                :href="child.href"
                class="submenu-link"
                @click="isMenuOpen = false"
            >
              {{ child.label }}
            </a>
          </div>
        </div>
      </nav>

      <div class="mobile-menu" v-if="isMenuOpen">
        <div class="mobile-menu__header">
          <a href="/" class="logo-link">
            <img src="/logo.svg" alt="Mega Personal" class="logo" />
          </a>
          <button class="mobile-close" @click="isMenuOpen = false">
            <img src="/icon/close-burger.svg" alt="">
          </button>
        </div>

        <div class="mobile-menu__inner">
          <!-- Основное меню -->
          <div class="mobile-menu__links">
            <div
              v-for="(item, index) in navItems"
              :key="'mobile-' + index"
              class="mobile-link-group"
          >
            <div class="mobile-link-row">
              <a
                  :href="item.href"
                  class="mobile-link"
                  @click="isMenuOpen = false"
              >
                {{ item.label }}
              </a>
              <button
                  v-if="item.children && item.children.length"
                  class="submenu-toggle"
                  @click.prevent="openSubIndex = openSubIndex === index ? null : index"
                  :class="{ rotated: openSubIndex === index }"
              ></button>
            </div>

            <div
                v-if="item.children && item.children.length && openSubIndex === index"
                class="mobile-submenu"
            >
              <a
                  v-for="(child, cIdx) in item.children"
                  :key="'mobile-child-' + cIdx"
                  :href="child.href"
                  class="mobile-sublink"
                  @click="isMenuOpen = false"
              >
                {{ child.label }}
              </a>
            </div>
          </div>
          </div>

          <!-- Телефон и вход -->
          <div class="mobile-contacts">
            <a href="tel:+79151724404" class="mobile-phone">
              <span>+7 (915) 172-44-04</span>
            </a>
            <a href="https://mega-personal.ru/#/ui/index" target="_blank" class="mobile-login">Вход</a>
          </div>

          <button @click="handleClick" class="mobile-cta">Оставить заявку</button>
        </div>
      </div>

      <!-- Правый блок -->
      <div class="actions">
        <a href="tel:+79151724404" class="desktop-phone">
          <svg class="phone-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38028 9.35323C9.07627 10.8028 10.0251 12.1615 11.2266 13.3631C12.4282 14.5646 13.7869 15.5134 15.2365 16.2094C15.3612 16.2693 15.4235 16.2992 15.5024 16.3222C15.7828 16.404 16.127 16.3453 16.3644 16.1752C16.4313 16.1274 16.4884 16.0702 16.6027 15.9559C16.9523 15.6063 17.1271 15.4315 17.3029 15.3172C17.9658 14.8862 18.8204 14.8862 19.4833 15.3172C19.6591 15.4315 19.8339 15.6063 20.1835 15.9559L20.3783 16.1508C20.9098 16.6822 21.1755 16.948 21.3198 17.2333C21.6069 17.8009 21.6069 18.4712 21.3198 19.0387C21.1755 19.3241 20.9098 19.5898 20.3783 20.1213L20.2207 20.2789C19.6911 20.8085 19.4263 21.0733 19.0662 21.2756C18.6667 21.5 18.0462 21.6614 17.588 21.66C17.1751 21.6588 16.8928 21.5787 16.3284 21.4185C13.295 20.5575 10.4326 18.933 8.04466 16.545C5.65668 14.1571 4.03221 11.2947 3.17124 8.26131C3.01103 7.69687 2.93092 7.41464 2.9297 7.0017C2.92833 6.54347 3.08969 5.92298 3.31411 5.52348C3.51636 5.16345 3.78117 4.89863 4.3108 4.36901L4.46843 4.21138C4.99987 3.67993 5.2656 3.41421 5.55098 3.26987C6.11854 2.9828 6.7888 2.9828 7.35636 3.26987C7.64174 3.41421 7.90747 3.67993 8.43891 4.21138L8.63378 4.40625C8.98338 4.75585 9.15819 4.93065 9.27247 5.10643C9.70347 5.76932 9.70347 6.6239 9.27247 7.28679C9.15819 7.46257 8.98338 7.63738 8.63378 7.98698C8.51947 8.10129 8.46231 8.15845 8.41447 8.22526C8.24446 8.46269 8.18576 8.80695 8.26748 9.0873C8.29048 9.1662 8.32041 9.22854 8.38028 9.35323Z" stroke="#6700D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://mega-personal.ru/#/ui/index" target="_blank" class="login">Вход</a>
        <button @click="handleClick" class="cta-button">Оставить заявку</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const openPopupForm = inject('openPopupForm')
function handleClick() {
  openPopupForm(0)
}

const route = useRoute()
const isMenuOpen = ref(false)
const hoveredIndex = ref(null)
const navItems = ref([])
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: services } = await useFetch(`${apiBase}/api/service-categories`)

const dropdownItems = services.value
    .filter(cat => cat.showPage) // ← добавлено условие
    .map(cat => ({
      label: cat.title,
      href: `/category/${cat.slug}`,
      children: (cat.services || []).map(s => ({
        label: s.title,
        href: `/services/${s.slug}`
      }))
    }))

const baseItems = [
  { label: 'О компании', href: '/o-kompanii' },
  { label: 'Аутсорсинг', href: '/services/autsorsing' },
  { label: 'Соискателям', href: '/category/soiskatelyam', children: [
      { label: "Вакансии", href: '/vakansii' },
      { label: "Партнерская программа", href: '/partnerskaya-programma' },
    ] },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/kontakty'}
]

  navItems.value = [
    baseItems[0],
    baseItems[1],
    ...dropdownItems,
    ...baseItems.slice(2)
  ]

const openSubIndex = ref(null);

</script>

<style scoped>
.header {
  border-radius: 0 0 32px 32px;
  z-index: 20;
  padding: 2.0rem 4.5rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  max-width: 1680px;
  justify-self: anchor-center;
}

.header__container {
  margin: 0 auto;
  padding: 21px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 24px;
  background: var(--white, #FFF);
  box-shadow: 0px 1px 24px 0px rgba(0, 150, 202, 0.14);
}

.logo {
  height: 40px;
  z-index: 30;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 30;
  padding: 0;
}

.burger span {
  display: block;
  height: 2px;
  background: #2b3645;
  border-radius: 2px;
}

.nav {
  display: flex;
  gap: 16px;
  flex-grow: 1;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-link-wrapper {
  position: relative;
}

.nav-link {
  color: #2b3645;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
}

.nav-link.has-children::after {
  content: url("/dropdown.svg");
  margin-left: 4px;
  color: inherit;
  display: inline-block;
  vertical-align: text-top;
  height: 1em;
  width: auto;
}

.submenu {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 100;
}

.submenu-link {
  display: block;
  padding: 16px 24px;
  white-space: nowrap;
  color: #2b3645;
  text-decoration: none;
}

/* Первый элемент */
.submenu-link:first-of-type {
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

/* Последний элемент */
.submenu-link:last-of-type {
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}

.submenu-link:hover {
  background: #f5f5f5;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 30;
}

.login {
  color: #5c1ce0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 24px;
  text-decoration: none;
}

.phone-icon:hover path {
  stroke: #00A2F6;
}

.cta-button {
  background: #5c1ce0;
  color: #fff;
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 45px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cta-button:hover {
  background: #4712b8;
}

.nav-link.active {
  font-weight: 700;
  color: #5c1ce0;
  position: relative;
}

.nav-link.disabled {
  pointer-events: none;
  opacity: 0.4;
}


.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
  padding: 36px 2rem 2.3rem;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 24px 24px;
}

.mobile-menu__links {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 24px;
}

.mobile-close {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  color: #2b3645;
  padding: 0;
}

.mobile-menu__inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 2rem;
}

.mobile-link-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-link-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-link {
  font-size: 18px;
  color: #2b3645;
  text-decoration: none;
  font-weight: 500;
}

.submenu-toggle:after{
  color: inherit;
  content: url("/dropdown.svg");
  display: inline-block;
  height: 1em;
  margin-left: 4px;
  vertical-align: text-top;
  width: auto;
}

.submenu-toggle {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2b3645;
  transition: transform 0.3s ease;
}

.submenu-toggle.rotated {
  display: inline-block;
  transform: rotate(180deg);
}

.mobile-submenu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 1rem;
}

.mobile-sublink {
  font-size: 16px;
  color: #2b3645;
  text-decoration: none;
  opacity: 0.85;
}

.mobile-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.mobile-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5c1ce0;
  font-weight: 600;
  text-decoration: none;
}

.mobile-phone::before{
  content: url("/icon/phone-mobile.svg");
}

.mobile-login {
  color: #5c1ce0;
  font-weight: 600;
  text-decoration: none;
  margin-top: 8px;
}

.mobile-cta {
  background: #5c1ce0;
  color: #fff;
  font-weight: 600;
  padding: 16px;
  border-radius: 45px;
  border: none;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
}


.desktop-phone{
  display: flex;
}

/* Mobile First (по умолчанию стили для мобилок) */

/* ≥ 480px — Мелкие устройства (например, большие телефоны) */
@media (max-width: 768px) {
  .header {
    width: 100vw;              /* Растягиваем строго на ширину экрана */
    max-width: none;           /* Убираем ограничение */
    padding: 1.5rem 1rem 2rem; /* Умеренные отступы */
    box-sizing: border-box;    /* Чтобы паддинги входили в ширину */
    left: 0;
    right: 0;
  }

  .header__container {
    padding: 1.5rem 1rem;                /* Или минимальный отступ */
    width: 100%;
    box-sizing: border-box;
    height: 56px;
    border-radius: 16px;
  }

}

@media (min-width: 1024px) and (max-width: 1440px){
  .cta-button{
    padding: 7px 14px;
    font-size: 12px;
  }

  .header__container{
    justify-content: center;
  }

  .nav{
    gap: 10px;
  }

  .actions{
    gap: 5px;
  }

}


@media (min-width: 768px) and (max-width: 1024px) {
  .header {
    max-width: 768px;           /* Растягиваем строго на ширину экрана */
  }

  .header__container {
    padding: 1.5rem 1rem;                /* Или минимальный отступ */
    height: 56px;
    border-radius: 16px;
  }

}

@media (min-width: 1024px) and (max-width: 1280px){
 .nav-link, .login{
   font-size: 12px;
   display: flex;
 }
}


@media (max-width: 1024px) {
  .burger {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f3f9ff;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
  }

  .nav.open {
    max-height: 500px;
    opacity: 1;
  }

  .header__container {
    flex-wrap: nowrap;
  }

  .actions {
    display: none;
  }
}


</style>
