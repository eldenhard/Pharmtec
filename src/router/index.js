import mainpage from '../pages/mainpage/MainPage.vue';
import autorizationpage from '../pages/autorization/autorizationPage.vue';

const routes = [
  { path: '/', component: mainpage },
  { path: '/login', component: autorizationpage },
];

export default routes;