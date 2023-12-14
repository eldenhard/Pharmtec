<template>
    <div>
        <div class="sidebar_block">
            <div class="sidebar_block__list">
                <ul>
                    <li @click="selectTab('companyStructure', $event.target)">Структура компании</li>
                    <li @click="selectTab('Applications', $event.target)">Заявки</li>
                    <li @click="selectTab('FinReport', $event.target)">Финансовый отчет</li>
                    <li @click="selectTab('booking', $event.target)">Бронирование переговорной</li>
                    <li @click="selectTab('forManagment', $event.target)">Для руководителя</li>
                    <li @click="selectTab('ApproveApplication', $event.target)">Подтверждение заявок</li>
                    <li @click="selectTab('ForAdmin', $event.target)">Для администратора</li>
                </ul>
            </div>
            <div class="sidebar_block__news">
                <ul>
                    <li>Новости</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineEmits } from 'vue';

export default {
    setup(props, context) {
      
        const selectTab = (data, el) => {
            document.querySelectorAll('.sidebar_block__list li').forEach(item => {
                item.classList.remove('activeItem');
            });
            el.classList.add('activeItem');
            context.emit('someEvent', data);
        };

        return {
            selectTab
        };
    }
};
</script>
<style scoped>
@import './style/mainsidebar.scss'
</style>