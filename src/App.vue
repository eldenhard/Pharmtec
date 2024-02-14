<template>
  <div>
    <!-- показать компонент navbar везде кроме страницы autorization -->
    <Navbar v-if="route.path !== '/login'" />
    <router-view v-slot="{ Component }">
      <transition name="moveUp">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
    <loaderComponent />
  </div>

  <!-- <AutorizationPage />
  <MainPage /> -->
</template>

<script>
import MainPage from './pages/mainpage/MainPage.vue';
import AutorizationPage from './pages/autorization/autorizationPage.vue';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import api from './api/user'
import loaderComponent from './ui/loader/loaderComponent.vue';
import Navbar from './components/navbar/navbar.vue';
export default {
  components: { MainPage, AutorizationPage, loaderComponent, Navbar },
  setup() {
    const route = useRoute()
    onMounted(() => {
      // let token = {
      //   refresh: JSON.parse(localStorage.getItem('accessToken'))
      // }
      // fetch('http://10.0.1.11:8000/auth/token/refresh/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(token)
      // }).then(response => {
      //   console.log(response)
      //   // localStorage.setItem('accessToken', response)
      // })
    })

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
    return {
      route
    }
  },

};
</script>

<style scoped>
.moveUp-enter-active,
.moveUp-leave-active {
  transition: opacity 0.5s;
}

.moveUp-enter-from,
.moveUp-leave-to {
  opacity: 0;
}


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
