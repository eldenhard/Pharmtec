<template>
    <div class="container_key">
      <div class="hot_key" :class="[classSize]">
        <div class="blue_circle"></div>
        <div class="ui_el">
          <slot></slot>
        </div>
      </div>
      <p>{{ figcaption }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      figcaption: {
        type: String,
      },
      classSize: {
        type: String
      }
    },
  };
  </script>



<style scoped>
.container_key {

  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.hot_key {
  position: relative;
  border-radius: 25%;
  background: linear-gradient(to bottom, #1baeb7, #015c8e);
  display: flex;
  align-items: top;
  justify-content: center;
  overflow: hidden;
  transition: background-color .3s ease; /* Плавный переход цвета фона */
}
.l_size{
  width: 7vh;
  height: 7vh;
}
.m_size{
  width: 4vw;
  height: 4vw;
}
.s_size{
  width: 3vw;
  height: 3vw;
}
.blue_circle {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-30%, 50%);
  width: 5vw;
  height: 5vw;
  background-color: #47a0d0;
  border-radius: 50%;
  z-index: 0; /* Круг на заднем плане */
  transition: background-color .3s ease; /* Плавный переход цвета фона */
}


.ui_el {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Центрирование содержимого по горизонтали и вертикали */
}

.container_key p {
  text-align: center;
  /* color: #4e4e4e; */
  font-size: 1rem;
  padding-top: 5%;

}

/* Hover эффекты при наведении на .container_key */
.container_key:hover .hot_key {
  background: linear-gradient(to bottom, #01CBD7, #007CBF);
}

.container_key:hover .blue_circle {
  background: #2887BB;
}
@media screen and (max-width: 800px) {
  .container_key p {

  font-size: 0.8rem;

}
}
</style>
