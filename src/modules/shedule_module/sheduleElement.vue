<template>
    <div class="air_block" style="max-height: 90vh; overflow: hidden;">
        <FullCalendar :options="calendarOptions" style="max-height: 70vh;" />
        <buttonComponent @click="saveCurrentShedule()">Сохранить</buttonComponent>
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
import { ref, reactive } from 'vue';
import { useToast } from "vue-toastification";

export default {
    components: {
        FullCalendar,
        buttonComponent,
    },
    setup() {
        const toast = useToast();
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
                const title = prompt('Введите название события');
                if (title) {
                    const newEvent = {
                        title: title,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        resourceId: '1a',
                    };
                    events.value.push(newEvent);
                }
            },
            eventAdd: (addInfo) => {
                const title = prompt('Введите название события');
                if (!title) {
                    addInfo.event.remove();
                } else {
                    addInfo.event.setProp('title', title);
                }
            },
            //   Обработчик перетаскивания события
            eventDrop: (eventDropInfo) => {
                const updateEvent = events.value.find((event) => event.id === eventDropInfo.event.id);
                if (updateEvent && updateEvent.resourceId === '1a') {
                    const title = prompt('Название');
                    if (title) {
                        const newEvent = {
                            title: title,
                            start: eventDropInfo.dateStr,
                            end: eventDropInfo.dateStr,
                            resourceId: '2a',
                        };
                        events.value.push(newEvent);
                    }
                }

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
                const title = prompt('Введите название события');
                if (title) {
                    const newEvent = {
                        title: title,
                        start: eventReceiveInfo.dateStr,
                        end: eventReceiveInfo.dateStr,
                        resourceId: '1a',
                    };
                    events.value.push(newEvent);
                }
            },
            locale: localeRu,
        });
        const saveCurrentShedule = () => {
            toast.warning('Раздел находится в разработке. Сохранение невозможно', {
                    timeout: 3000
                })
        }
        return {
            calendarOptions,
            events,
            saveCurrentShedule,
            toast,
        };
    },
};
</script>