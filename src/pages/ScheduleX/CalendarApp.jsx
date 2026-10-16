import { useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewMonthAgenda } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import "./calendar-app.css";

function CalendarApp({ data }) {
  // Plugins are created once per mount; useCalendarApp only reads its
  // arguments on the first render anyway.
  const [plugins] = useState(() => [createEventsServicePlugin(), createEventModalPlugin()]);

  const calendar = useCalendarApp(
    {
      views: [createViewMonthGrid(), createViewMonthAgenda()],
      events: data,
      firstDayOfWeek: 0,
    },
    plugins
  );

  return (
    <div className="calendar">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
