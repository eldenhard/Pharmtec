import './styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';

const pinia = createPinia()

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// axios
import axiosPlugin from './helpers/axios'

// Notifications
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Select
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import { VueSelect } from "vue-select";
// Vue-router
import router from './router';

const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(axiosPlugin)
    .use(Toast, {
        position: "top-right",
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
    })
    .component("v-select", vSelect)
.mount('#app') 