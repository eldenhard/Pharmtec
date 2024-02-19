import { createApp } from 'vue';
import axios from 'axios';

const config = {
    baseURL: 'http://10.0.1.11:8000/',
  };
  
  const _axios = axios.create(config);
  
  _axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('accessToken'));
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  _axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        console.log('Network error');
        // alert('Ошибка загрузки данных, проверьте своё интернет-соединение!');
      } else {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const token = tokenParse.auth.user.token;
          localStorage.setItem('accessToken', token);
        }
        return Promise.reject(error);
      }
    }
  );
  
  const install = (app) => {
    app.config.globalProperties.$axios = _axios;
    window.axios = _axios;
  };
  
  const plugin = { install };
  
  export const api = _axios;
  export default plugin;




