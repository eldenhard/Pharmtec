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
import { onMounted, onBeforeMount, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import api from './api/user'
import loaderComponent from './ui/loader/loaderComponent.vue';
import Navbar from './components/navbar/navbar.vue';
import { refreshToken } from './mixins/refreshToken';

import { useCurrentUserId } from '@/store/CurrentUserId'
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
export default {
  components: { MainPage, AutorizationPage, loaderComponent, Navbar },

  setup() {
    const route = useRoute()
    const $current_user_id_store = useCurrentUserId()
    const $balanceItemsStore = useBalanceItemsStore()
    // Время бездействия в миллисекундах (3 часа = 10800 секунд)
    const INACTIVITY_LIMIT = 10800 * 1000 // 3 часа в миллисекундах

    let inactivityTimer

    const router = useRouter()

    // Функция выхода
    const logout = () => {
      // Очистка токенов
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('id')

      // Перенаправление на страницу входа
      router.push('/login')
    }

    // Функция сброса таймера
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(logout, INACTIVITY_LIMIT)
    }

    // Функция для обработки активности пользователя
    const handleUserActivity = () => {
      resetInactivityTimer()
    }
    onMounted(async () => {
      if (localStorage.getItem('accessToken')) {
        await refreshToken()
      }
      router.push("/main")
      $balanceItemsStore.getAllBalanceItems()
      $current_user_id_store.setCurrentUserId()
      // Устанавливаем таймер неактивности при монтировании компонента
      resetInactivityTimer()

      // Добавляем слушатели событий активности пользователя
      window.addEventListener('mousemove', handleUserActivity)
      window.addEventListener('keydown', handleUserActivity)
      window.addEventListener('click', handleUserActivity)
      window.addEventListener('scroll', handleUserActivity)
    })

    onUnmounted(() => {
      // Удаляем слушатели событий и таймер при размонтировании компонента
      clearTimeout(inactivityTimer)
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('keydown', handleUserActivity)
      window.removeEventListener('click', handleUserActivity)
      window.removeEventListener('scroll', handleUserActivity)
    })
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
