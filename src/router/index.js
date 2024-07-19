import mainpage from "../pages/mainpage/MainPage.vue";
import autorizationpage from "../pages/autorization/autorizationPage.vue";
import about_company from "../pages/about_company/about_company.vue";
import productspage from "../pages/products/productsPage.vue";
import LkPage from "../pages/lk_page/LkPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import startPageNew from "../pages/new_start_page/startPageNew.vue";
import serviceRequests from "../pages/service_requests/serviceRequests.vue";
import create_limits from "../modules/all_staff/create_limits/create_limits.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/main", component: startPageNew },
    { path: "/about-company", component: about_company },
    { path: "/login", component: autorizationpage },
    {
      path: "/workspace",
      component: mainpage,
      children: [{ path: "create_limits", component: create_limits }],
    },
    { path: "/service_requests", component: serviceRequests },
    { path: "/products", component: productspage },
    { path: "/lk", component: LkPage },
  ],
});

export default router;
