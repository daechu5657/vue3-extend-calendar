import '../dist/style.css';
import vue3ExtendCalendar from './vue3-extend-calendar.vue';

export default {
  install: (App: any, options: any) => {
    App.component('vue3-extend-calendar', vue3ExtendCalendar);
  },
};
