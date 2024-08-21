<template>
  <div>
    <!-- <navbar /> -->
    <div class="workspace_grid">
      <sidebar_service_requests @someEvent="handleSomeEvent" />

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
              <order :type="'Заявка на изменение личных данных'" :idItem="'flush-collapseFive'"
                :list_category="['Арес', 'Паспортные данные', 'Контакты']" />
              <order :type="'Заявка на увольнение'" :idItem="'flush-collapseSix'" :list_category="['Увольнение']" />
            </div>
          </Transition>
          <component :is="currentTabComponent" />

        </workspace>
      </Transition>
    </div>
  </div>
</template>



<script>
import { ref, onMounted, Transition, computed } from 'vue';
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
import check_application_bookkeping from '../../modules/check_application_bookkeping/check_application_bookkeping.vue';
import company_structure from '../../modules/company_structure/company_structure.vue'
import staff_element from '../../modules/staff_module/staff_element.vue';
import user_status from '@/pages/lk_page/modules/UserStatus.vue'
import { useActiveTabStore } from '../../store/ActiveTabStore'
import products_company from '../../modules/products_company/products_company.vue';
import create_limits from '../../modules/all_staff/create_limits/create_limits.vue';
import sidebar_service_requests from '../../components/sidebar/sidebar_service_requests.vue';

import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    navbar, sidebar, workspace, Transition, order, for_manager, for_admin, news, sheduleElement, fin_report, check_application, company_structure,
    products_company, staff_element, sidebar_service_requests, check_application_bookkeping
  },
  setup() {
    onMounted(() => {

      // if (!localStorage.getItem('token')) {
      //   window.location.href = '/login'
      // }
    })
    const route = useRouter();
    const receivedData = ref('');
    const currentTabComponent = computed(() => {
      switch (receivedData.value) {

        case 'ApproveApplication':
          return check_application
        case 'ApproveApplicationBookkeeping':
          return check_application_bookkeping
        case 'createLimits':
          return create_limits
        case 'FinReport':
          return fin_report
        case 'booking':
          return sheduleElement
        case 'ApproveApplication':
          return check_application
        case 'ForAdmin':
          return for_admin
        case 'informationAboutProducts':
          return products_company
        case 'UserStatus':
          return user_status
        default:
          return order
      }
    })

    const handleSomeEvent = (data) => {
      console.log(data)
      receivedData.value = data;
    };

    return {
      receivedData,
      currentTabComponent,
      handleSomeEvent,
    };
  }
};
</script>
<style scoped>
@import '../mainpage/style/mainpage.scss';
</style>