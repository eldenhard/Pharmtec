<template>
    <div>
        <div class="sidebar_block">
            <div class="sidebar_block__list">
                <ul style="margin: -5% 0 0 -5%;" class="mobile_settings">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0069A7"
                            class="bi bi-gear-fill" viewBox="0 0 16 16">
                            <path
                                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>

                    </li>

                </ul>
                <ul>

                    <li @click="selectTab('booking', $event.target)">Бронирование переговорной</li>
                    <!-- <li @click="selectTab('ForAdmin', $event.target)">Для администратора</li> -->
                    <li @click="selectTab('Applications', $event.target)">Заявки</li>
                    <li @click="selectTab('ApproveApplication', $event.target)" class="first">Подтверждение заявок</li>
                    <li @click="selectTab('ApproveApplicationBookkeeping', $event.target)">Подтверждение заявок (бух.)</li>
                    <li @click="navigateTo('lk')">Статус пользователя</li>
                    <li @click="selectTab('createLimits', $event.target)">Статьи финансового отчета</li>
                    <li @click="selectTab('informationAboutProducts', $event.target)">Товарные знаки</li>
                    <li @click="selectTab('FinReport', $event.target)">Финансовый отчет</li>
                </ul>

            </div>
            <!-- <div class="sidebar_block__news">
                <miniloader :isActiveMiniLoader="isActive" />
                <ul>
                    <li @click="selectTab('News', $event.target)">Новости</li>
                </ul>
            </div> -->
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineEmits } from 'vue';
import miniloader from '../../ui/miniloader/miniloader.vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        miniloader,
    },
    setup(props, context) {
        const isActive = ref(Boolean)
        const route = useRouter();
        const navigateTo = (name) => {
            route.push(name)
        }
        const selectTab = (data, el) => {
            document.querySelectorAll('.sidebar_block__list li').forEach(item => {
                item.classList.remove('activeItem');
            });
            if (document.querySelectorAll('.activeItem').length > 0) {
                document.querySelectorAll('.activeItem').forEach(item => {
                    item.classList.remove('activeItem');
                });
            }
            el.classList.add('activeItem');
            context.emit('someEvent', data);

        };
        onMounted(() => {
            isActive.value = true
            setTimeout(() => isActive.value = false, 1500)
            document.querySelector('.first')?.classList.add('activeItem')
            context.emit('someEvent', 'ApproveApplication');
        })
        return {
            selectTab,
            navigateTo,
            isActive
        };
    }
};
</script>
<style scoped>
@import './style/mainsidebar.scss'
</style>