<template>
    <div>
        <!-- <modal :modalTitle="modalTitle" :isModal="isModal" @saveData="saveDataHandle">

        </modal> -->

  
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
import { useToast } from "vue-toastification";
export default {
    components: {
        FullCalendar,
        buttonComponent,
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
            console.log('end_hour.value:', end_hour.value)
            const newEvent = {
                title: title.value,
                start: `${newStartDate.value}T${start_hour.value}:${start_minute.value}:00+03:00`,
                end: `${newStartDate.value}T${end_hour.value}:${end_minute.value}:00+03:00`,
                resourceId: '1a',
            };
            console.log(newEvent)
            events.value.push(newEvent);
            console.log(events.value)
            isModal.value = false
        }
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
            dateClick: (info) => {
                if (!info.event) {
                    modalTitle.value = 'Создание нового события'
                    isModal.value = true
                }
            },
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
                modalTitle.value = 'Создание нового события'
                title.value = ""
               
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