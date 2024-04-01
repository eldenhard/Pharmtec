<template>
    <div>
        <div class="sidebar_block">
            <div class="sidebar_block__list">
                <ul>
                    <li @click="selectTab('UserStatus', $event.target)" class="first">Статус пользователя</li>

                </ul>

            </div>
           
        </div>
    </div>
</template>

<script>
import { ref, onMounted, Transition } from 'vue';
export default {
    components: {
        
    },
   
    setup(props, context) {
        const isActive = ref(Boolean)

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
        
        // TODO ИЗМЕНЯТЬ АКТИВНУЮ ВКЛАДКУ ЕСЛИ ОНА НЕ ГОРИТ, ИЗ-ЗА МОНТИРОВАНИЯ ПРИЛОЖЕНИЯ
        onMounted(() => {
            isActive.value = true
            setTimeout(() => isActive.value = false, 1500)
            document.querySelector('.first').classList.add('activeItem')
            context.emit('currentActiveTab', 'UserStatus');
        })
        return {
            selectTab,

            isActive
        };
    }
};
</script>
<style scoped>
@import '../../../components/sidebar/style/mainsidebar.scss'
</style>