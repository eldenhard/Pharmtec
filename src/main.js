import './styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Vue-router
import { createRouter, createWebHistory } from 'vue-router';
// import routes from './src/router'
import mainpage from './pages/mainpage/MainPage.vue';
import autorizationpage from './pages/autorization/autorizationPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: mainpage },
        { path: '/login', component: autorizationpage },
    ],
});

const app = createApp(App)
    .use(router)
    .mount('#app') 