<template>
    <div class="air_block w60" >
        <p class="header_element">Изменение статуса пользователя</p>
        <hr>
        <div class="content">
            <div class="input-box">
                <label>ФИО</label>
                <input type="text" name="full_name" disabled>
            </div>
            <div class="input-box">
                <label>Статус</label>
                <select >
                    <option value="Больничный">Больничный</option>
                    <option value="Командировка">Командировка</option>
                    <option value="Отпуск">Отпуск</option>
                </select>
            </div>
            <div class="users_block">
                <div class="input-box">
                    <label style="background: white !important; position: absolute; z-index:1;">Заменяющий</label>
                    <v-select v-model="substitute_person" :options="all_users" label="full_name" required />
                </div>
            </div>
        </div>
        <ButtonComponent type="submit" >Сохранить</ButtonComponent>
    </div>
</template>


<script>
import { ref, onMounted, watch } from 'vue';
import api from '@/api/user'
import { useLoaderStore } from '@/store/LoaderStore'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'
import InputComponent from '../../../ui/inputComponent/InputComponent.vue';
import ButtonComponent from '../../../ui/button/buttonComponent.vue';
export default {
    components: {
        InputComponent,
        ButtonComponent,
    },
    setup() {
        const $TOAST = useToast()
        const all_users = ref([])
        const substitute_person = ref('')
        onMounted(async () => {
            useLoaderStore().setLoader(true)
            await refreshToken()
            try {
                let response = await api.getAllUsers()
                all_users.value = response.data.reduce((acc, el) => {
                    let full_name = `${el.last_name} ${el.first_name} ${el.middle_name}`
                    return [...acc, { ...el, full_name }]
                }, []).sort((a, b) => a.full_name.localeCompare(b.full_name))
                $TOAST.success("Пользователи загружены", {
                    timeout: 2000
                })
            } catch (err) {
                $TOAST.error(`Произошла ошибка при загрузке пользователей\n ${err.response.data}`, {
                    timeout: 3000
                })
            } finally {
                useLoaderStore().setLoader(false)
            }
        })
        return{
            all_users,
            substitute_person
        }
    },
}
</script>

<style scoped>
@import '../../../styles/commonMixins.scss';


.content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
</style>