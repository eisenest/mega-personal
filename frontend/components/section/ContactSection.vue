<script setup lang="ts">

const apiBase = useRuntimeConfig().public.apiBase
const { data: contact } = await useFetch(`${apiBase}/api/contact`)
</script>

<template>
  <section v-if="contact" class="contacts-section container">
    <h2 class="contacts-title">Контакты</h2>
    <div class="contacts-wrapper">
      <div class="map">
        <iframe :src="contact.mapEmbedUrl" width="100%" height="100%" frameborder="0"></iframe>
      </div>
      <div class="contact-info">
        <a :href="`mailto:${contact.email}`" class="email">{{ contact.email }}</a>

        <div class="info-item">
          <strong>Адрес</strong>
          <p>{{ contact.address }}</p>
        </div>

        <div class="info-item">
          <strong>Отдел развития</strong>
          <p>{{ contact.devPhone }}</p>
        </div>

        <div class="info-item">
          <strong>Ресепшен</strong>
          <p>{{ contact.receptionPhone }}</p>
        </div>

        <div class="info-item">
          <strong>Для соискателей</strong>
          <p>{{ contact.applicantPhone }}</p>
        </div>

        <div class="info-item">
          <strong>Время работы</strong>
          <p>{{ contact.workingHours }}</p>
        </div>

        <div class="info-item small legal">
          <p v-html="contact.legalInfo" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 100px;
}

.legal{
  white-space: pre-line;
}

.contacts-title {
  font-size: clamp(28px, 6vw, 42px);
  font-weight: 700;
  margin: 0;
}

.contacts-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  gap: 24px;
}

.map {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
}

.map iframe {
  filter: grayscale(100%);
}

.contact-info {
  border-radius: 24px;
  background: white;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
}

.email {
  color: #3795f4;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  margin-bottom: 8px;
}

.info-item strong {
  display: block;
  font-weight: 700;
  margin-bottom: 4px;
}

.info-item.small p {
  font-size: 13px;
  line-height: 1.4;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .contacts-wrapper {
    grid-template-columns: 1fr;
  }
  .map {
    height: 300px;
  }
}


</style>
