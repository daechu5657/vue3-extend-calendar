import { createApp } from 'vue';
import './style.css';
// @ts-ignore
import App from './App.vue';

// import vue3ExtendCalendar from 'vue3-extend-calendar';
// import vue3ExtendCalendar from '../dist/vue3-extend-calendar';
// import 'vue3-extend-calendar/dist/style.css';
// app.use(vue3ExtendCalendar);

const app = createApp(App);

app.mount('#app');
