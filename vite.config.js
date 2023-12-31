import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteSassPlugin from 'vite-plugin-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        Vue(),
        ViteSassPlugin(),
      ],
})

// import { defineConfig } from 'vite'
// import Vue from '@vitejs/plugin-vue';
// import ViteSassPlugin from 'vite-plugin-sass';

// export default {
//   plugins: [
//     Vue(),
//     ViteSassPlugin(),
//   ],
// };