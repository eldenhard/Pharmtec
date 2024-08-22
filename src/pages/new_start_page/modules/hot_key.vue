<template>
    <div class="hot_keys_group">
        <hot_key_blue :figcaption="'Все сотрудники'" :classSize="'m_size'" @click="navigateTo('workspace')"><img src="../assets/circle.png"/></hot_key_blue>
        <hot_key_green :figcaption="'Служебные заявки'" :classSize="'m_size'" @click="navigateTo('service_requests')"><img src="../assets/check2.png" alt=""></hot_key_green>
        <hot_key_blue :figcaption="'Финансовый отчет'" :classSize="'m_size'"><img src="../assets/rub3.png" alt=""></hot_key_blue>
        <hot_key_green :figcaption="'Служебные автомобили'" :classSize="'m_size'"><img src="../assets/wheel.png" alt="автомобили"></hot_key_green>
        <hot_key_blue :figcaption="'Обучение'" :classSize="'m_size'"><img src="../assets/graduation.png" alt="обучение"></hot_key_blue>
        <hot_key_green :figcaption="'Календарь мероприятий'" :classSize="'m_size'"><img src="../assets/calendar.png" alt="календарь"></hot_key_green>
        
        
        <hot_key_green :figcaption="'Электронный каталог'" :classSize="'m_size'"><img src="../assets/folder.png" alt="каталог"></hot_key_green>
        <hot_key_blue :figcaption="'Структура компании'" :classSize="'m_size'"><img src="../assets/structura.png" ></hot_key_blue>
        <hot_key_green :figcaption="'Банк файлов'" :classSize="'m_size'"><img src="../assets/cloudy.png" > </hot_key_green>
        <hot_key_blue :figcaption="'Документы охрана труда'" :classSize="'m_size'"><img src="../assets/warning.png" ></hot_key_blue>
        <hot_key_green :figcaption="'Приказы инструкции'" :classSize="'m_size'"><img src="../assets/mark.png" ></hot_key_green>
        <hot_key_blue :figcaption="'График отпусков'" :classSize="'m_size'"><img src="../assets/graphik.png" ></hot_key_blue>

    </div>
</template>


<script>
import hot_key_blue from '../ui/hot_key_blue_ui.vue'
import hot_key_green from '../ui/hot_key_green_ui.vue'
import { useRouter } from 'vue-router';


export default {
    components: {
        hot_key_blue,
        hot_key_green
    },
    setup() {
        const router = useRouter();
        const navigateTo = (name) => {
            router.push(name)
        }

        return{
            navigateTo
        }
    },
}
</script>

<style scoped>
.hot_keys_group {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: start; /* Выравнивание по верхнему краю */
}
.bi{
   color: white; font-size: 2.2rem;
}

</style>