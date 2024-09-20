<template>
  <div class="air_block">
    <div class="header_element">
      <span class="description"> Подтверждение регистрации </span>
    </div>
    <hr />
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          @click="selectedTab = 'Кадровая служба'"
        >
          Кадровая служба
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profile"
          type="button"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          @click="selectedTab = 'Бухгалтерия'"
        >
          Бухгалтерия
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <confirmPersonalService :typeConfirm="selectedTab" />
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <confirmPersonalService :typeConfirm="selectedTab" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import confirmAccounting from "./components/confirmAccounting.vue";
import confirmPersonalService from "./components/confirmPersonalService.vue";

// Переменная для отслеживания выбранной вкладки
const selectedTab = ref("Кадровая служба");
</script>
<style scoped>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: black !important;
}
</style>