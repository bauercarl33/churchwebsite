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

const MOBILE_QUERY = "(max-width: 600px)";

const useIsMobile = () => {
  // Read the media query synchronously so the first render already uses the
  // right layout (starting with `false` caused a layout shift on phones).
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
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
        <CurtainLoadingEffect isOpen={!isLoading}>
          <CalendarApp data={events} />
        </CurtainLoadingEffect>
      ) : (
        <div>{isLoading ? <div>Loading...</div> : <CalendarApp data={events} />}</div>
      )}
    </div>
  );
};

export default Calendar;
