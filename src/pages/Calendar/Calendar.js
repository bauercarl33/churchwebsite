import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

import './calendar.css';
import MonthView from './MonthView';
import { months } from './CalVars';

const url = "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar";

const Calendar = () => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [calendarDays, setCalendarDays] = useState([]);
    const [offset, setOffset] = useState(0);

    const fetchCalendarData = async () => {
        const year = new Date().getFullYear();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate: `${year}-01-01`,
                endDate: `${year + 1}-12-31`,
            }),
        });
        if (!response.ok) {
            throw new Error(`STATUS: ${response.status}`);
        }
        const data = await response.json();
        return formatCalendarJson(data.body);
    };

    const { data: formattedData, isLoading, isError, error } = useQuery({
        queryKey: ['calendarData'],
        queryFn: fetchCalendarData,
    });

    const formatCalendarJson = (json) => {
        const newJson = {};
        json.forEach((item) => {
            const { summary, location, start, end } = item;
            const startDate = new Date(start.dateTime);
            const endDate = new Date(end.dateTime);

            const yy = startDate.getFullYear();
            const mm = startDate.getMonth();
            const dd = startDate.getDate();
            
            const eventDetails = {
                startDate: startDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                startTime: startDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                endDate: endDate,
                endTime: endDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                timezone: "America/Chicago",
                summary: summary,
                location: location,
            };

            newJson[yy] ??= {};
            newJson[yy][mm] ??= {};
            newJson[yy][mm][dd] ??= { events: [] };
            newJson[yy][mm][dd].events.push(eventDetails);
        });
        return newJson;
    };

    const handleCalendarDays = (mOffset = 0) => {
        const date = new Date();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() + mOffset, 1);
        const weekdayOfFirstDay = firstDayOfMonth.getDay();
        let currentDays = [];
        const totalDays = 42;

        for (let day = 0; day < totalDays; day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
            } else if (day === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
            } else {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
            }

            const calendarDay = {
                currentMonth: firstDayOfMonth.getMonth() === date.getMonth(),
                date: new Date(firstDayOfMonth),
                month: firstDayOfMonth.getMonth(),
                day: firstDayOfMonth.getDate(),
                selected: firstDayOfMonth.toDateString() === date.toDateString(),
                year: firstDayOfMonth.getFullYear(),
            };

            currentDays.push(calendarDay);
        }

        if (currentDays[6].month !== currentDays[15].month) {
            currentDays = currentDays.slice(7);
        }      
        if (currentDays[currentDays.length - 7].month !== currentDays[15].month) {
            currentDays = currentDays.slice(0, -7);
        }

        setCalendarDays(currentDays);
    };

    const handleToday = () => {
        setOffset(0);
        handleCalendarDays(0);
    };

    const handlePreviousMonth = () => {
        const newOffset = offset - 1;
        setOffset(newOffset);
        handleCalendarDays(newOffset);
    };

    const handleNextMonth = () => {
        const newOffset = offset + 1;
        setOffset(newOffset);
        handleCalendarDays(newOffset);
    };

    useEffect(() => {
        handleCalendarDays(offset);
    }, [offset]);

    if (isLoading) {
        return <div className='calendar'>Loading...</div>;
    }
    if (isError) {
        return <div className='calendar'>Error: {error.message}</div>;
    }

    return (
        <div className='calendar'>
            <div className='container'>
                <div className='head'>
                    <h5 id='cal-title'>
                        {calendarDays.length > 15 ? `${months[calendarDays[15].month]} ${calendarDays[15].year}` : 'Loading...'}
                    </h5>
                    <div className='buttons'>
                        <button className='button' onClick={handlePreviousMonth}>
                            <FaAngleLeft />
                        </button>
                        <button className='button' onClick={handleToday}>
                            Today
                        </button>
                        <button className='button' onClick={handleNextMonth}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <MonthView calendarDays={calendarDays} formattedData={formattedData} />
            </div>
        </div>
    );
};

export default Calendar;
