<template>
    <div class="air_block">
        <div class="header_element">Зарегистрированные товарные знаки
            <hr>
        </div>
        <input type="search" v-model="search" class="search_on_table" placeholder="Поиск...">
        <div class="air_block__table">

            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Описание</th>
                        <th>Классы МКТУ</th>
                        <th>№ заявки</th>
                        <th>№ регистрации</th>
                        <th>Владелец</th>
                        <th>Статус</th>
                        <th>Действует до</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filtereditemsList" :key="item.registration_number">
                        <td>
                            <input type="text" v-model="item.description"
                                @keydown.enter="saveNewCell(item, 'description', $event)">
                        </td>
                        <td>
                            <input type="text" v-model="item.mktu_cls"
                            @keydown.enter="saveNewCell(item, 'mktu_cls', $event)"
                            >
                        </td>
                        <td>
                            <input type="text" v-model="item.order_number"
                            @keydown.enter="saveNewCell(item, 'order_number', $event)"
                            >
                        </td>
                        <td>
                            <input type="text" v-model="item.registration_number"
                            @keydown.enter="saveNewCell(item, 'registration_number', $event)">
                        </td>
                        <td>{{ item.owner }}
                        </td>
                        <td>{{ item.status == 'active' ? 'Активен' : 'Просрочен' }}</td>
                        <td>
                            <input type="date" v-model="item.valid_until"
                            @keydown.enter="saveNewCell(item, 'valid_until', $event)"
                            >
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import api from '@/api/products'
import { useLoaderStore } from '@/store/LoaderStore'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'

export default {
    setup() {
        const sertificate = ref([]);
        const filtereditemsList = ref([])

        const toast = useToast();
        const search = ref("")




        onMounted(async () => {
            getDataAboutSertificate()
        })
        const getDataAboutSertificate = async () => {
            try {
                useLoaderStore().setLoader(true)
                await refreshToken()
                let response = await api.getAllProducts()
                sertificate.value = response.data.filter((item) => {
                    return item.description !== null && item.owner !== null
                })

                sertificate.value = sertificate.value.sort((a, b) => {
                    return a.description.localeCompare(b.description)
                })
                filtereditemsList.value = [...sertificate.value]

            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            } finally {
                useLoaderStore().setLoader(false)
            }
        }
        const handleSearch = () => {
            const query = search.value.toLowerCase();
            filtereditemsList.value = sertificate.value.filter(item =>
                item?.description.toLowerCase().includes(query) ||
                item?.owner.toLowerCase().includes(query)
            );
        }
        const saveNewCell = async (item, cell, event) => {
            try {
                useLoaderStore().setLoader(true)
                await refreshToken()
                await api.changeOneCellInTAble(item.id, { [cell]: item[cell] })
                setTimeout(() => {
                    useLoaderStore().setLoader(false)
                    toast.success(`Данные успешно отредактированы`, {
                        timeout: 3000
                    })
                }, 1300)
                event.target.blur()

            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не отредактированы`, {
                    timeout: 3000
                })
            } finally {
                setTimeout(() => {
                    useLoaderStore().setLoader(false)
                }, 1300)
            }
        }

        // Слушатель изменения поиск, с параметром для немедленного выполнения обработчика    
        watch(search, handleSearch, { immediate: true })




        return {
            saveNewCell,
            search,
            filtereditemsList,
            toast,
        }
    },
}
</script>

<style scoped>
@import './style/staff_element_style.scss';
</style>