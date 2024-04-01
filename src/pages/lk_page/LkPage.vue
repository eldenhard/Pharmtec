<template>
    <div class="lkpage_wrapper">
        <SidebarLk @currentActiveTab="received_data = $event" />
        <Transition name="fade" mode="out-in" appear>
            <WorkspaceLk :key="received_data">
                <component :is="received_data" />

            </WorkspaceLk>
        </Transition>
    </div>
</template>


<script>
import { ref } from 'vue'
import SidebarLk from './components/SidebarLk.vue'
import WorkspaceLk from './components/WorkspaceLk.vue'
import UserStatus from './modules/UserStatus.vue'
export default {
    components: {
        SidebarLk,
        WorkspaceLk,
        UserStatus,
    },
    setup() {
        const received_data = ref('');
        return{
            received_data
        }
    },
}
</script>


<style scoped>
@import './assets/styles.scss'
</style>
