import './styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { register } from 'swiper/element/bundle';
register();

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


// MArkdown
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import ruRU from '@kangc/v-md-editor/lib/lang/ru-RU';
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
  Prism,
});
VMdEditor.lang.use('ru-RU', ruRU);

import VueTheMask from 'vue-the-mask'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(axiosPlugin)
    .use(VMdEditor)
    .use(VueTheMask)
    .use(VCalendar, {})
    .use(VueTippy, {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      theme: 'material',
      defaultProps: {
        placement: 'auto-end',
        allowHTML: true,
      }, // => Global default options * see all props
      }
    
    )
    .use(Toast, {
        position: "top-right",
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
    })
    .component("v-select", vSelect)
.mount('#app') 