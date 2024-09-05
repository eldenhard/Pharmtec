<template>
    <div class="hot_keys_group">
        <hot_key_blue :figcaption="'Все сотрудники'" :classSize="classSize" @click="navigateTo('workspace')"><img
                src="../assets/circle.png" /></hot_key_blue>
        <hot_key_green :figcaption="'Служебные заявки'" :classSize="classSize" @click="navigateTo('service_requests')">
            <img src="../assets/check2.png" alt="">
        </hot_key_green>
        <hot_key_blue :figcaption="'Финансовый отчет'" :classSize="classSize"><img src="../assets/rub3.png" alt="">
        </hot_key_blue>
        <hot_key_green :figcaption="'Служебные автомобили'" :classSize="classSize"><img src="../assets/wheel.png"
                alt="автомобили"></hot_key_green>
        <hot_key_blue :figcaption="'Обучение'" :classSize="classSize"><img src="../assets/graduation.png"
                alt="обучение"></hot_key_blue>
        <hot_key_green :figcaption="'Календарь мероприятий'" :classSize="classSize"><img src="../assets/calendar.png"
                alt="календарь"></hot_key_green>


        <hot_key_green :figcaption="'Электронный каталог'" :classSize="classSize"><img src="../assets/folder.png"
                alt="каталог"></hot_key_green>
        <hot_key_blue :figcaption="'Структура компании'" :classSize="classSize"><img src="../assets/structura.png">
        </hot_key_blue>
        <hot_key_green :figcaption="'Банк файлов'" :classSize="classSize"><img src="../assets/cloudy.png">
        </hot_key_green>
        <hot_key_blue :figcaption="'Документы охрана труда'" :classSize="classSize"><img src="../assets/warning.png">
        </hot_key_blue>
        <hot_key_green :figcaption="'Приказы инструкции'" :classSize="classSize"><img src="../assets/mark.png">
        </hot_key_green>
        <hot_key_blue :figcaption="'График отпусков'" :classSize="classSize"><img src="../assets/graphik.png">
        </hot_key_blue>

    </div>
</template>


<script setup>
import hot_key_blue from '../ui/hot_key_blue_ui.vue'
import hot_key_green from '../ui/hot_key_green_ui.vue'
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const classSize = ref("m_size");
const router = useRouter();

const width = ref(window.innerWidth);
const resizeHandler = () => {
    width.value = window.innerWidth;
    if (width.value < 1090) {
        classSize.value = "l_size";
    } else {
        classSize.value = "m_size";
    }
};

onMounted(() => {
    window.addEventListener('resize', resizeHandler);
    // Установим начальное значение класса на основе текущей ширины
    resizeHandler();
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler);
});
const navigateTo = (name) => {
    router.push(name)
}



</script>

<style scoped>
.hot_keys_group {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: start;
    /* Выравнивание по верхнему краю */
}
@media screen and (max-width: 800px) {
    .hot_keys_group {
        grid-template-columns: repeat(4, 1fr);
        margin-top: 10% !important;
    }
    .l_size img{
       width: 70%;
    }
}
.bi {
    color: white;
    font-size: 2.2rem;
}
</style>