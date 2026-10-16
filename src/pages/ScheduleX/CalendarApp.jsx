import { useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewMonthAgenda } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import "./calendar-app.css";

function CalendarApp({ data }) {
  // Plugins are created once per mount; useCalendarApp only reads its
  // arguments on the first render anyway.
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [plugins] = useState(() => [eventsService, createEventModalPlugin()]);

  const calendar = useCalendarApp(
    {
      views: [createViewMonthGrid(), createViewMonthAgenda()],
      events: data,
      firstDayOfWeek: 0,
    },
    plugins
  );

  // Events can arrive after the calendar is created (on mobile it renders
  // under the loading curtain); update them in place instead of re-mounting.
  useEffect(() => {
    if (data) eventsService.set(data);
  }, [data, eventsService]);

  return (
    <div className="calendar">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
