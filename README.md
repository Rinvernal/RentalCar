# 🚗 RentalCar App

**RentalCar** — це сучасний веб-додаток для перегляду, фільтрації та бронювання автомобілів.  
Зручний інтерфейс дозволяє користувачам швидко знаходити потрібні авто, додавати в обране, переглядати деталі та фільтрувати за різними критеріями.

---

## 🛠 Технології

- **React** + **Vite**
- **Redux Toolkit** (з `createSlice`, `createAsyncThunk`)
- **React Router DOM**
- **Axios**
- **LocalStorage**
- **CSS (custom)**

---

## 🚀 Функціональність

- Список автомобілів з пагінацією (`Load More`)
- Деталі кожного автомобіля
- Додавання/видалення авто з обраного
- Збереження обраного в LocalStorage
- Фільтрація по:
  - бренду
  - ціні
  - пробігу
- Обробка помилок та лоадінгів
- 404 сторінка (`NotFoundPage`)

---

## 📁 Структура проєкту

src/
  ├── assets/ # Статичні ресурси 
  ├── components/ # Повторно використовувані компоненти 
    ├── CarDetails/ 
    ├── FeedbackForm/ 
    ├── FilterBar/
    ├── Header/
    ├── ImageCard/
    ├── LoadMoreBtn/
    ├── NotFound/
  ├── img/
  ├── pages/ # Сторінки │ 
    ├── HomePage/
    ├── CatalogPage/ 
    └── CarDetailsPage/ 
  ├── redux/ # Redux логіка
    ├── cars/ 
      ├── carsSlice.js
      ├── carsThunks.js
      ├── carsSelectors.js  
    └── store.js 
  ├── App.jsx 
  └── App.css
  └── index.css
  └── main.jsx

## 🌐 API
Використовується публічне API від GOIT Car Rental 

https://car-rental-api.goit.global/api-docs/#/Cars/getOneCar

GET /cars — список авто з фільтрами

GET /brands — список брендів

GET /cars/:id — деталі автомобіля