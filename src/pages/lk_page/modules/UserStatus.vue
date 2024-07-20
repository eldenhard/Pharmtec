<template>
    <div class="air_block w60">
        <p class="header_element">Изменение статуса пользователя</p>
        <hr>
        <div class="content">
            <div class="input-box">
                <label>ФИО</label>
                <input type="text" name="full_name" :value="full_name_current_user" disabled>
            </div>
            <div class="input-box">
                <label>Статус</label>
                <select v-model="user_status">
                    <option value="Больничный">Больничный</option>
                    <option value="Командировка">Командировка</option>
                    <option value="Отпуск">Отпуск</option>
                    <option value="Работает">Работает</option>
                </select>
            </div>
            <div class="users_block">
                <div class="input-box">
                    <label style="background: white !important; position: absolute; z-index:1;">Заменяющий</label>
                    <v-select v-model="substitute_person" :options="all_users" label="full_name" required />
                </div>
            </div>
        </div>
        <ButtonComponent type="submit" @click="saveNewStatusUser()">Сохранить</ButtonComponent>
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
import { useCurrentUserId } from '@/store/CurrentUserId'
import { storeToRefs } from 'pinia'
export default {
    components: {
        InputComponent,
        ButtonComponent,
    },
    setup() {
        const $toast = useToast()
        const all_users = ref([])
        const current_user = ref([])
        const substitute_person = ref('')
        const full_name_current_user = ref('')
        const user_status = ref('')

        const $STORE = useCurrentUserId()
        const { current_user_id } = storeToRefs($STORE)
        onMounted(async () => {
            useLoaderStore().setLoader(true)
            await refreshToken()
            try {
                let user_by_id = await api.getUserById(current_user_id.value)
                current_user.value = user_by_id.data
                user_status.value = user_by_id.data.status
                full_name_current_user.value = `
                    ${user_by_id.data.last_name || ""} 
                    ${user_by_id.data.first_name || ""} 
                    ${user_by_id.data.middle_name || ""} 
                    ${user_by_id.data.email || ""}
                `.trim()

                let response = await api.getAllUsers()
                all_users.value = response.data.reduce((acc, el) => {
                    let full_name = `${el.last_name} ${el.first_name} ${el.middle_name}`
                    return [...acc, { ...el, full_name }]
                }, []).sort((a, b) => a.full_name.localeCompare(b.full_name))
                $toast.success("Пользователи загружены", {
                    timeout: 2000
                })
            } catch (err) {
                $toast.error(`Произошла ошибка при загрузке пользователей\n ${err.response.data}`, {
                    timeout: 3000
                })
            } finally {
                useLoaderStore().setLoader(false)
            }
        })

        const saveNewStatusUser = async () => {
            try {
                useLoaderStore().setLoader(true)
                let queryParams
                if(user_status.value === "Работает"){
                    queryParams =  {  status: user_status.value }
                } else {
                    queryParams =  {  status: user_status.value, vice: substitute_person.value.id }
                }

                let response = api.putUserById(current_user_id.value, queryParams)
                $toast.success("Статус пользователя изменен", {
                    timeout: 2000
                })
            }
            catch (err) {
                $toast.error(`Ошибка!\nСтатус пользователя не изменен\n${err.response.data}`, {
                    timeout: 3000
                })
            }
            finally {
                useLoaderStore().setLoader(false)
            }
        }

        return {
            all_users,
            substitute_person,
            current_user,
            full_name_current_user,
            user_status,

            saveNewStatusUser,
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