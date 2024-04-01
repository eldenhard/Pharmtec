<template>
  <div>
    <!-- <navbar /> -->
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
          <div v-if="receivedData == 'forManagment'">
            <for_manager />
          </div>
          <div v-if="receivedData == 'staff'">
            <staff_element />
          </div>
          <div v-if="receivedData == 'ForAdmin'">
            <for_admin />
          </div>
          <div v-if="receivedData == 'booking'">
            <sheduleElement />
          </div>
          <div v-if="receivedData == 'FinReport'">
            <fin_report />
          </div>
          <div v-if="receivedData == 'ApproveApplication'">
            <check_application />
          </div>
          <div v-if="receivedData == 'companyStructure'">
            <company_structure />
          </div>

          <div v-if="receivedData == 'News'">
            <news />
          </div>
        </workspace>
      </Transition>
    </div>
  </div>
</template>



<script>
import { ref, onMounted, Transition } from 'vue';
import navbar from '../../components/navbar/navbar.vue';
import sidebar from '../../components/sidebar/sidebar.vue';
import workspace from '../../components/workspace/workspace.vue';
import order from '../../modules/order/order.vue';
import for_manager from '../../modules/for_manager/for_manager.vue'
import for_admin from '../../modules/for_admin/for_admin.vue'
import news from '../../modules/news/news.vue';
import sheduleElement from '../../modules/shedule_module/sheduleElement.vue';
import fin_report from '../../modules/fin_report/fin_report.vue'
import check_application from '../../modules/check_application/check_application.vue';
import company_structure from '../../modules/company_structure/company_structure.vue'
import staff_element from '../../modules/staff_module/staff_element.vue';
import { useActiveTabStore } from '../../store/ActiveTabStore'
export default {
  components: { navbar, sidebar, workspace, Transition, order, for_manager, for_admin, news, sheduleElement, fin_report, check_application, company_structure, staff_element },
  setup() {
    onMounted(() => {

      // if (!localStorage.getItem('token')) {
      //   window.location.href = '/login'
      // }
    })
    const receivedData = ref('');

    const handleSomeEvent = (data) => {
      console.log(data)
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