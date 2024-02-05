<template>
    <div>
        <modal :modalTitle="modalTitle" :isModal="isModal">
            <div class="block_info">
                {{ data_by_field }}
                <div class="input-box">
                    <label>Дата</label>
                    <input type="date" v-model="newStartDate">
                </div>
                <div class="time">
                    <div class="start_date">
                        <span>c</span>
                        <div class="input-box">
                            <label>Часы</label>
                            <select v-model="start_hour">
                                <template v-for="i, index in 19">
                                    <option :value="i" v-if="i > 7" :key="index">{{ i == 8 || i == 9 ? '0' + i : i}}</option>
                                </template>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>Минуты</label>
                            <select v-model="start_minute">
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                    <div class="end_date">
                        <span>по</span>
                        <div class="input-box">
                            <label>Часы</label>
                            <select v-model="end_hour">
                                <template v-for="i, index in 19">
                                    <option :value="i" v-if="i > 7" >{{ i == 8 || i == 9 ? '0' + i : i }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="input-box">
                            <label>Минуты</label>
                            <select v-model="end_minute">
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                </div>
                <textarea rows="5" class="textarea" placeholder="Комментарий"></textarea>
                <!-- <label for="">Дата <br>
                    <input type="text" :value="data_by_field !== null ? data_by_field.start.split('T')[0].slice(0, 10) : ''"  ><br>
                </label>
                <div class="time">
                    <label for="">Часы
                        <br>
                        <input type="text" :value="data_by_field !== null ?data_by_field.start.split('T')[1].slice(0, 5): ''" >
                    </label>
                    <label for="">Минуты
                        <br>
                        <input type="text" :value="data_by_field !== null ?data_by_field.end.split('T')[1].slice(0,5): ''" >
                    </label> -->


                <!-- </div> -->
            </div>
        </modal>
        <div class="air_block" style="max-height: 90vh; overflow: hidden;">
            <FullCalendar :options="calendarOptions" style="max-height: 70vh;" data-bs-toggle="modal"
                data-bs-target="#exampleModal" />
            <buttonComponent @click="saveCurrentShedule()">Сохранить</buttonComponent>
        </div>
    </div>
</template>

<style scoped>
@import './style/shedule.scss';
</style>

<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import FullCalendar from '../../../node_modules/@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '../../../node_modules/@fullcalendar/interaction';
import listPlugin from '../../../node_modules/@fullcalendar/list';
import localeRu from '../../../node_modules/@fullcalendar/core/locales/ru';
import { ref, reactive, watch } from 'vue';
import { useToast } from "vue-toastification";
import modal from '../../ui/modal/modal.vue';
export default {
    components: {
        FullCalendar,
        buttonComponent,
        modal,
    },
    setup() {
        const toast = useToast();
        const modalTitle = ref("")
        const data_by_field = ref(null)
        const isModal = ref(false)
        const newStartDate = ref("")
        const start_hour = ref("")
        const start_minute = ref("")
        const end_hour = ref("")
        const end_minute = ref("")
        let movedEvent = null // Флаг перемещенного события
        // Хранение данных
        const events = ref([]);

        // Конфигурация
        const calendarOptions = reactive({
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            plugins: [resourceTimeGridPlugin, interactionPlugin, listPlugin],
            weekends: false,
            //   Возможность выделения области
            selectable: true,
            //   Начальный вид - график на 4 дня
            initialView: 'resourceTimeGridFourDay',
            //   Верхняя панель инструментов
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'resourceTimeGridDay,resourceTimeGridFourDay',
            },
            views: {
                resourceTimeGridFourDay: {
                    type: 'resourceTimeGrid',
                    duration: { days: 4 },
                    buttonText: '4 дня',
                },
            },
            resources: [{ id: '1a', title: 'Переговорная комната' }],
            select: (selectInfo) => {
                data_by_field.value = {
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    resourceId: '1a',
                }
                const start = new Date(data_by_field.value.start);
                const end = new Date(data_by_field.value.end);
                newStartDate.value = selectInfo.startStr.split('T')[0].slice(0, 10)
                start_hour.value = new Date(selectInfo.startStr).getHours()
                start_minute.value = start.getMinutes().toString().padStart(2, '0')
                end_hour.value = new Date(selectInfo.endStr).getHours()
                end_minute.value = end.getMinutes().toString().padStart(2, '0')
                console.log(start_hour.value, end_hour.value)
                modalTitle.value = 'Создание нового события'
                isModal.value = true
                // const title = prompt('Введите название события 1');
                // if (title) {
                //     const newEvent = {
                //         title: title,
                //         start: selectInfo.startStr,
                //         end: selectInfo.endStr,
                //         resourceId: '1a',
                //     };
                //     events.value.push(newEvent);
                // }
            },
            eventAdd: (addInfo) => {
                const title = prompt('Введите название события 2');
                if (!title) {
                    addInfo.event.remove();
                } else {
                    addInfo.event.setProp('title', title);
                }
            },
            //   Обработчик перетаскивания события
            eventDrop: (eventDropInfo) => {
                const movedEventIndex = events.value.findIndex((event) => event.id === movedEvent);
                if (movedEventIndex !== -1) {
                    movedEvent = events.value[movedEventIndex];
                    if (movedEvent.resourceId === '1a') {
                        const title = prompt('Название');
                        if (title) {
                            movedEvent.title = title;
                            movedEvent.start = eventDropInfo.dateStr;
                            movedEvent.end = eventDropInfo.dateStr;
                            events.value.splice(movedEventIndex, 1, movedEvent);
                        } else {
                            movedEvent.start = eventDropInfo.oldEvent.start;
                            movedEvent.end = eventDropInfo.oldEvent.end;
                        }
                        movedEvent = null;
                    }
                }

                // Обновление selectInfo
                calendarOptions.selectInfo = {
                    start: eventDropInfo.date,
                    end: eventDropInfo.date,
                    startStr: eventDropInfo.dateStr,
                    endStr: eventDropInfo.dateStr
                };
            },
            events: events.value,
            // Разбивка на часы и мин
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: false,
            },
            editable: true, // Включаем возможность редактирования событий
            droppable: true, // Включаем возможность перетаскивания событий
            //   Обработчик доабвления события при перетаскивании на календарь
            eventReceive: (eventReceiveInfo) => {

                const title = prompt('Введите название события 3');
                if (title) {
                    const newEvent = {
                        title: title,
                        start: eventReceiveInfo.dateStr,
                        end: eventReceiveInfo.dateStr,
                        resourceId: '1a',
                        removable: true, // Добавим свойство removable
                    };
                    events.value.push(newEvent);
                    // Сброс флага перемещения
                    movedEvent = null;
                }
            },
        
            slotMinTime: '08:00',
            slotMaxTime: '20:00',

            locale: localeRu,
        });

        const saveCurrentShedule = () => {
            toast.info('Раздел находится в разработке. Сохранение невозможно', {
                timeout: 3000
            })
        }
        return {
            calendarOptions,
            events,
            saveCurrentShedule,
            toast,
            movedEvent,
            modalTitle,
            isModal,
            data_by_field,
            newStartDate,
            start_hour,
            start_minute,
            end_hour,
            end_minute,
        };
    },
};
</script>