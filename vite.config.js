import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteSassPlugin from 'vite-plugin-sass';
import { fileURLToPath, URL } from 'url';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        Vue(),
        ViteSassPlugin(),
      ],
      resolve: {
        alias: [
          { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },        
        ],
      },
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