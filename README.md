# Spaced Repetition

![Spaced-repetition](https://github.com/cartodeveloper/spaced-repetition/blob/main/public/images/spaced-repetition-gif.gif?raw=true)

![s-p](https://github.com/cartodeveloper/spaced-repetition/blob/main/public/images/sp.png?raw=true)

## Full Stack App to help people memorize words in Spanish.

Spaced repetition is an evidence-based learning technique that is usually performed with flashcards.

The SR application assists users in learning multiple foreign languages by using this technique.

The word list is structured in the database using a linked list, with words in Spanish.

---

## 🔗[Live Link](https://spaced-repetition.cartodeveloper.vercel.app/)

## 🔗[API repo](https://github.com/cartodeveloper/spaced-repetition-api)

---

## 💻 Tech Stack

- ### Front-End :
  - React
  - React Router
  - CSS
  - Cypress.io
  - Jsx
- ### Back-end:
  - Node.
  - Express.
  - JWT.
  - Mocha&Chai.
  - Nodemon.
  - Supertest.
- ### Data Persistence:
  - PostgreSQL.
- ### Hosting:
  - Vercel.

---

## 📑API Documentation

| Method |        Path         |                                 Purpose |
| :----- | :-----------------: | --------------------------------------: |
| POST   |      /api/user      |                       User registration |
| POST   |      /api/auth      |               Manage user authorization |
| POST   |   /api/auth/toker   |           Validates username & password |
| GET    |    /api/language    | Get all the words the user is learning. |
| GET    | /api/language/head  |                      Get users guesses. |
| POST   | /api/language/guess |                  Records users guesses. |
