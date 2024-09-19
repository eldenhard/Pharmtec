<template>
  <section class="air_block">
    <section class="header_element">
      <span class="description">Заявка на регистрацию</span>
    </section>
    <hr />
    <form @submit.prevent="createApplicationForManager()">
      <section class="grid_row">
        <div>
          <drop_zone_img v-model="formData.photo" />
        </div>
        <div class="first_line">
          <div class="input-box">
            <label>Фамилия</label>
            <input
              type="search"
              v-model="formData.last_name"
              name="last_name"
            />
          </div>
          <div class="input-box">
            <label>Имя</label>
            <input
              v-model="formData.first_name"
              type="search"
              name="first_name"
            />
          </div>
          <div class="input-box">
            <label>Отчество</label>
            <input
              type="search"
              v-model="formData.middle_name"
              name="middle_name"
            />
          </div>
          <!-- ////////////////////////// -->
          <div class="input-box">
            <label>Фамилия прошлого сотрудника</label>
            <input type="search" v-model="formData.last_name_pre" />
          </div>
          <div class="input-box">
            <label>Имя прошлого сотрудника</label>
            <input type="search" v-model="formData.first_name_pre" />
          </div>
          <div class="input-box">
            <label>Отчество прошлого сотрудника</label>
            <input type="search" v-model="formData.middle_name_pre" />
          </div>
          <!-- /////////////////// -->
          <div class="input-box">
            <label>Должность</label>
            <v-select
              v-model="formData.job_pre"
              :options="all_job"
              label="name"
            />
          </div>
          <div class="input-box">
            <label>Город</label>
            <input type="search" v-model="formData.city" />
          </div>

          <div class="input-box">
            <label
              style="
                background: white !important;
                position: absolute;
                z-index: 1;
              "
              >Регион</label
            >
            <v-select
              v-model="formData.region_pre"
              :options="allRegion"
              label="value"
            />
          </div>

          <div class="input-box">
            <label>Дата выхода</label>
            <input
              type="date"
              v-model="formData.on_date"
              name="date_start_work"
            />
          </div>

          <div class="input-box">
            <label>Направление продвижения</label>
            <input type="search" v-model="formData.promotion_direction" />
          </div>

          <div class="input-box">
            <label>Электронный адрес</label>
            <input type="email" v-model="formData.email" name="email" />
          </div>

          <div class="input-box">
            <label>Телефон</label>
            <input
              v-mask="'+7 (###) ###-##-##'"
              v-model="formData.phone"
              name="phone"
            />
          </div>

          <div class="input-box">
            <label>Адрес для промматериалов</label>
            <input type="search" v-model="formData.address_1" />
          </div>
          <div class="input-box">
            <label>Адрес для СДЕК</label>
            <input type="search" v-model="formData.address_2" />
          </div>
          <div class="input-box">
            <label>Дата рождения</label>
            <input type="date" v-model="formData.date_of_birth" name="email" />
          </div>
          <div class="input-box">
            <label
              style="
                background: white !important;
                position: absolute;
                z-index: 1;
              "
              >Руководитель</label
            >
            <v-select
              v-model="formData.manager_pre"
              :options="allUsers"
              label="full_name"
            />
          </div>
          <div class="input-box">
            <label>Доп. информация</label>
            <input type="search" v-model="formData.comment_1" />
          </div>
        </div>
      </section>

      <!-- <label for="" class="department">
                Должность <br>
                <v-select :options="department" label="title" />
            </label> -->
      <buttonComponent type="submit" style="width: 100%"
        >Зарегистрировать</buttonComponent
      >
    </form>
  </section>
</template>




<script lang="ts">
import { reactive, ref, onMounted, watch, computed } from "vue";
import InputComponent from "../../ui/inputComponent/InputComponent.vue";
import buttonComponent from "../../ui/button/buttonComponent.vue";
import { useToast } from "vue-toastification";
import api from "@/api/user";
import apiInvite from "@/api/invites";
import { mask } from "vue-the-mask";
import { useLoaderStore } from "../../store/LoaderStore";
import { refreshToken } from "@/mixins/refreshToken";
import drop_zone_img from "./modules/drop_zone_img.vue";
import { useGetAllUsers } from "../../store/AllUsers";
import { string } from "yup";
export default {
  components: { InputComponent, buttonComponent, drop_zone_img },
  directives: { mask },
  setup() {
    interface FormData {
      last_name: string;
      first_name: string;
      middle_name: string;
      email: string;
      phone: string;
      manager_pre: string | any;
      region_pre: string | any;
      date_of_birth: string;
      manager: string | any;
      region: string | any;
      job: string;
      job_pre: string | any;
      city: string;
      comment_1: string;
      address_2: string;
      address_1: string;
      promotion_direction: string;
      on_date: string;
      photo: any;

      last_name_pre: string;
      first_name_pre: string;
      middle_name_pre: string;
      prev_eployee_fio: string;
    }
    const formData = ref<FormData>({
      last_name: "",
      first_name: "",
      middle_name: "",
      city: "",
      email: "",
      phone: "",
      promotion_direction: "",
      on_date: "",
      comment_1: "",
      address_2: "",
      address_1: "",
      job: "",
      job_pre: "",
      manager_pre: "",
      region_pre: "",
      date_of_birth: "",
      // дата начала работы
      photo: "",
      manager: "",
      region: "",
      last_name_pre: "",
      first_name_pre: "",
      middle_name_pre: "",
      prev_eployee_fio: "",
    });
    const toast = useToast();
    const Users = useGetAllUsers();
    const allUsers = ref([]);
    const allRegion = reactive(
      [
        { value: 1 },
        { value: "Дальний Восток" },
        { value: "Смоленск +" },
        { value: "Центр" },
        { value: "Юг" },
        { value: "Западная Сибирь" },
        { value: "Северо-Запад" },
        { value: "Волга" },
        { value: "Урал" },
      ].sort((a, b) => a.value.localeCompare(b.value))
    );

    const createApplicationForManager = async () => {
        useLoaderStore().setLoader(true);
      formData.value.manager = formData.value.manager_pre.id;
    //   formData.value.region = 1
    //   formData.value.region = formData.valu?.region_pre?.value ?? null;
      formData.value.job = formData.value.job_pre.id;
      formData.value.prev_eployee_fio = `${formData.value.last_name_pre} ${formData.value.first_name_pre} ${formData.value.middle_name_pre}`
      const formDataToSubmit = new FormData();

      // Проверка и добавление каждого поля
      for (const key in formData.value) {
        if (formData.value[key] instanceof File) {
          formDataToSubmit.append(key, formData.value[key]); // Добавляем файл
        } else {
          formDataToSubmit.append(key, formData.value[key]); // Добавляем текстовые данные
        }
      }

      // Список пар ключ/значение
      for (let [name, value] of formDataToSubmit) {
        console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
      }

      // Отправка данных на сервер
      try {
        // let response = await apiInvite.createNewInvite(formDataToSubmit);
        let response = await apiInvite.createNewInvite(formDataToSubmit);
        await apiInvite.confirmNewInvite(response.data.id);
        useLoaderStore().setLoader(false);

        toast.success(
          "Успешно! По указанному адресу отправлено письмо для входа",
          {
            timeout: 3000,
          }
        );
        // Очистка данных формы после успешной отправки
        Object.keys(formData.value).forEach((key) => {
          formData.value[key] = "";
        });
      } catch (err) {
        toast.error(`Пользователь не сохранен\n${err}`, {
          timeout: 3000,
        });
        useLoaderStore().setLoader(false);

      }
    };

    const all_job = computed(() => {
      const jobs = Users.all_users
        .map((user) => user?.job_info)
        .filter((job) => job.name);
      const uniqueJobs = new Map();

      jobs.forEach((job) => {
        uniqueJobs.set(job.name, job);
      });

      return Array.from(uniqueJobs.values());
    });
    onMounted(async () => {
      useLoaderStore().setLoader(true);
      await refreshToken();

      try {
        let response = await api.getAllUsers();
        allUsers.value = response.data
          .reduce((acc, el) => {
            let full_name = `${el.last_name} ${el.first_name} ${el.middle_name}`;
            return [...acc, { ...el, full_name }];
          }, [])
          .sort((a, b) => a.full_name.localeCompare(b.full_name));
      } catch (err) {
        console.log(err);
      } finally {
        useLoaderStore().setLoader(false);
      }
    });

    return {
      toast,
      formData,
      allUsers,
      allRegion,
      Users,
      all_job,
      createApplicationForManager,
    };
  },
};
</script>

<style scoped>
@import "./style/for_manager_style.scss";
</style>