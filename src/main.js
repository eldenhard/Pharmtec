import './styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// axios
import axiosPlugin from './helpers/axios'

// Vue-router
import router from './router';

const app = createApp(App)
    .use(router)
    .use(axiosPlugin)
    .mount('#app') 