# 🚀 Mega-Personal

---

## 📦 Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/your-org/mega-personal.git
cd mega-personal
```

### 2. Создать файл `.env`

Создайте `.env` в корне проекта и добавьте в него переменные окружения (см. раздел ниже).

### 3. Запустить Docker

```bash
docker compose up --build
```

### 4. Доступы

* 🔗 Фронтенд: [http://localhost:3000](http://localhost:3000)
* 🔗 Бэкенд / AdminJS: [http://localhost:5050](http://localhost:5050)

---

## 🔐 Переменные окружения (`.env`)

```env
# Общие
NODE_ENV=development

# Бэкенд /.env
PORT=5050
MONGO_URI=mongodb://mongo:27017/megapersonal
NODE_ENV=development
COOKIE_SECRET=d4b52b688cba8638a121362ea1ded704a8bc2d93ea802d8687f0956950ad3e4f

# Фронтенд /frontend/.env
NODE_ENV=development
PORT=3000
```

---

## 🧠 Бэкап и восстановление MongoDB

### 📤 Создание бэкапа

```bash
docker exec mega-mongo mongodump \
  --username=mega-root-admin-personal \
  --password=sEcV55Od_G \
  --authenticationDatabase=megapersonal \
  --db=megapersonal \
  --archive=/data/backup/megapersonal.archive
```

Скопируйте архив:

```bash
docker cp mega-mongo:/data/backup/megapersonal.archive ./backup/megapersonal.archive
```

### 👤 Создание пользователя MongoDB

Перед восстановлением БД необходимо создать пользователя БД. Скрипт `init-mongo.js` находится в корне проекта. Запустить его можно так:

```bash
docker cp init-mongo.js mega-mongo:/init-mongo.js

docker exec -it mega-mongo mongosh /init-mongo.js
```

### 📥 Восстановление из бэкапа

```bash
docker exec -i mega-mongo mongorestore \
  --username=mega-root-admin-personal \
  --password=sEcV55Od_G \
  --authenticationDatabase=megapersonal \
  --archive < mongo-backup3.archive
```

---

## 👨‍💼 Доступ к AdminJS

* URL: [http://localhost:5050/admin](http://localhost:5050/admin)
* Email / password — из `.env` (`admin@example.com`, `admin`)

---

## 🚀 Деплой в продакшн 

1. Обновите `.env`:

```env
NODE_ENV=production
API_BASE_URL=https://your-production-api-url.com
NUXT_PUBLIC_PUBLIC_HOST=http://89.169.2.131:5050
```

2. Запустите:

```bash
docker compose up -d --build 
```

---

## ✅ Статус проекта

Проект завершён и готов к передаче. В репозитории присутствуют:

* фронтенд / бэкенд / admin
* Docker конфиги
* инструкция `README.md`
* бэкап MongoDB

---
