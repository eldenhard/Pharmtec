<template>
  <div>
    <navbar />
    <div class="workspace_grid">
      <sidebar @someEvent="handleSomeEvent" />
     
        <Transition name="fade" mode="out-in" appear>
          <workspace :key="receivedData">
            <br>
            <Transition name='fade'>
              <div v-if="receivedData == 'Applications'">

                <order :type="'Заявка на отпуск'" :idItem="'flush-collapseOne'"
                  :list_category="['Очередной', 'За свой счет', 'Декретный']" />
                <order :type="'Заявка на больничный'" :idItem="'flush-collapseTwo'"
                  :list_category="['Больничный', 'Декрет']" />
                <order :type="'Заявка на командировку'" :idItem="'flush-collapseThree'"
                  :list_category="['На самолете', 'На поезде', 'На машине']" />
                <order :type="'Заявка на служебную поездку'" :idItem="'flush-collapseFour'"
                  :list_category="['На самолете', 'На поезде', 'На машине']" />
                <order :type="'Изменение личных данных'" :idItem="'flush-collapseFive'"
                  :list_category="['Арес', 'Паспортные данные', 'Контакты']" />
                <order :type="'Увольнение'" :idItem="'flush-collapseSix'" :list_category="['Увольнение']" />
              </div>
            </Transition>
          </workspace>
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
import order from '../../modules/order/order.vue';
export default {
  components: { navbar, sidebar, workspace, Transition, order },
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
<style scoped>@import '../mainpage/style/mainpage.scss';</style>