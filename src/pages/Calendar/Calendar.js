import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useQuery, useMutation } from '@tanstack/react-query'

import './calendar.css'
import MonthView from './MonthView';
import { months } from './CalVars'

const url = "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar";

const Calendar = () => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [calendarDays, setCalendarDays] = useState([]);
    const [offset, setOffset] = useState(0);
    const [formattedData, setFormattedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);


    async function getData(year) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate: `${year}-01-01`,
                    endDate: `${year}-12-31`,
                }),
            });
            if (!response.ok) {
                throw new Error("STATUS: ", response.status)
            }

            const json = await response.json();
            let newJson = formatCalendarJson(json.body)
            setFormattedData(newJson)
            setIsLoaded(true)
        } catch (error) {
            console.error(error.message);
        }
    }

    const formatCalendarJson = (json) => {
        let newJson = {}
        json.map((item) => {
            let summary = item.summary
            let startDate = item.start.dateTime
            let endDate = item.end.datetime
            let timezone = "America/Chicago"
            let location = item.location

            let date = new Date(startDate)
            let yy = date.getFullYear()
            let mm = date.getMonth()
            let dd = date.getDate()

            if (!newJson[yy]) {
                newJson[yy] = {}
            }
            if (!newJson[yy][mm]) {
                newJson[yy][mm] = {}
            }
            if (!newJson[yy][mm][dd]) {
                newJson[yy][mm][dd] = { events: [] }
            }
            newJson[yy][mm][dd].events.push(summary)
        })

        return newJson;
    }
    
    const handleCalendarDays = (mOffset = 0) => {
        let date = new Date();
        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() + mOffset, 1);
        let weekdayOfFirstDay = firstDayOfMonth.getDay();
        let currentDays = [];

        let totalDays = 42;

        for (let day = 0; day < totalDays; day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
            } else if (day === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
            } else {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
            }

            let calendarDay = {
                currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
                date: (new Date(firstDayOfMonth)),
                month: firstDayOfMonth.getMonth(),
                day: firstDayOfMonth.getDate(),
                selected: (firstDayOfMonth.toDateString() === date.toDateString()),
                year: firstDayOfMonth.getFullYear()
            };

            currentDays.push(calendarDay);
        }

        if (currentDays[6].month !== currentDays[15].month) {
            currentDays = currentDays.slice(7);
        }      
        if (currentDays[currentDays.length - 7].month !== currentDays[15].month) {
            currentDays = currentDays.slice(0, -7)
        }

        setCalendarDays(currentDays);
    }    

    const handleToday = () => {
        setOffset(0);
        handleCalendarDays(0);
    }

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
    }, [])

    useEffect(() => {
        getData(2024);
    }, [])

    return (
        <div className='calendar'>
            {isLoaded ?
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
                    :
                <div>Loading...</div>
            }
        </div>
    )
}

export default Calendar