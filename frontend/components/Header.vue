<template>
  <header class="header">
    <div class="header__container">
      <!-- Логотип -->
      <NuxtLink to="/" class="logo-link" @click="isMenuOpen = false">
        <img src="/logo.svg" alt="Mega Personal" class="logo" />
      </NuxtLink>

      <!-- Бургер и навигация -->
      <button class="burger" @click="isMenuOpen = !isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="['nav', { open: isMenuOpen }]">
        <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.href"
            class="nav-link"
            :class="{
    active: route.path === item.href,
    disabled: item.disabled
  }"
            @click="isMenuOpen = false"
            :tabindex="item.disabled ? -1 : 0"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Правый блок -->
      <div class="actions">
        <a href="#" class="login">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38028 9.35323C9.07627 10.8028 10.0251 12.1615 11.2266 13.3631C12.4282 14.5646 13.7869 15.5134 15.2365 16.2094C15.3612 16.2693 15.4235 16.2992 15.5024 16.3222C15.7828 16.404 16.127 16.3453 16.3644 16.1752C16.4313 16.1274 16.4884 16.0702 16.6027 15.9559C16.9523 15.6063 17.1271 15.4315 17.3029 15.3172C17.9658 14.8862 18.8204 14.8862 19.4833 15.3172C19.6591 15.4315 19.8339 15.6063 20.1835 15.9559L20.3783 16.1508C20.9098 16.6822 21.1755 16.948 21.3198 17.2333C21.6069 17.8009 21.6069 18.4712 21.3198 19.0387C21.1755 19.3241 20.9098 19.5898 20.3783 20.1213L20.2207 20.2789C19.6911 20.8085 19.4263 21.0733 19.0662 21.2756C18.6667 21.5 18.0462 21.6614 17.588 21.66C17.1751 21.6588 16.8928 21.5787 16.3284 21.4185C13.295 20.5575 10.4326 18.933 8.04466 16.545C5.65668 14.1571 4.03221 11.2947 3.17124 8.26131C3.01103 7.69687 2.93092 7.41464 2.9297 7.0017C2.92833 6.54347 3.08969 5.92298 3.31411 5.52348C3.51636 5.16345 3.78117 4.89863 4.3108 4.36901L4.46843 4.21138C4.99987 3.67993 5.2656 3.41421 5.55098 3.26987C6.11854 2.9828 6.7888 2.9828 7.35636 3.26987C7.64174 3.41421 7.90747 3.67993 8.43891 4.21138L8.63378 4.40625C8.98338 4.75585 9.15819 4.93065 9.27247 5.10643C9.70347 5.76932 9.70347 6.6239 9.27247 7.28679C9.15819 7.46257 8.98338 7.63738 8.63378 7.98698C8.51947 8.10129 8.46231 8.15845 8.41447 8.22526C8.24446 8.46269 8.18576 8.80695 8.26748 9.0873C8.29048 9.1662 8.32041 9.22854 8.38028 9.35323Z" stroke="#6700D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Вход
        </a>
        <button @click="handleClick" class="cta-button">Оставить заявку</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

// Получаем функцию из layout
const openPopupForm = inject('openPopupForm')

function handleClick() {
  openPopupForm(0) // Можно передать таб
}


const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { label: 'О компании', href: '/about' },
  { label: 'Аутсорсинг', href: '#', disabled: true },
  { label: 'Рекрутмент', href: '/recruitment' },
  { label: 'Предоставление персонала', href: '#', disabled: true },
  { label: 'Соискателям', href: '#', disabled: true },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '#', disabled: true }
]

</script>

<style scoped>
.header {
  border-radius: 0 0 32px 32px;
  z-index: 20;
  padding: 2.5rem 4.5rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.header__container {
  margin: 0 auto;
  padding: 21px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //gap: 32px;
  flex-wrap: wrap;
  border-radius: 24px;
  background: var(--white, #FFF);
}

.logo {
  height: 40px;
  z-index: 30;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 30;
}

.burger span {
  display: block;
  height: 2px;
  background: #2b3645;
  border-radius: 2px;
}

.nav {
  display: flex;
  gap: 24px;
  flex-grow: 1;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav a {
  color: #2b3645;
  text-decoration: none;
  white-space: nowrap;
}

.actions {
  display: flex;
  align-items: center;
  gap: 24px;
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

.icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.nav-link.active {
  font-weight: 700;
  color: #5c1ce0;
  position: relative;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #5c1ce0;
  border-radius: 2px;
}

.nav-link.disabled {
  pointer-events: none;
  opacity: 0.4;
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
}
</style>
