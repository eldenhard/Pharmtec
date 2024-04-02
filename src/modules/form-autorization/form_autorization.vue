<template>
    <div>
        <vue-final-modal v-model="isModal" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="isModal = false">
                <i class="bi bi-x-lg"></i>
            </button>
            <div class="flex" style="display: flex; justify-content: space-between; margin-top: 2%;">
                <span class="modal__title">{{ enter_password ? 'Получение пароля' : `Смена пароля` }}</span>
                <span class="timer">{{ enter_password ? '' : `Осталось времени: ${formattedTime}` }}</span>
            </div>
            <div class="block_info" v-if="enter_password">
                <InputComponent v-model="emailForPassword" :labelValue="'Адрес электронной почты'" :typeInput="'email'" />
                <buttonComponent @click.prevent="sendEmailForGetNewPassword()">Получить пароль</buttonComponent>
            </div>
            <div class="block_info" v-else>
                <InputComponent v-model="oldPassword" :labelValue="'Одноразовый код входа'" :typeInput="'text'" />
                <InputComponent v-model="newPassword" :labelValue="'Новый пароль'" :typeInput="'text'" />
                <buttonComponent @click="changePassword()">Сохранить</buttonComponent>
            </div>
        </vue-final-modal>


        <div class="reg_block">

            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <form class="autorization_form">
                        <p class="enter">Войти</p>
                        <InputComponent v-model="emailInput" :labelValue="'Email / логин'" :typeInput="'text'" />
                        <InputComponent v-model="passwordInput" :labelValue="'Пароль'" :typeInput="'password'" />
                        <a class="change_password" @click="isModal = !isModal">Получить пароль</a>
                        <buttonComponent :disabledButton="disabledButton" @click="setTokenUser">Войти</buttonComponent>
                    </form>
                </div>


            </div>



        </div>
    </div>
</template>
  
<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import { ref, watch, onBeforeUnmount, onMounted, computed } from 'vue';
import api from '../../api/user'
import { useToast } from "vue-toastification";
import { useLoaderStore } from '../../store/LoaderStore'
import { useRouter } from 'vue-router'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { useCurrentUserId } from '@/store/CurrentUserId'
export default {
    components: {
        buttonComponent, InputComponent, VueFinalModal,
        ModalsContainer
    },
    setup() {
        const router = useRouter()
        const emailForPassword = ref("")
        const toast = useToast();
        const disabledButton = ref(true);
        const emailInput = ref('');
        const passwordInput = ref('');
        const emailInputRegistration = ref('')
        const passwordInputRegistration = ref('')
        const oldPassword = ref("")
        const newPassword = ref("")
        const isModal = ref(false)
        const enter_password = ref(true)
        const minutes = ref(15);
        const seconds = ref(0);
        let timer;
        const current_user_id_store = useCurrentUserId()
        const startTimer = () => {
            timer = setInterval(() => {
                if (seconds.value > 0) {
                    seconds.value--;
                } else if (minutes.value > 0) {
                    minutes.value--;
                    seconds.value = 59;
                } else {
                    clearInterval(timer);
                    toast.error('Время истекло! Запросите новый пароль', {
                        timeout: 1400
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                }
            }, 1000);
        };

        const formattedTime = computed(() => {
            const mins = String(minutes.value).padStart(2, '0');
            const secs = String(seconds.value).padStart(2, '0');
            return `${mins}:${secs}`;
        });



        onBeforeUnmount(() => {
            clearInterval(timer);
        });
        // Обработка активности кнопки
        watch([emailInput, passwordInput], () => {
            disabledButton.value = emailInput.value.trim() === '' || passwordInput.value.trim() === '';
        });


        let setTokenUser = async (event) => {
            event.preventDefault();
            useLoaderStore().setLoader(true);
            try {
                let objEnter = {
                    username: emailInput.value,
                    password: passwordInput.value
                };
                let response = await api.getUserJWTToken(objEnter);
                localStorage.setItem('accessToken', JSON.stringify(response.data.access));
                localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh));
                current_user_id_store.setCurrentUserId()
                router.push({ path: 'about-company' });
            } catch (err) {
                toast.error(`Не найдено активной учетной записи с указанными данными`, {
                    timeout: 3000
                });

            } finally {
                useLoaderStore().setLoader(false);
            }
        };
        // Отправка email для получения пароля
        const sendEmailForGetNewPassword = async () => {

            if (emailForPassword.value === "") {
                toast.error(`Необходимо ввести адрес электронной почты`, {
                    timeout: 3000
                })
                return
            }
            useLoaderStore().setLoader(true)
            let objData = {
                email: emailForPassword.value
            }
            try {
                let response = await api.sendEmailForGetNewPassword(objData)
                enter_password.value = false
                startTimer()
                if (response.status === 200) {
                    toast.success('Письмо отправлено. Зайдите в почту и введите ваш пароль для входа', {
                        timeout: 3000
                    })
                }

            } catch (err) {
                console.log(err)
                toast.error('Произошла ошибка при отправке письма', {
                    timeout: 3000
                })
                isModal.value = false
            } finally{
                useLoaderStore().setLoader(false)
            }


        }
        // Смена пароля пользователя при помощи одноразового пароля
        const changePassword = async () => {

            try {
                let objChangePassword = {
                    nonce: oldPassword.value,
                    password: newPassword.value
                };
                let response = await api.changePassword(objChangePassword);
                toast.success('Пароль успешно изменен', {
                            timeout: 3000
                        });
            } catch (err) {
                if (err.response) {
                    // Если есть ответ с сервера, то получаем текст ошибки из ответа
                    if (err.response.data && err.response.data.detail) {
                        toast.error(err.response.data.detail, {
                            timeout: 3000
                        });
                    } else {
                        // Если в ответе нет деталей ошибки, выводим общее сообщение об ошибке
                        toast.error('Произошла ошибка при изменении пароля.', {
                            timeout: 3000
                        });
                    }
                } else {
                    // Если ответа от сервера нет, то выводим общее сообщение об ошибке
                    toast.error('Произошла ошибка при отправке запроса.', {
                        timeout: 3000
                    });
                }
            }
        };
        return {
            router,
            disabledButton,
            emailInput,
            passwordInput,
            emailInputRegistration,
            passwordInputRegistration,
            oldPassword,
            newPassword,
            isModal,
            emailForPassword,
            enter_password,
            // functions
            setTokenUser,
            sendEmailForGetNewPassword,
            changePassword,
            formattedTime,

        };
    },
};
</script>

<style scoped>
@import './style/form_autorization_style.scss';
</style>

