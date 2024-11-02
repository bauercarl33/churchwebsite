import { useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { 
    createViewMonthGrid, 
    createViewDay, 
    createViewMonthAgenda, 
    createViewWeek 
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
 
import '@schedule-x/theme-default/dist/index.css'
import './calendar-app.css'

 
function CalendarApp({ data }) {
    const plugins = [createEventsServicePlugin(), createEventModalPlugin()]

    const config = {
        firstDayOfWeek: 0,
        calendars: {
            church: {
                colorName: 'church',
                lightColors: {
                    main: 'var(--primary-dark)',
                    container: 'var(--primary-color)',
                    onContainer: 'var(--bg-color)',
                }
            }
        }
        
    }
 
    useEffect(() => {
        calendar.eventsService.getAll()
    }, [])

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewMonthAgenda()],
        events: data,
        firstDayOfWeek: config.firstDayOfWeek,
    }, plugins)

    return (
        <div className='calendar'>
            <ScheduleXCalendar 
                calendarApp={calendar}
            />
        </div>
    )
}
 
export default CalendarApp