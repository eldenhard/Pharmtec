<template>
    <div>
      <div style="overflow: auto; width: 100%; height: 40vh">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ФИО сотрудника</th>
              <th>ФИО прошлого сотрудника</th>
              <th>Должность</th>
              <th>Город</th>
              <th>Регион</th>
              <th>Дата выхода</th>
              <th>Направление продвижения</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Адрес для промматериалов</th>
              <th>Адрес для CDEK</th>
              <th>Дата рождения</th>
              <th>Руководитель</th>
              <th>Доп. информация</th>
              <th>Подтвердить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in filteredInvites" :key="item.id">
              <td>{{ item.last_name }} {{ item.first_name }} {{ item.middle_name }}</td>
              <td>{{ item.prev_eployee_fio }}</td>
              <td>{{ item?.job_info?.name }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.region }}</td>
              <td>{{ item.on_date }}</td>
              <td>{{ item.promotion_direction }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.address_1 }}</td>
              <td>{{ item.address_2 }}</td>
              <td>{{ item.date_of_birth }}</td>
              <td>{{ item.manager }}</td>
              <td>{{ item.comment_1 }}</td>
              <td
                style="display: flex; align-items: center; justify-content: center;"
              >
                <!-- Явно связываем значение чекбокса и обрабатываем изменение -->
                <input
                  type="checkbox"
                  :checked="getVerifiedField(item)"
                  @change="toggleVerifiedField(item)"
                  style="width: 3vh; height: 3vh;"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <button class="btn btn-success" @click="saveChanges">Сохранить</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, defineProps } from "vue";
  import api from "@/api/invites";
  import { useLoaderStore } from "../../../store/LoaderStore";
  import { refreshToken } from "@/mixins/refreshToken";
  
  const props = defineProps({
    typeConfirm: String
  });
  
  const invites = ref([]);
  const all_confirm_rows = ref([]);

    
  onMounted(async () => {
    useLoaderStore().setLoader(true);
    try {
      refreshToken();
      invites.value = await api.getAllInvites();
      useLoaderStore().setLoader(false);
    } catch (err) {
      console.log(err);
      useLoaderStore().setLoader(false);
    }
  });
  // Фильтрованные данные на основе пропса
  const filteredInvites = computed(() => {
  if (!invites.value.data) {
    return []; // Если данные еще не загружены, возвращаем пустой массив
  }

  return invites.value.data.filter((item) => {
    if (props.typeConfirm === "Кадровая служба") {
      return !item.is_verified_by_hr;
    } else if (props.typeConfirm === "Бухгалтерия") {
      return !item.is_verified_by_accounts;
    }
  });
});
  
  // Функция для получения нужного поля в зависимости от типа подтверждения
  const getVerifiedField = (item) => {
    return props.typeConfirm === "Кадровая служба"
      ? item.is_verified_by_hr
      : item.is_verified_by_accounts;
  };
  
  // Функция для изменения значения поля
  const toggleVerifiedField = (item) => {
  const field = props.typeConfirm === "Кадровая служба"
    ? 'is_verified_by_hr'
    : 'is_verified_by_accounts';

  // Создаем копию объекта item
  const updatedItem = { ...item };

  // Изменяем значение поля
  updatedItem[field] = !updatedItem[field];

  // Добавляем или удаляем элемент из массива подтверждений
  const index = all_confirm_rows.value.findIndex((row) => row.id === updatedItem.id);
  if (updatedItem[field]) {
    if (index === -1) {
      all_confirm_rows.value.push(updatedItem);
    }
  } else {
    if (index !== -1) {
      all_confirm_rows.value.splice(index, 1);
    }
  }
};

  
  const saveChanges = async () => {
    useLoaderStore().setLoader(true);
  
    for (const row of all_confirm_rows.value) {
      try {
        const queryParams = JSON.stringify({
          is_verified_by_hr: row.is_verified_by_hr,
          is_verified_by_accounts: row.is_verified_by_accounts,
        });
        await api.editInvite(row.id, queryParams);
        invites.value = await api.getAllInvites();
      } catch (err) {
        console.log(`Ошибка при сохранении изменений по сотруднику с ID: ${row.id}`, err);
      }
    }
  
    useLoaderStore().setLoader(false);
    all_confirm_rows.value = [];
  };
  </script>
  
  <style scoped>
  tr {
    cursor: pointer;
  }
  thead > tr {
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    right: 0;
    z-index: 1;
    text-align: center;
  }
  th {
    font-size: 12px;
    text-align: center;
    background: lightgrey !important;
  }
  .btn {
    margin-left: auto;
  }
  td {
    font-size: 12px;
    align-items: center;
    vertical-align: middle;
  }
  </style>
  