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
          <tr v-for="(item,) in invites" :key="item.id">
              <td>
                {{ item.last_name }} {{ item.first_name }}
                {{ item.middle_name }}
              </td>
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
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >

                <input
                  v-if="typeConfirm === 'Бухгалтерия'"
                  type="checkbox"
                  v-model="item.is_verified_by_accounts"
                  @change="handleCheckboxChange(item)"
                  style="width: 3vh; height: 3vh;"
                />
              </td>
            <!-- </template> -->
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <button class="btn btn-success" @click="saveChanges">Сохранить</button>
  </div>
</template>
  
  <script setup>
import { ref, onMounted, defineProps } from "vue";
import api from "@/api/invites";
import { useLoaderStore } from "../../../store/LoaderStore";
import { refreshToken } from "@/mixins/refreshToken";

const invites = ref([]);
const all_confirm_rows = ref([]);
const props = defineProps({
  typeConfirm: String
})
onMounted(async () => {
  useLoaderStore().setLoader(true);

  try {
    refreshToken();
    invites.value = await api.getAllInvites()
    invites.value = invites.value.data.filter((item ) => item.is_verified_by_accounts === false);
    useLoaderStore().setLoader(false);
  } catch (err) {
    console.log(err);
    useLoaderStore().setLoader(false);
  }
});

const handleCheckboxChange = (item) => {
  const index = all_confirm_rows.value.findIndex((row) => row.id === item.id);
  if (item.is_verified_by_accounts) {
    // Добавляем элемент, если он не в массиве
    if (index === -1) {
      all_confirm_rows.value.push(item);
    }
  } else {
    // Удаляем элемент из массива, если чекбокс снят
    if (index !== -1) {
      all_confirm_rows.value.splice(index, 1);
    }
  }
};
const saveChanges = async () => {
  useLoaderStore().setLoader(true);

  for (const row of all_confirm_rows.value) {
    console.log(row);
    // Проверяем is_verified_by_accounts и отправляем данные
    if (row.is_verified_by_accounts) {
      console.log(
        `Подтверждение сотрудника с ID: ${row.id} отправлено. ${row} 111`
      );
      // Здесь можно вызывать api для подтверждения
    } else {
      console.log(
        `Изменения по сотруднику с ID: ${row.id} подготовлены. ${row} 222`
      );
      try {
        const queryParams = JSON.stringify({ is_verified_by_accounts: true });
        alert("я тут");
        await api.editInvite(row.id, queryParams);
        invites.value = await api.getAllInvites()
        invites.value = invites.value.data.filter((item ) => item.is_verified_by_accounts === false);
        useLoaderStore().setLoader(false);
      } catch (err) {
        console.log(
          `Ошибка при сохранении изменений по сотруднику с ID: ${row.id}`,
          err
        );
        useLoaderStore().setLoader(false);
      }
    }
  }

  useLoaderStore().setLoader(false);

  // Очищаем массив после сохранения
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
  