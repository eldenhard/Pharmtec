import './styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Vue-router
import router from './router';

const app = createApp(App)
    .use(router)
    .mount('#app') 