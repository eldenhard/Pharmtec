<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid mx-3"> <!-- Горизонтальные отступы -->
      <a class="navbar-brand" href="#">
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.1879 30.7777C50.2599 31.2771 50.506 33.3932 50.506 35.9268C50.506 38.5265 50.2413 40.6741 49.1036 41.1063C47.446 41.5847 46.27 42.744 46.27 44.1044C46.27 44.2525 46.3029 44.388 46.3303 44.5286C36.3916 37.5581 37.1565 26.3593 37.1565 26.3593C37.1565 26.3593 41.1958 25.0697 48.4573 25C47.1539 25.5705 46.2692 26.5862 46.2692 27.7588C46.2692 29.1386 47.4838 30.3162 49.1879 30.7777ZM60.5722 25.9476C58.2134 25.5705 55.8228 25.3035 53.4157 25.1483C54.546 25.7363 55.2878 26.6797 55.2878 27.7588C55.2878 29.1386 54.0728 30.3162 52.3738 30.7777C51.2979 31.2771 51.0522 33.3932 51.0522 35.9268C51.0522 38.5265 51.3165 40.6741 52.4542 41.1063C52.4727 41.1118 52.4947 41.1198 52.5129 41.1246L52.4472 41.0742C53.6656 41.4726 56.2234 39.9235 59.0937 37.868C61.956 35.8203 64.122 33.9894 63.575 33.1165L63.6187 33.1483C63.4128 32.7731 63.3059 32.3739 63.3034 31.9708C63.3034 30.1834 65.3219 28.7372 67.8179 28.7372C68.295 28.7372 68.7458 28.8069 69.1831 28.904C66.8486 27.5524 64.022 26.4969 60.5722 25.9476ZM72.0484 30.8997C72.2138 31.2334 72.32 31.5898 72.32 31.971C72.32 33.3744 71.0691 34.5652 69.318 35.0079C68.3197 35.5209 68.0887 37.3619 68.0887 39.558C68.0887 41.7651 68.3236 43.61 69.3292 44.1174C71.0726 44.5632 72.32 45.7562 72.32 47.1551C72.32 48.3941 71.3407 49.4549 69.9129 50C75.7041 49.8415 79.998 49.033 79.998 49.033C79.998 49.033 80.3391 37.8392 72.0484 30.8997ZM65.9342 34.9006C64.6497 34.7005 62.2094 36.1949 59.482 38.1438C56.6124 40.2021 54.4506 42.0354 55.005 42.9056L54.9424 42.8621C55.1717 43.2557 55.2891 43.678 55.2878 44.1044C55.2878 45.7225 53.6251 47.0506 51.4598 47.2874C52.2853 47.6189 53.148 47.9343 54.0693 48.2154C57.846 49.3639 61.9084 49.8467 65.6708 49.9817C64.2681 49.4311 63.303 48.3797 63.303 47.1551C63.303 45.7562 64.5547 44.5634 66.3016 44.1174C67.3037 43.61 67.5386 41.7651 67.5386 39.558C67.5386 37.3619 67.3072 35.5206 66.3086 35.0079C66.1814 34.9765 66.0565 34.9406 65.9342 34.9006Z" fill="white"/>
<path d="M0.804481 14.0612C-1.0756 6.4525 4.20827 2.28911 10.0589 1.78085C14.9515 1.35596 19.8867 3.57744 23.1327 6.67682C15.32 4.32499 5.59451 7.65978 0.804481 14.0612ZM33.4812 15.9406C35.3613 23.5493 30.0777 27.7122 24.2274 28.2192C19.3348 28.6464 14.399 26.4236 11.1533 23.3242C18.966 25.6766 28.6915 22.3418 33.4812 15.9406Z" fill="white"/>
<path d="M16.0696 29.2963C7.37398 30.9414 2.61611 26.3178 2.03495 21.199C1.54937 16.9182 4.0882 12.5996 7.63035 9.75942C4.94254 16.5953 8.75403 25.1051 16.0696 29.2963ZM18.2176 0.704181C26.9135 -0.940631 31.6711 3.68276 32.251 8.80176C32.739 13.0823 30.1987 17.4014 26.6565 20.2414C29.3443 13.4053 25.5331 4.8952 18.2176 0.704181Z" fill="white"/>
</svg>



       



      </a>
      <!-- <a href=""> -->

      <!-- </a> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item dws">
            <router-link to="/about-company" class="nav-link">О компаниях</router-link>
          </li>
          <li class="nav-item dws">
            <router-link to="/products" class="nav-link">Продукция</router-link>
          </li>
          <li class="nav-item dws">
            <router-link to="/workspace" class="nav-link">Рабочая среда</router-link>
          </li>

          <li class="nav-item dws">
            <router-link to="/login" class="nav-link" @click="deleteTokenUser">Выход</router-link>
          </li>
        </ul>

        <!-- <form class="d-flex"> -->

        <router-link to="/login" class="nav-link">
          <div class="icon_block"></div>
        </router-link>
        <!-- </form> -->
      </div>
    </div>
  </nav>
</template>

<style  scoped>
@import './style/style-navbar.scss';
</style>


<script>
export default {
  setup() {
    const deleteTokenUser = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
    return {
      deleteTokenUser
    }
  }
}
</script>