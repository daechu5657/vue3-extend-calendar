import vue3ExtendCalendar from '../dist/vue3-extend-calendar.vue';
import '../dist/style.css';

export default {
  install: (app: any, options: any) => {
    app.component('vue3-extend-calendar', vue3ExtendCalendar);
  },
};
