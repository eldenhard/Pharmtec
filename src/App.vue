<template>
  <router-view />

  <!-- <AutorizationPage />
  <MainPage /> -->
</template>

<script>
import MainPage from './pages/mainpage/MainPage.vue';
import AutorizationPage from './pages/autorization/autorizationPage.vue';
import { onMounted } from 'vue'
import api from './api/user'

export default {
  components: { MainPage, AutorizationPage },
  setup() {
    // onMounted(() => {
    //   let token = {
    //     refresh: JSON.parse(localStorage.getItem('accessToken'))
    //   }
    //   fetch('http://10.0.1.11:8000/auth/token/refresh/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(token)
    //   }).then(response => {
    //     console.log(response)
    //     // localStorage.setItem('accessToken', response)
    //   })
    // })

    // api.refreshUserJWTToken(token)
    //   .then(response => {
    //     localStorage.setItem('accessToken', response)
    //   })
  // })

  // onMounted(() => {
  //   if (!localStorage.getItem('token')) {
  //     window.location.href = '/login'
  //   }
  // })
},
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
