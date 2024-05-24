# Quiz Room System

Welcome to the Quiz Room System, an interactive platform inspired by the dynamics of Kahoot. This system is designed for educational environments where admins can create and manage quizzes, and students can join and participate in these quizzes in real-time through a unique room code.

## Features

- **Admin Dashboard**: Admins have the ability to set up quiz questions and define their correct answers through a comprehensive dashboard. This includes support for multiple question types such as multiple-choice, true/false, and short answer.

- **Student Access**: Students can enter a quiz room by typing in a unique code provided by their instructor. Once inside, they can participate in the quiz, answer questions, and view their scores in real time.

- **Real-Time Interaction**: The platform supports real-time interactions, making the quiz experience engaging and competitive. Students can see live updates of their standings and get immediate feedback on their answers.

- **Ease of Use**: Designed with a simple and intuitive interface, ensuring that both admins and students can navigate through the system effortlessly.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

##### The configuration file of Tailwind CSS was generated using this
```
npx tailwindcss init -p
```

If you found any tailwind css postcss auto prefixer problem, try this:
```
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
