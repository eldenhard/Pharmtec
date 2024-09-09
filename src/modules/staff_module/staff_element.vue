<template>
    <div class="air_block">
        <div class="header_element">Сотрудники
            <hr>
        </div>
        <input type="search" v-model="search" class="search_on_table" placeholder="Поиск...">
        <div class="filter_block">
            <div class="checkbox_block">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        v-model="currentCompanyForFilter" value="Фармтек">
                    <label class="form-check-label" for="inlineRadio1">Фармтек</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                        v-model="currentCompanyForFilter" value="Интелбио">
                    <label class="form-check-label" for="inlineRadio2">Интелбио</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                        v-model="currentCompanyForFilter" value="Все">
                    <label class="form-check-label" for="inlineRadio3">Все</label>
                </div>
            </div>
            <div class="display_option">
                <button class="btn" @click="changeCurrentDisplayGrid('list')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        :fill="currentColor == 'list' ? '#005E96' : 'black'" class="bi bi-list-ol" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                        <path
                            d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                    </svg>
                </button>
                <button class="btn" @click="changeCurrentDisplayGrid('picture')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        :fill="currentColor == 'picture' ? '#005E96' : 'black'" class="bi bi-person-lines-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                    </svg>
                </button>

            </div>
        </div>
        <div class="air_block__table">

            <table class="table table-hover table-sm table-bordered">
                <thead v-if="currentColor == 'list'">
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>Стаж</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                        <th>Департамент</th>
                        <th>Город</th>
                        <th>Руководитель</th>
                        <th>Статус</th>
                        <th>Заменяющий</th>
                        <th>Компания</th>
                    </tr>
                </thead>
                <tbody>

                    <template v-if="currentColor == 'list'">
                        <tr v-for="user in filteredUsersList" :key="user.id"
                            :class="{ 'table-warning': user.status && user.vice_info }">
                            <!--  v-tippy="user.status" -->
                            <td>{{ user.last_name }}</td>
                            <td>{{ user.first_name }}</td>
                            <td>{{ user.middle_name }}</td>
                            <td>{{ user.job_info.name ?? 'Нет должности' }}</td>
                            <td style="white-space: nowrap;">{{ formatWorkExperience(user.work_exp) }}</td>
                            <td @click="copyEmail(user.email)" class="email">{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td></td>
                            <td></td>
                            <td>{{ user.department_info?.manager ?? "" }}</td>
                            <td>{{ user.status }}</td>
                            <td>{{ viceInfoShort(user.vice_info) }}</td>
                            <td>{{ user.company }}</td>
                        </tr>
                    </template>

                    <template v-else>
                        <div class="grid_air_block">
                            <div class="grid_element" v-for="user in filteredUsersGrid" :key="user.id">
                                <div class="img_block">
                                    <img src="./assets/user.png" alt="">
                                </div>
                                <div class="text_block">
                                    <div style="width: 30%; margin-left: auto; ">
                                        <img :src="getCurrentPicture(user.company)">
                                    </div>

                                    <!-- <p>{{ user }}</p> -->
                                    <p style="margin-top: 10%;">{{ user.last_name }} {{ user.first_name }}
                                        {{ user.middle_name }}</p>
                                    <p>{{ user.job_info.name }}</p>
                                    <a @click="copyEmail(user.email)" style="color: var(--blue)">Почта: {{ user.email
                                        }}</a>
                                    <p>Тел: {{ user.phone }}</p>


                                </div>

                            </div>
                        </div>
                    </template>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import api from '@/api/user'
import { useLoaderStore } from '@/store/LoaderStore'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'
import { mask } from 'vue-the-mask'
export default {
    directives: { mask },
    setup() {
        const users = ref([]);
        const toast = useToast();
        const search = ref("")
        const filteredUsersList = ref([])
        const filteredUsersGrid = ref([])
        const currentColor = ref("picture")

        const currentCompanyForFilter = ref("Все")


        onMounted(async () => {
            try {
                useLoaderStore().setLoader(true)
                await refreshToken()
                let response = await api.getAllUsers()
                users.value = response.data
                users.value = users.value.sort((a, b) => {
                    return a.last_name.localeCompare(b.last_name)
                })
                filteredUsersList.value = [...users.value]
                filteredUsersGrid.value = [...users.value]

            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            } finally {
                useLoaderStore().setLoader(false)
            }
        })

        const handleSearch = () => {
            const query = search.value.toLowerCase();
            filteredUsersList.value = users.value.filter(user =>
                user.last_name.toLowerCase().includes(query) ||
                user.first_name.toLowerCase().includes(query) ||
                // ( user.department_info &&  user.department_info?.manager?.toLowerCase().includes(query)) ||
                (user.company && user.company.toLowerCase().includes(query)) ||
                (user.job_info && user.job_info.name.toLowerCase().includes(query)) || // Проверяем, существует ли job_info и name
                user.email.toLowerCase().includes(query)
            );
            filteredUsersGrid.value = [...filteredUsersList.value]; // Так как логика фильтрации одинакова, можно просто скопировать результат
            console.log("Данные из фильтра:", filteredUsersList.value)
        }
        const getCurrentPicture = (pic) => {
            if (pic == 'ФАРМТЕК') {
                return new URL(`./assets/farmtec.png`, import.meta.url).href
            } else if (pic == 'ИНТЕЛБИО') {
                return new URL(`./assets/intelbio.png`, import.meta.url).href
            }
        }
        // Слушатель изменения поиск, с параметром для немедленного выполнения обработчика    
        watch(search, handleSearch, { immediate: true })
        watch(currentCompanyForFilter, () => {
            if (currentCompanyForFilter.value == "Фармтек") {
                filteredUsersList.value = users.value.filter(user => user.company == "ФАРМТЕК")
                filteredUsersGrid.value = users.value.filter(user => user.company == "ФАРМТЕК")
            } else if (currentCompanyForFilter.value == "Интелбио") {
                filteredUsersList.value = users.value.filter(user => user.company == "ИНТЕЛБИО")
                filteredUsersGrid.value = users.value.filter(user => user.company == "ИНТЕЛБИО")
            } else {
                filteredUsersList.value = users.value.filter(user => user.company == "ИНТЕЛБИО" || user.company == "ФАРМТЕК")
                filteredUsersGrid.value = users.value.filter(user => user.company == "ИНТЕЛБИО" || user.company == "ФАРМТЕК")

            }
        })
        const changeCurrentDisplayGrid = (color) => {
            currentColor.value = color
        }
        const copyEmail = (email) => {
            navigator.clipboard.writeText(email)
            toast.success(`Почта ${email} скопирована в буфер обмена`, {
                timeout: 3000
            })
        }
    
        const formatWorkExperience = (days) => {
            const years = Math.floor(days / 365);
            const months = Math.floor((days % 365) / 30);

            let result = '';
            if (years > 0) result += `${years} год(а) `;
            if (months > 0) result += `${months} месяц(а)`;
            return result.trim();
        };
        const viceInfoShort = (viceInfo) => {
            if (!viceInfo) return '';

            // Пример преобразования
            return `${viceInfo.split(' ')[0]} ${viceInfo.split(' ')[1].slice(0, 1)}. ${viceInfo.split(' ')[2].slice(0, 1)}.`;
        };
        return {
            users,
            search,
            filteredUsersList,
            filteredUsersGrid,
            toast,
            currentColor,
            currentCompanyForFilter,
            copyEmail,
            changeCurrentDisplayGrid,
            getCurrentPicture,
            viceInfoShort,
            formatWorkExperience,

        }
    },
}
</script>

<style scoped>
@import './style/staff_element_style.scss';
</style>