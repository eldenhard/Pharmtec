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

    <div class="footer_start_page"  v-if="route.path !== '/login'" >
        <div class="content">
            <div class="copyright">
                <p>© ООО «Фармтек», {{ new Date().getFullYear() }}</p>
            </div>
            <div class="email_block">
                <a href="mailto:info@pharmtec.ru">info@pharmtec.ru</a>
                <svg class="dynamic-svg-line" height="20"  width="15" viewBox="0 0 2 65" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V65" stroke="white" />
                </svg>
                <a href="mailto:info@intelbio.org">info@intelbio.org</a>
            </div>
            <div class="social_net">
                <!-- яндекс дзен -->
                 <a href="https://dzen.ru/skinacademy" target="_blank">
                    <svg width="2.5vw" height="2.5vh" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.4375 0C1.53902 0 0 1.53902 0 3.4375V18.5625C0 20.461 1.53902 22 3.4375 22H18.5625C20.461 22 22 20.461 22 18.5625V3.4375C22 1.53902 20.461 0 18.5625 0H3.4375ZM11.0589 16.5C11.1336 14.0643 11.1964 12.9525 12.0607 12.0607C12.9525 11.1964 14.0643 11.1375 16.5 11.0589C16.5 13.255 16.4921 14.8971 15.7064 15.7064C14.8971 16.4921 13.3296 16.5 11.0589 16.5ZM6.29357 15.7064C5.50786 14.8971 5.5 13.255 5.5 11.0589C7.93571 11.1336 9.0475 11.1964 9.93929 12.0607C10.8036 12.9525 10.8625 14.0643 10.9411 16.5C8.67036 16.5 7.10286 16.4921 6.29357 15.7064ZM6.29357 6.29357C7.10286 5.50786 8.67429 5.5 10.9411 5.5C10.8664 7.93571 10.8036 9.0475 9.93929 9.93929C9.0475 10.8036 7.93571 10.8625 5.5 10.9411C5.5 8.745 5.50786 7.10286 6.29357 6.29357ZM11.0589 5.5C11.1336 7.93571 11.1964 9.0475 12.0607 9.93929C12.9525 10.8036 14.0643 10.8625 16.5 10.9411C16.5 8.745 16.4921 7.10286 15.7064 6.29357C14.8971 5.50786 13.3296 5.5 11.0589 5.5Z"
                            fill="white" />
                    </svg>
                </a>
                <!-- ютюб -->
                <a href="https://youtube.com/@pharmtec_?si=1UTxOA3688l1CzmA" target="_blank">
                <svg width="2.5vw" height="2.5vh" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7875 11L9.9 9.35V12.65L12.7875 11Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0 3.4375C0 1.53902 1.53902 0 3.4375 0H18.5625C20.461 0 22 1.53902 22 3.4375V18.5625C22 20.461 20.461 22 18.5625 22H3.4375C1.53902 22 0 20.461 0 18.5625V3.4375ZM15.2625 7.35625C15.7438 7.49375 16.0875 7.8375 16.225 8.31875C16.5 9.2125 16.5 11 16.5 11C16.5 11 16.5 12.7875 16.2938 13.6813C16.1563 14.1625 15.8125 14.5063 15.3312 14.6438C14.4375 14.85 11 14.85 11 14.85C11 14.85 7.49375 14.85 6.66875 14.6438C6.1875 14.5063 5.84375 14.1625 5.70625 13.6813C5.5 12.7875 5.5 11 5.5 11C5.5 11 5.5 9.2125 5.6375 8.31875C5.775 7.8375 6.11875 7.49375 6.6 7.35625C7.49375 7.15 10.9312 7.15 10.9312 7.15C10.9312 7.15 14.4375 7.15 15.2625 7.35625Z"
                        fill="white" />
                </svg>
            </a>
                <!-- телеграм -->
                <a href="https://t.me/skinacademy_pharmtec" target="_blank">
                <svg width="2.5vw" height="2.5vh" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.4375 0H18.5625C20.461 0 22 1.53902 22 3.4375V18.5625C22 20.461 20.461 22 18.5625 22H3.4375C1.53902 22 0 20.461 0 18.5625V3.4375C0 1.53902 1.53902 0 3.4375 0ZM11.4756 8.25507C10.4905 8.66484 8.52148 9.51297 5.56869 10.7995C5.08921 10.9901 4.83803 11.1767 4.81516 11.3591C4.77652 11.6673 5.16254 11.7887 5.68819 11.954C5.7597 11.9765 5.83378 11.9998 5.90974 12.0245C6.4269 12.1926 7.12258 12.3892 7.48423 12.397C7.81229 12.4041 8.17844 12.2689 8.58267 11.9913C11.3416 10.129 12.7657 9.18768 12.8551 9.16738C12.9182 9.15307 13.0056 9.13507 13.0648 9.18771C13.124 9.24035 13.1182 9.34004 13.112 9.36678C13.0737 9.52981 11.5585 10.9385 10.7743 11.6675C10.5298 11.8948 10.3564 12.056 10.321 12.0928C10.2416 12.1753 10.1607 12.2533 10.0829 12.3283C9.60242 12.7915 9.24213 13.1388 10.1028 13.706C10.5165 13.9786 10.8474 14.204 11.1776 14.4288C11.5382 14.6744 11.8979 14.9193 12.3633 15.2244C12.4818 15.3021 12.5951 15.3828 12.7053 15.4615C13.125 15.7606 13.502 16.0294 13.9678 15.9866C14.2385 15.9617 14.5181 15.7072 14.6601 14.9481C14.9956 13.1543 15.6552 9.26756 15.8076 7.66594C15.821 7.52562 15.8042 7.34604 15.7907 7.2672C15.7772 7.18837 15.749 7.07605 15.6465 6.9929C15.5252 6.89443 15.3378 6.87366 15.254 6.87506C14.8731 6.88185 14.2886 7.08509 11.4756 8.25507Z"
                        fill="white" />
                </svg>
            </a>
                <!-- вк -->
                <a href="https://vk.com/pharmtec" target="_blank">
                <svg width="2.5vw" height="2.5vh" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.50391 0C2.74248 0 0.503906 2.23858 0.503906 5V17C0.503906 19.7614 2.74248 22 5.50391 22H17.5039C20.2653 22 22.5039 19.7614 22.5039 17V5C22.5039 2.23858 20.2653 0 17.5039 0H5.50391ZM5.31641 7.56855C5.41531 12.2913 7.82602 15.125 12.054 15.125H12.0602H12.3013V12.4245C13.8528 12.5759 15.0273 13.69 15.497 15.125H17.6914C17.4663 14.3096 17.0674 13.5502 16.5208 12.8968C15.9742 12.2435 15.2924 11.7111 14.5204 11.3347C15.2122 10.922 15.8096 10.374 16.2755 9.72501C16.7413 9.07597 17.0655 8.3398 17.2278 7.5625H15.2374C14.8047 9.0641 13.519 10.4264 12.3013 10.5536V7.56855H10.3047V12.7999C9.06847 12.4972 7.51077 11.0319 7.44278 7.56855H5.31641Z"
                        fill="white" />
                </svg>
            </a>
            </div>
        </div>
    </div>


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
import footer from './pages/new_start_page/components/footer.vue';
import { useCurrentUserId } from '@/store/CurrentUserId'
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
import { useGetAllUsers } from '@/store/AllUsers'
export default {
  components: { MainPage, AutorizationPage, loaderComponent, Navbar, footer },

  setup() {
    const route = useRoute()
    const $current_user_id_store = useCurrentUserId()
    const $balanceItemsStore = useBalanceItemsStore()
    const $allUsers = useGetAllUsers()
    // Время бездействия в миллисекундах (3 часа = 10800 секунд)
    const INACTIVITY_LIMIT = 10800 * 1000 // 3 часа в миллисекундах
    let inactivityTimer
    const router = useRouter()

    // Функция выхода
    const logout = () => {
      // Очистка токенов
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('refreshToken')
      // localStorage.removeItem('id')

      // // Перенаправление на страницу входа
      // router.push('/login')
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
      } else {
        logout()
        return
      }
     
      router.push("/main")
      $balanceItemsStore.getAllBalanceItems()
      $current_user_id_store.setCurrentUserId()
      $allUsers.getAllUsers()
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
.footer_start_page {
    background: rgb(76, 192, 104);
    background: linear-gradient(66deg, rgba(76, 192, 104, 1) 0%, rgba(0, 95, 152, 1) 39%);
    min-height: 16vh;
    height: auto;
    width: 100%;
    margin-top: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
@media screen and (max-width: 950px) {
    .content{
        display: flex;
        flex-direction: column;
    }
    .copyright{
        margin-top: 8%;
    }
    .social_net{
        display: flex;
        justify-content: space-evenly;
        width: 55%;
        margin: 4% 0 8% 0;
    }
    svg:not(.dynamic-svg-line){
            width: 7vw;
            height: 7vh
        }
}
.email_block {
    display: flex;
    justify-content: space-around;
}

.email_block a {
    color: white;
    text-decoration: none; /* Убираем подчеркивание ссылок */
}

p {
    color: white;
    text-align: center; /* Выравнивание текста по центру */
}
</style>
