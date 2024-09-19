<template>
  <div class="air_block">
    <h4 class="air_block_header">Подтверждение заявок (бухгалтерия)</h4>
    <div class="air_block_body">
      <div class="search_block">
        <!-- Выбор сотрудника -->
        <label for="" style="width: 30%">
          Сотрудники
          <v-select
            :options="all_users"
            label="full_name"
            v-model="currentUser_"
          >
            <template #no-options> Сотрудники не найдены </template>
          </v-select>
        </label>

        <!-- Календарь -->
        <div class="datepicker-icon" @click="toggleDatePicker">
          <i class="bi bi-calendar-week"></i>
          <span class="date_check" v-if="range.start">
            &nbsp;{{ formatDate(range.start) }} — {{ formatDate(range.end) }}
          </span>
          <button
            v-if="range.start"
            class="btn btn-sm btn-danger"
            style="margin-left: 10px"
            @click="resetDate"
          >
            Сбросить
          </button>
        </div>
        <div v-if="isDatePickerVisible" ref="calendar" class="datepicker-popup">
          <VDatePicker v-model.range="range" mode="date" />
        </div>

        <!-- Выбор всех записей -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckChecked"
            v-model="checked_all_rows"
            @change="selectAllRows"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Выбрать все записи
            <span v-show="checked_all_rows" class="date_check">
              (Выбрано: {{ checking_data.length }})
            </span>
          </label>
        </div>

        <!-- Кнопка сохранения всех записей -->
        <button
          type="button"
          class="btn btn-success"
          v-show="checked_all_rows"
          @click="saveAllEntries"
        >
          Подтвердить все записи
        </button>
      </div>

      <br />
      <div style="max-width: 100%; overflow: auto">
        <!-- Таблица с транзакциями -->
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
                <template v-if="j.is_confirmed && !j.is_accounting_confirmed">
                  <td>{{ formatDate(j.on_date) }}</td>
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
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Действие
                      </button>
                      <ul class="dropdown-menu">
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
    const range = ref({});
    const isDatePickerVisible = ref(false);
    const target = ref(null);
    const checked_all_rows = ref(false);
    const calendar = ref(null);
    const checking_data = ref([]);
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
        onClickOutside(calendar, closeDatePicker);
      } catch (err) {
        console.log(err);
        useLoaderStore().setLoader(false);
        toast.error(`Ошибка! Данные не получены`, {
          timeout: 3000,
        });
      }
    });
    watch(currentUser_, () => {
      checked_all_rows.value = false;
    });
    watch(range, () => {
      checked_all_rows.value = false;
    });
    const closeDatePicker = () => {
      isDatePickerVisible.value = false;
    };
    const resetDate = () => {
      range.value = {};
      checked_all_rows.value = false;
    };

    const filteredTransactions = computed(() => {
      let transactions = allTransactions.value;

      // Фильтрация по автору, если указан
      if (currentUser_.value) {
        transactions = transactions.filter((item) =>
          [item.author.first_name, item.author.last_name]
            .join(" ")
            .includes(
              [
                currentUser_.value.first_name,
                currentUser_.value.last_name,
              ].join(" ")
            )
        );
      }

      // Фильтрация по диапазону дат, если указан
      if (range.value.start && range.value.end) {
        const start = new Date(range.value.start).getTime();
        const end = new Date(range.value.end).getTime();

        transactions = transactions
          .map((item) => {
            // Фильтруем транзакции внутри item
            const filteredTransactions = item.transactions.filter((t) => {
              const transactionDate = new Date(t.on_date).getTime();
              return transactionDate >= start && transactionDate <= end;
            });

            // Возвращаем новый объект с отфильтрованными транзакциями
            return { ...item, transactions: filteredTransactions };
          })
          .filter((item) => item.transactions.length > 0); // Убираем элементы без транзакций
      }

      return transactions;
    });

    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    };

    watch(checked_all_rows, () => {
      checking_data.value = [];
      filteredTransactions.value.forEach((item) => {
        item.transactions.forEach((t) => {
          if (t.is_confirmed && !t.is_accounting_confirmed) {
            checking_data.value.push(t);
          }
        });
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

    const saveAllEntries = async () => {
      useLoaderStore().setLoader(true);
      try {
        checked_all_rows.value = [];
        let promises = checking_data.value.map((item) =>
          api_fin.editFinancialEntry(item.id, {
            is_accounting_confirmed: true,
          })
        );
        await Promise.all(promises);
        await getFinancialReports();

        toast.success(`Данные сохранены`, {
          timeout: 2500,
        });
      } catch (err) {
        toast.error(`Данные не сохранены\n${err}`, {
          timeout: 2500,
        });
        useLoaderStore().setLoader(false);
      } finally {
        useLoaderStore().setLoader(false);
      }
    };

    async function confirmFinEntry(item, index = 1) {
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
        if (item.status_confirm_application === "Принято") {
          item.is_accounting_confirmed = true;
        } else {
          item.is_accounting_confirmed = false;
        }

        // // Логика сохранения транзакции
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
      all_users,
      currentUser_,
      range,
      isDatePickerVisible,
      toggleDatePicker,
      closeDatePicker,
      resetDate,
      checked_all_rows,
      filteredTransactions,
      formatDate,
      saveAllEntries,
      confirmFinEntry,
      calendar,
      checking_data,
      getValidationRules,
    };
  },
};
</script>

<style scoped>
@import "./style/style_check_application.scss";
</style>
