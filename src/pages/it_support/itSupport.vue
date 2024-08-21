<template>
    <div>
      <!-- <navbar /> -->
      <div class="workspace_grid">
        <sidebar @someEvent="handleSomeEvent" />
  
        <Transition name="fade" mode="out-in" appear>
          <workspace :key="receivedData">
            <br>

            <component :is="currentTabComponent" />
          </workspace>
        </Transition>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { ref, onMounted, Transition, computed } from 'vue';
  import navbar from '../../components/navbar/navbar.vue';
  import workspace from '../../components/workspace/workspace.vue';
  import sidebar from '../../components/sidebar/sidebar_it_support.vue'
  import it_support_module from '@/modules/it_support/it_support/it_support_module.vue'
  export default {
    components: {
      navbar, sidebar, workspace, Transition, it_support_module
    },
    setup() {
      onMounted(() => {
  
        // if (!localStorage.getItem('token')) {
        //   window.location.href = '/login'
        // }
      })
      const receivedData = ref('');
      const currentTabComponent = computed(() => {
        switch (receivedData.value) {
          case 'it_support':
            return it_support_module
          default:
            return it_support_module
        }
      })
      const handleSomeEvent = (data) => {
        console.log(data)
        receivedData.value = data;
      };
  
      return {
        receivedData,
        currentTabComponent,
        handleSomeEvent
      };
    }
  };
  </script>
  <style scoped>
  @import '../mainpage/style/mainpage.scss';
  </style>