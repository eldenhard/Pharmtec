<template>
  <div class="air_block">
    <h4 class="air_block_header">Подтверждение заявок (бухгалетрия)</h4>
    <div class="air_block_body">
      <div class="search_block">
        <label for="" style="width: 30%"
          >Сотрудники сотрудники
          <v-select
            :options="all_users"
            label="full_name"
            v-model="currentUser_"
          >
            <template #no-options> Сотрудники не найдены </template>
          </v-select>
        </label>
        <div class="datepicker-icon" @click="toggleDatePicker">
            <i class="bi bi-calendar-week"></i>
            <span class="date_check">&nbsp;{{  new Date(range.start).getDate() }}.{{ new Date(range.start).getMonth()  }}.{{  new Date(range.start).getFullYear() }} — 
                {{  new Date(range.end).getDate() }}.{{ new Date(range.end).getMonth()  }}.{{  new Date(range.end).getFullYear() }}
            </span>
        </div>

        <div v-if="isDatePickerVisible" class="datepicker-popup">
          <VDatePicker v-model.range="range" mode="date"/>
        </div>
      </div>
      <br>
      <table class="table table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th>Дата</th>
            <th>ФИО</th>
            <th>Наименование</th>
            <th>Сумма</th>
            <th>Комментарий сотрудника</th>
            <th>Подтверждение</th>
            <th>Комментарий</th>
            <th>Сохранение</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in filteredTransactions">
            <tr v-for="j in item.transactions" :key="j.id">
              <template
                v-if="j.is_confirmed == true && !j.is_accounting_confirmed"
              >
                <td>{{ j.on_date.split("-").reverse().join(".") }}</td>
                <td>
                  {{ item.author.first_name }} {{ item.author.last_name }}
                </td>
                <td>{{ j.balance_sheet_item_info.name }}</td>
                <td>{{ j.amount }}</td>
                <td>{{ j.staff_comment }}</td>
                <td>
                  <div class="dropdown" v-if="!j.status_confirm_application">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Действие
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="j.status_confirm_application = 'Принято'"
                          >Принять</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="j.status_confirm_application = 'Отклонено'"
                          >Отклонить</a
                        >
                      </li>
                    </ul>
                  </div>
                  <span v-if="j.status_confirm_application">{{
                    j.status_confirm_application
                  }}</span>
                </td>
                <td
                  :class="{
                    warning: j.status_confirm_application == 'Отклонено',
                  }"
                >
                  <Field
                    v-model="j.comment_bookkeeping"
                    :name="`comment_${index}`"
                    :rules="getValidationRules(j)"
                    as="input"
                    type="text"
                    class="form-control"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark"
                    @click="confirmFinEntry(j, index)"
                  >
                    Сохранить
                  </button>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import api from "@/api/user.js";
import api_fin from "@/api/fin_report.js";
import { onMounted, ref, computed, watch } from "vue";
import { refreshToken } from "@/mixins/refreshToken";
import { useLoaderStore } from "@/store/LoaderStore";
import { useGetAllUsers } from "@/store/AllUsers";
import { onClickOutside } from "@vueuse/core";
export default {
  components: {
    vSelect,
    Field,
    ErrorMessage,
    Form,
  },
  setup() {
    const allStaffByManager = ref([]);
    const toast = useToast();
    const response_data_transaction_by_user_ = ref([]);
    const currentUser_ = ref("");
    const allTransactions = ref([]);
    const users = useGetAllUsers();
    const all_users = ref([]);
    const range = ref({
      start: new Date(2020, 0, 6),
      end: new Date(2020, 0, 10),
    });
    const isDatePickerVisible = ref(false);
    const target = ref(null)

  
    // Функция для переключения видимости DatePicker
    const toggleDatePicker = () => {
    isDatePickerVisible.value = !isDatePickerVisible.value;
    };
    onMounted(async () => {
      try {
        await refreshToken();
        useLoaderStore().setLoader(true);
        await getFinancialReports();
        // let response = await api.getStaffByManagerUsers();
        // allStaffByManager.value = response.data;
        useLoaderStore().setLoader(false);
      } catch (err) {
        console.log(err);
        useLoaderStore().setLoader(false);
        toast.error(`Ошибка! Данные не получены`, {
          timeout: 3000,
        });
      }
    });
    const filteredTransactions = computed(() => {
      if (!currentUser_.value) {
        return allTransactions.value;
      }
      return allTransactions.value.filter((item) => {
        const fullName = [item.author.last_name, item.author.first_name].join(
          " "
        );
        return fullName.includes(
          currentUser_.value.last_name + " " + currentUser_.value.first_name
        );
      });
    });

    const formatedUsers = computed(() => {
      return allStaffByManager.value
        .map((user) => {
          return {
            full_name: user.user.fio,
            id: user.user.id,
          };
        })
        .sort((a, b) => a.full_name.localeCompare(b.full_name));
    });

    async function getFinancialReports() {
      try {
        allTransactions.value = [];
        if (currentUser_.value !== null) {
          const queryParams = {
            month: Number(new Date().getMonth() + 1),
            year: Number(new Date().getFullYear()),
          };
          let response = await api_fin.getFinancialReports(queryParams);
          if (response.data.length > 0) {
            toast.success(`Данные получены`, {
              timeout: 2500,
            });

            response.data.forEach((item) => {
              allTransactions.value.push({
                author: item.author_info,
                transactions: item.transactions,
              });
            });

            all_users.value = users.all_users;
          } else {
            toast.warning(`Данные по выбранному пользователю отсутствуют`, {
              timeout: 3000,
            });
          }
        }
      } catch (err) {
        console.log(err);
        toast.error(`Ошибка! Данные не получены`, {
          timeout: 3000,
        });
      }
    }

    function getValidationRules(transaction) {
      return transaction.status_confirm_application === "Отклонено"
        ? yup.string().required("Комментарий обязателен при отклонении заявки.")
        : yup.string().nullable();
    }

    async function confirmFinEntry(item, index) {
      try {
        if (
          item.status_confirm_application === "Отклонено" &&
          !item.comment_bookkeeping
        ) {
          toast.warning("Комментарий обязателен при отклонении заявки.", {
            timeout: 3000,
          });
          return;
        }
        if (item.status_confirm_application === "Согласовано") {
          item.is_accounting_confirmed = true;
        } else {
          item.is_accounting_confirmed = false;
        }

        console.log("item", item);
        // Логика сохранения транзакции
        const queryParams = {
          // "balance_sheet_item": item?.balance_sheet_item_info.id,
          // "on_date": item.on_date,
          // "amount": item.amount,
          // "comment": item.comment,
          is_accounting_confirmed: item.is_accounting_confirmed,
          // "report": item.report,
          accounting_comment: item.comment_bookkeeping,
          // "staff_comment" : item.staff_comment,
          // "is_confirmed": item.is_confirmed
        };
        console.log("Параметры запроса:", queryParams);
        await api_fin.editFinancialEntry(item.id, queryParams);
        toast.success(`Действие по заявке сохранено`, {
          timeout: 2500,
        });
        await getFinancialReports();
      } catch (err) {
        toast.error(`Ошибка! Заявка №${index + 1} не подтверждена\n${err}`, {
          timeout: 3000,
        });
      }
    }
    return {
      allStaffByManager,
      response_data_transaction_by_user_,
      currentUser_,
      getFinancialReports,
      formatedUsers,
      filteredTransactions,
      all_users,
      allTransactions,
      getValidationRules,
      confirmFinEntry,
      range,
      isDatePickerVisible,
      toggleDatePicker,
      target,
    };
  },
};
</script>

<style scoped>
@import "./style/style_check_application.scss";
</style>
