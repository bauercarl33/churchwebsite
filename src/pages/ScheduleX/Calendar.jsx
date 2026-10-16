import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CalendarApp from "./CalendarApp";
import CurtainLoadingEffect from "../../components/Curtain/CurtainLoadingEffect";
import { endpoints, fetchJson } from "../../lib/api";
import { getCalendarRange, toDateString, toScheduleXEvents } from "../../lib/calendar";

import "./calendar-app.css";

export async function fetchCalendarEvents(now = new Date()) {
  const { start, end } = getCalendarRange(now);
  const data = await fetchJson(endpoints.calendar, {
    method: "POST",
    body: { startDate: toDateString(start), endDate: toDateString(end) },
  });
  return toScheduleXEvents(data.body);
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return isMobile;
};

const Calendar = () => {
  const isMobile = useIsMobile();
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["calendarEvents"],
    queryFn: () => fetchCalendarEvents(),
  });

  if (isError) {
    return (
      <div className="calendar">
        <div className="loading">Sorry, the calendar could not be loaded.</div>
      </div>
    );
  }

  return (
    <div className="calendar">
      {isMobile ? (
        // On mobile a curtain image slides away once events have loaded.
        // The key forces Schedule-X to re-initialise with the loaded events.
        <CurtainLoadingEffect isOpen={!isLoading}>
          <CalendarApp key={isLoading ? "loading" : "ready"} data={events} />
        </CurtainLoadingEffect>
      ) : (
        <div>{isLoading ? <div>Loading...</div> : <CalendarApp data={events} />}</div>
      )}
    </div>
  );
};

export default Calendar;
