<template>
    <form name="formSendOrderToServer" class="accordion accordion-flush" id="accordionFlushExample">
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
                                type="button" role="tab" :aria-controls="`pills-${idItem}-${index}`" aria-selected="true">{{ item }}</button>
                        </li>

                    </ul>
                    <div class="tab-content" id="`pills-tabContent`">
                        <div class="tab-pane fade" :class="{ 'show active': activeTab === index }"
                            :id="`pills-${idItem}-${index}`" role="tabpanel"
                            :aria-labelledby="`pills-${idItem}-tab-${index}`" v-for="(item, index) in list_category"
                            :key="index">
                            <div class="date_block">
                                <InputComponent 
                                :labelValue="'Дата начала'" 
                                :typeInput="'date'" 
                                @update:modelValue="start_date = $event"
                               />
                                <InputComponent 
                                :labelValue="'Дата окончания'" 
                                :typeInput="'date'"
                                @update:modelValue="end_date = $event" 
                                />
                            </div>
                            <div class="comment_block">
                                <textarea v-model="comment" rows="6" placeholder="Комментарий"></textarea>
                            </div>
                            <drop_zone />
                            <buttonComponent  @click.prevent="sendOrderToServer(item)">Отправить</buttonComponent>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </form>
</template>

<script>
import { ref } from 'vue'
import api from '../../api/orders'
import InputComponent from '../../ui/inputComponent/InputComponent.vue'
import buttonComponent from '../../ui/button/buttonComponent.vue'
import drop_zone from '../drop_zone/drop_zone.vue'
export default {
    components: { InputComponent, buttonComponent, drop_zone },
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
    setup(props) {
        const activeTab = ref(0)
        const start_date = ref("")
        const end_date = ref("")
        const comment = ref("")
        let objDataConversation = {
            order_vacation: 'Заявка на отпуск',
            order_medical: 'Заявка на больничный',
            order_business_trip:'Заявка на командировку',
            order_duty_journey:'Заявка на служебную поездку',
            order_changing_perdata:'Изменение личных данных',
            order_dismissal:'Увольнение'
        }
        let checkData = function(data) {
             start_date.value = data
            }
        let sendOrderToServer = function (subTab) {
            let activeMainTab = Object.keys(objDataConversation).find((key) => objDataConversation[key] == props.type)
            console.log(start_date)
            let dataObject = {
                start_date: start_date.value,
                end_date: end_date.value,
                comment: comment.value,
                kind: activeMainTab,
                sub_kind: subTab
            }
            let formData = new FormData()
            for(let i in dataObject){
                formData.append(i, dataObject[i])
            }
        api.createNewOrder(formData)
        .then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
        }

        return {
            activeTab,
            start_date,
            end_date,
            comment,

            // funcstion`s
            sendOrderToServer,
            checkData
        }
    },
}
</script>

<style scoped>
@import './style/order.scss';
</style>