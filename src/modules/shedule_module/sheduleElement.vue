<template>
    <div>
        <vue-final-modal v-model="isModal" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="isModal = false">
                <i class="bi bi-x-lg"></i>
            </button>
            <span class="modal__title">Подтверждение заявки</span>
            <div class="block_info">
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
                                    <option :value="i" v-if="i > 7" :key="index">{{ i == 8 || i == 9 ? '0' + i : i }}
                                    </option>
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
                                    <option :value="i" v-if="i > 7">{{ i == 8 || i == 9 ? '0' + i : i }}</option>
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
                <textarea rows="5" class="textarea" placeholder="Комментарий" v-model="title"></textarea>
                <buttonComponent @click="saveDataHandle()">Сохранить</buttonComponent>
            </div>
        </vue-final-modal>
        <div class="air_block" style="max-height: 90vh; overflow: hidden;">
            <FullCalendar :options="calendarOptions" style="max-height: 70vh;" />
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
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { useToast } from "vue-toastification";
import modal from '../../ui/modal/modal.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
export default {
    components: {
        FullCalendar,
        buttonComponent,
        modal,
        VueFinalModal,
        ModalsContainer
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
        const title = ref("")
        const resourceIdForCreateEvent = ref("")
        const isSaveValueFromModal = ref("")
        let movedEvent = null // Флаг перемещенного события
        // Хранение данных
        const events = ref([]);
        const saveDataHandle = (data) => {
            if (start_hour.value < 10) {
                start_hour.value = `0${start_hour.value}`
            }
            if (end_hour.value < 10) {
                end_hour.value = `0${end_hour.value}`
            }
            const newEvent = {
                title: title.value,
                start: `${newStartDate.value}T${start_hour.value}:${start_minute.value}:00+03:00`,
                end: `${newStartDate.value}T${end_hour.value}:${end_minute.value}:00+03:00`,
                resourceId: resourceIdForCreateEvent.value,
            };

            events.value.push(newEvent);
            isModal.value = false
        }
        // Конфигурация
        const calendarOptions = ref({
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            plugins: [resourceTimeGridPlugin, interactionPlugin, listPlugin, dayGridPlugin, multiMonthPlugin],
            weekends: false,
            //   Возможность выделения области
            selectable: true,
            //   Начальный вид - график на 4 дня
            initialView: 'resourceTimeGridFourDay',

            //   Верхняя панель инструментов
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimeGridDay,resourceTimeGridFourDay dayGridMonth multiMonthYear',
            },
            views: {
                resourceTimeGridFourDay: {
                    type: 'resourceTimeGrid',
                    duration: { days: 4 },
                    buttonText: '4 дня',
                },
                dayGridMonth: {
                    type: 'resourceTimeGrid',
                    duration: { month: 1 },
                    buttonText: '1 месяц',
                }
            },
            eventOverlap: false,
            resources: [{ id: '1a', title: 'Переговорная комната 2 этаж' },
            { id: '2a', title: 'Переговорная комната 5 этаж' }],
            dateClick: (info) => {
                if (info.view.type === 'dayGridMonth' || info.view.type === 'multiMonthYear') {
                    
                    info.view.calendar.changeView('resourceTimeGridDay');
                    console.log(info.date)
                    info.view.calendar.gotoDate(info.date)
                    // calendarOptions.initialView = 'day'
                    // calendarOptions.selectInfo = {
                    //     start: info.date,
                    //     end: info.date,
                    //     startStr: info.dateStr,
                    //     endStr: info.dateStr
                    // }
                }
                // if (!info.event) {
                //     modalTitle.value = 'Создание нового события'
                //     isModal.value = true
                // }
            },
            select: (selectInfo) => {
                const resourceId = selectInfo.resource.id
                data_by_field.value = {
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    resourceId: resourceId,
                }
                const start = new Date(data_by_field.value.start);
                const end = new Date(data_by_field.value.end);
                newStartDate.value = selectInfo.startStr.split('T')[0].slice(0, 10)
                start_hour.value = new Date(selectInfo.startStr).getHours()
                start_minute.value = start.getMinutes().toString().padStart(2, '0')
                end_hour.value = new Date(selectInfo.endStr).getHours()
                end_minute.value = end.getMinutes().toString().padStart(2, '0')
                resourceIdForCreateEvent.value = resourceId
                modalTitle.value = 'Создание нового события'
                title.value = ""
                isModal.value = true

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
                const resourceId = eventReceiveInfo.resource.id
                console.log(resourceId)
                const title = prompt('Введите название события 3');
                if (title) {
                    const newEvent = {
                        title: title,
                        start: eventReceiveInfo.dateStr,
                        end: eventReceiveInfo.dateStr,
                        resourceId: resourceId,
                        removable: true, // Добавим свойство removable
                    };
                    events.value.push(newEvent);
                    // Сброс флага перемещения
                    movedEvent = null;
                }
            },

            slotMinTime: '08:00',
            slotMaxTime: '19:00',

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
            title,
            isSaveValueFromModal,
            saveDataHandle,
        };
    },
};
</script>