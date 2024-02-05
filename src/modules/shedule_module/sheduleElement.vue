<template>
    <div class="air_block" style="max-height: 90vh; overflow: hidden;">
        <FullCalendar :options="calendarOptions" style="max-height: 70vh;">
            <template v-slot:eventContent='arg'>
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
            </template>
        </FullCalendar>
    </div>
</template>
  
<style scoped>
@import './style/shedule.scss';
</style>

<script>
import FullCalendar from '../../../node_modules/@fullcalendar/vue3'
//   import resourceTimeGridPlugin from '../../../node_modules/@fullcalendar/resource-timegrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '../../../node_modules/@fullcalendar/interaction'
import dayGridPlugin from '../../../node_modules/@fullcalendar/daygrid'
import listPlugin from '../../../node_modules/@fullcalendar/list'
import localeRu from '../../../node_modules/@fullcalendar/core/locales/ru'
import { reactive } from 'vue'

export default {
    components: {
        FullCalendar
    },
    setup() {

        const todayDate = new Date();
        const dateString = todayDate.toJSON();
        const dateStringSub = dateString.substring(0, dateString.indexOf("T"));
        const calendarOptions = reactive({
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            plugins: [resourceTimeGridPlugin],
            
            weekends: false,
            selectable: true,
            initialView: 'resourceTimeGridFourDay',
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'resourceTimeGridDay,resourceTimeGridFourDay'
            },
            views: {
                resourceTimeGridFourDay: {
                    type: 'resourceTimeGrid',
                    duration: { days: 4 },
                    buttonText: '4 дня'
                }
            },
            resources: [
                { id: '1a', title: 'Переговорная комната' },
            ],

            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: false,
            },
            headerToolbar: {
                center: 'addEventButton'
            },
            customButtons: {
                addEventButton: {
                    text: 'Добавить событие',
                    click: function () {
                        var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                        var date = new Date(dateStr + 'T00:00:00'); // will be in local time

                        if (!isNaN(date.valueOf())) { // valid?
                            calendar.addEvent({
                                title: 'dynamic event',
                                start: date,
                                allDay: true
                            });
                            alert('Great. Now, update your database...');
                        } else {
                            alert('Invalid date.');
                        }
                    }
                }
            },

            locale: localeRu,

        });

        return {
            calendarOptions,
        };
    }
};
</script>



