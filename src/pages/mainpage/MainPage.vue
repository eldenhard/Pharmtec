<template>
  <div>
    <navbar />
    <div class="workspace_grid">
      <sidebar @someEvent="handleSomeEvent" />
      <Transition name="fade" mode="out-in" appear>
        <workspace :key="receivedData">{{ receivedData }}</workspace>
      </Transition>
    </div>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { Transition } from 'vue';
import navbar from '../../components/navbar/navbar.vue';
import sidebar from '../../components/sidebar/sidebar.vue';
import workspace from '../../components/workspace/workspace.vue';

export default {
  components: { navbar, sidebar, workspace, Transition },
  setup() {
    onMounted(() => {
      if (!localStorage.getItem('token')) {
        window.location.href = '/login'
      }
    })
    const receivedData = ref('');

    const handleSomeEvent = (data) => {
      receivedData.value = data;
    };

    return {
      receivedData,
      handleSomeEvent
    };
  }
};
</script>
<style scoped>
@import '../mainpage/style/mainpage.scss';

</style>