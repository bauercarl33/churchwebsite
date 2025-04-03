import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import CalendarApp from "./CalendarApp";
import CurtainLoadingEffect from "../../components/Curtain/CurtainLoadingEffect.js";

import "./calendar-app.css";

const url =
  "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar";

const Calendar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  const fetchCalendarData = async () => {
    const dateobj = new Date();
    const { start, end } = getPreviousMonthRange(dateobj);
    console.log("start, end: ", start);
    const year = new Date().getFullYear();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      }),
    });
    if (!response.ok) {
      throw new Error(`STATUS: ${response.status}`);
    }
    const data = await response.json();
    console.log("CALENDAR DATA: ", data);
    return formatCalendarJson(data.body);
  };

  const formatCalendarJson = (json) => {
    let events = [];
    let event = {};

    json.forEach((item) => {
      const startDate = new Date(item.start.dateTime);
      const endDate = new Date(item.end.dateTime);

      event = {
        id: item.id,
        start: formatDate(startDate),
        end: formatDate(endDate),
        title: item.summary,
        calendarId: "church",
      };

      events.push(event);
    });

    return events;
  };

  const formatDate = (date, useUTC = false) => {
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = String(
      (useUTC ? date.getUTCMonth() : date.getMonth()) + 1
    ).padStart(2, "0");
    const day = String(useUTC ? date.getUTCDate() : date.getDate()).padStart(
      2,
      "0"
    );
    const hours = String(
      useUTC ? date.getUTCHours() : date.getHours()
    ).padStart(2, "0");
    const minutes = String(
      useUTC ? date.getUTCMinutes() : date.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  function getPreviousMonthRange(targetDate) {
    // Start of target month
    const startOfTargetMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1
    );

    // Start of previous month
    const startOfPreviousMonth = new Date(startOfTargetMonth);
    startOfPreviousMonth.setMonth(startOfPreviousMonth.getMonth() - 1);

    // Add 3 months to previous month start
    const threeMonthsLater = new Date(startOfPreviousMonth);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    return {
      start: startOfPreviousMonth,
      end: threeMonthsLater,
    };
  }
  const { data: formattedData, isLoading } = useQuery({
    queryKey: ["calendarData"],
    queryFn: fetchCalendarData,
  });

  return (
    <div className="calendar">
      {isMobile ? (
        <CurtainLoadingEffect isOpen={!isLoading}>
          {isLoading ? (
            <CalendarApp data={formattedData} />
          ) : (
            <div>
              <CalendarApp data={formattedData} />
            </div>
          )}
        </CurtainLoadingEffect>
      ) : (
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <CalendarApp data={formattedData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
