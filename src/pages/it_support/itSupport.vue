<template>
  <div>
    <!-- <navbar /> -->
    <div class="workspace_grid">
      <sidebar @someEvent="handleSomeEvent" v-if="isSidebarVisible"/>

      <Transition name="fade" mode="out-in" appear>
        <workspace :key="receivedData">
          <br />

          <component :is="currentTabComponent" />
        </workspace>
      </Transition>
    </div>
  </div>
</template>
  
  
  
  <script>
import { ref, onMounted, onUnmounted, Transition, computed, watch } from "vue";
import navbar from "../../components/navbar/navbar.vue";
import workspace from "../../components/workspace/workspace.vue";
import sidebar from "../../components/sidebar/sidebar_it_support.vue";
import it_support_module from "@/modules/it_support/it_support/it_support_module.vue";
export default {
  components: {
    navbar,
    sidebar,
    workspace,
    Transition,
    it_support_module,
  },
  setup() {
    const receivedData = ref("");
    const windowSize = ref(window.innerWidth);
    const isSidebarVisible = ref(true);
    onMounted(() => {
      window.addEventListener("resize", changeWindowSize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", changeWindowSize);
    });

    const changeWindowSize = () => {
      windowSize.value = window.innerWidth;
      if(windowSize.value < 800){
        isSidebarVisible.value = false
      }
    };

    watch(windowSize, () => {
      changeWindowSize()
    })
    const currentTabComponent = computed(() => {
      switch (receivedData.value) {
        case "it_support":
          return it_support_module;
        default:
          return it_support_module;
      }
    });
    const handleSomeEvent = (data) => {
      console.log(data);
      receivedData.value = data;
    };

    return {
      receivedData,
      currentTabComponent,
      handleSomeEvent,
      windowSize,
      changeWindowSize,
      isSidebarVisible,
    };
  },
};
</script>
  <style scoped>
@import "../mainpage/style/mainpage.scss";
</style>