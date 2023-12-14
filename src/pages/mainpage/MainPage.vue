<template>
  <div>
    <navbar />
    <div class="workspace_grid">
      <sidebar @someEvent="handleSomeEvent" />
      <workspace>{{ receivedData }}</workspace>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import navbar from '../../components/navbar/navbar.vue';
import sidebar from '../../components/sidebar/sidebar.vue';
import workspace from '../../components/workspace/workspace.vue';

export default {
  components: { navbar, sidebar, workspace },
  setup() {
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