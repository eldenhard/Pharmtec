import mainpage from '../pages/mainpage/MainPage.vue';
import autorizationpage from '../pages/autorization/autorizationPage.vue';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', component: mainpage },
      { path: '/login', component: autorizationpage },
   
  ],
});

export default router;