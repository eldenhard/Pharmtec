<template>
    <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#' + idItem" aria-expanded="false" :aria-controls="idItem">
                    {{ type }}
                </button>
            </h2>
            <div :id="idItem" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">

                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation" v-for="(item, index) in list_category" :key="index">
                            <button class="nav-link" :class="{ 'active': activeTab === index }"
                                :id="`pills-${idItem}-tab-${index}`" data-bs-toggle="pill" @click="activeTab = index"
                                type="button" role="tab" :aria-controls="`pills-${idItem}-${index}`" aria-selected="true">{{
                                    item }}</button>
                        </li>

                    </ul>
                    <div class="tab-content" id="`pills-tabContent`">
                        <div class="tab-pane fade" :class="{ 'show active': activeTab === index }"
                            :id="`pills-${idItem}-${index}`" role="tabpanel"
                            :aria-labelledby="`pills-${idItem}-tab-${index}`" v-for="(item, index) in list_category"
                            :key="index">
                            <div class="date_block">
                                <InputComponent :labelValue="'Дата начала'" :typeInput="'date'" v-model="start_date"/>
                                <InputComponent :labelValue="'Дата окончания'" :typeInput="'date'" v-model="end_date"/>
                            </div>
                            <div class="comment_block">
                                <textarea name="" id=""  rows="10" placeholder="Комментарий"></textarea>
                            </div>
                            {{ item }}
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue'

export default {
    components: {InputComponent},
    props: {
        type: {
            type: String,
        },
        idItem: {
            type: String,
        },
        list_category: {
            type: Array
        }
    },
    setup() {
        let activeTab = ref(0)
        let start_date = ref(null)
        let end_date = ref(null)
        return {
            activeTab,
            start_date,
            end_date
        }
    },
}
</script>

<style scoped>
@import './style/order.scss';
</style>