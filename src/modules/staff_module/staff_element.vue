<template>
    <div class="air_block">
        <div class="header_element">Сотрудники
            <hr>
        </div>
        <!-- <pre>
            "last_login": null,
    "is_superuser": false,
    "username": "kirilicheva.d",
    "first_name": "Дарья",
    "last_name": "Кириличева",
    "email": "kirilicheva.d@pharmtec.ru",
    "is_staff": false,
    "is_active": true,
    "date_joined": "2024-02-15T22:37:18.649341+03:00",
    "middle_name": "Александровна",
    "phone": null,
    "company": "ФАРМТЕК",
    "groups": [],
    "user_permissions": []
               </pre> -->
        <input type="text" v-model="search" class="search_on_table" placeholder="Поиск...">

        <div class="air_block__table">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>Почта</th>
                        <th>Компания</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.middle_name }}</td>
                        <td>{{ user.job_info.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.company }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, compile } from 'vue';
import api from '@/api/user'
import { useLoaderStore } from '@/store/LoaderStore'
import { useToast } from "vue-toastification";
export default {
    setup() {
        const users = ref([]);
        const toast = useToast();
        const search = ref("")
        const filteredUsers = ref([])
        onMounted(async () => {
            try {
                useLoaderStore().setLoader(true)
                let response = await api.getAllUsers()
                users.value = response.data
                users.value = users.value.sort((a, b) => {
                    return a.last_name.localeCompare(b.last_name)
                })
                filteredUsers.value = [...users.value]
            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            } finally {
                useLoaderStore().setLoader(false)
            }
        })
        watch(search, () => {
            // поиск по users.value
            if (search.value == "") {
                return filteredUsers.value = [...users.value]
            }
            filteredUsers.value = filteredUsers.value.filter(user => user.last_name.toLowerCase().includes(search.value.toLowerCase()))
        })
        return {
            users,
            search,
            filteredUsers,
            toast
        }
    },
}
</script>

<style scoped>
@import './style/staff_element_style.scss';
</style>