<template>
  <nav class="navbar navbar-expand-lg" >
    <div class="container-fluid mx-3"> <!-- Горизонтальные отступы -->
      <a class="navbar-brand" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 116.22 116.22">
          <g fill="#fff">
            <path
              d="M2.727 54.473C-3.646 24.997 14.265 8.868 34.097 6.899c16.585-1.646 33.314 6.96 44.317 18.967-26.483-9.111-59.45 3.808-75.687 28.607zM113.493 61.754c6.373 29.476-11.537 45.603-31.368 47.567-16.585 1.655-33.316-6.956-44.318-18.963 26.483 9.113 59.45-3.806 75.686-28.604z">
            </path>
            <path
              d="M54.472 113.494c-29.476 6.373-45.604-11.539-47.574-31.369-1.646-16.584 6.96-33.314 18.967-44.317-9.111 26.482 3.809 59.449 28.607 75.686zM61.753 2.728c29.477-6.372 45.604 11.539 47.57 31.37 1.654 16.583-6.957 33.315-18.964 44.317 9.111-26.483-3.808-59.451-28.606-75.687z">
            </path>
          </g>
        </svg>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item dws">
            <a class="nav-link" aria-current="page" href="#" @click="addElement($event)">Меню 1</a>
          </li>
          <li class="nav-item dws">
            <a class="nav-link" aria-current="page" href="#">Меню 2</a>
          </li>
          <li class="nav-item dws">
            <a class="nav-link" aria-current="page" href="#">Меню 3</a>
          </li>
          <li class="nav-item dws">
            <router-link to="/login" class="nav-link" @click="deleteTokenUser">Выход</router-link>
            <!-- <a class="nav-link butt" aria-current="page" href="#">Выход</a> -->
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
export default{
  setup(){
    const deleteTokenUser = () => {
      localStorage.removeItem('token')
    }
    return {
      deleteTokenUser
    }
  }
}
</script>