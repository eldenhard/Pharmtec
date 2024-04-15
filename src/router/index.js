import mainpage from '../pages/mainpage/MainPage.vue';
import autorizationpage from '../pages/autorization/autorizationPage.vue';
import about_company from '../pages/about_company/about_company.vue';
import productspage from '../pages/products/productsPage.vue';
import LkPage from '../pages/lk_page/LkPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import startPageNew from '../pages/new_start_page/startPageNew.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/about-company', component: about_company },
      { path: '/login', component: autorizationpage },
      { path: '/workspace', component: mainpage },
      { path: '/products', component: productspage },
      { path: '/lk', component: LkPage },
      {path: '/main', component: startPageNew}  
  ],
});

export default router;