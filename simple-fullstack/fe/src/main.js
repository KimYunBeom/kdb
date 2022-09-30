import { createApp } from 'vue';
import App from './App.vue';

import './assets/css/tailwindcss.css'; // tailwindcss
import router from './router'; // vue-router

const app = createApp(App);
app.use(router);
app.mount('#app');
