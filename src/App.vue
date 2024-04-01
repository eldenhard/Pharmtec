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
import { refreshToken } from './mixins/refreshToken';
import { useCurrentUserId } from '@/store/CurrentUserId'
export default {
  components: { MainPage, AutorizationPage, loaderComponent, Navbar },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      if(localStorage.getItem('accessToken')) {
        await refreshToken()   
      }
      const currentUserIdStore = useCurrentUserId()
      currentUserIdStore.setCurrentUserId()
      
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
