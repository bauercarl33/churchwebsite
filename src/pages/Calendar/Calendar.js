import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useQuery, useMutation } from '@tanstack/react-query'

import './calendar.css'

const url = "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar";

const Calendar = () => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [grid, setGrid] = useState([6, 7]);
    const [calendarDays, setCalendarDays] = useState([]);
    const [offset, setOffset] = useState(0);
    // const {data, isLoading} = useQuery({
    //     queryFn: () => fetch(url),
    //     queryKey: ["calendar"]
    // });

    const mutation = useMutation({
        mutationFn: () => {fetch(url)}
    })
    console.log(mutation)

    


    // async function getData() {
    //     try {
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 startDate: "2025-09-01",
    //                 endDate: "2025-09-08",
    //             }),
    //         });
    //         if (!response.ok) {
    //             throw new Error("STATUS: ", response.status)
    //         }

    //         const json = await response.json();
    //         console.log(json)
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    // getData();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];

    const events = {
        2024 : {
            8: {
                30: [
                    'Event A',
                    'Event B',
                    'Event C'
                ]
            },
            9: {
                1: [
                    'Event A',
                    'Event B',
                    'Event C'
                ],
                10: [
                    'Event A alksdhfkljahsdkljhf',
                    'Event C'
                ]
            }
        }
    }

    const checkEvent = (year, month, day) => {
        if (year in events) {
            if (month in events[year]) {
                if (day in events[year][month]) {
                    return true;
                }
        }
        }
        
        return false;
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
                number: firstDayOfMonth.getDate(),
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

    const handleTimeFrame = (id) => {
        if (id === timeFrame) {
            return;
        }

        setTimeFrame(id)
        if (id === 'month') {
            setGrid([6, 7]);
        } else if (id === 'week') {
            setGrid([1, 7]);
        } else {
            setGrid([1, 1]);
        }
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

    return (
        <div className='calendar'>
            {/* {data?.map((item) => {
                console.log(item);
            })} */}
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
                    {/* <div className='buttons' id='time-span'>
                        <button 
                            onClick={() => handleTimeFrame('month')}
                            className={timeFrame === 'month' ? 'selected' : 'button'}
                        >
                            Month
                        </button>
                        <button 
                            onClick={() => handleTimeFrame('week')}
                            className={timeFrame === 'week' ? 'selected' : 'button'}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => handleTimeFrame('day')}
                            className={timeFrame === 'day' ? 'selected' : 'button'}
                        >
                            Day
                        </button>
                    </div> */}
                </div>
                <div className='week-header'>
                    {daysOfWeek.map((day) => {
                        if (timeFrame === 'month') {
                            return (
                                <div className='day-header' key={day}>{day}</div>
                            )
                        } else if (timeFrame === 'week') {
                            return (
                                <div className='day-header' key={day}>{day}</div>
                            )
                        }                      
                    })}
                </div>
                <div className='grid'>
                    {calendarDays.map((day, index) =>  {
                        return (
                            <div 
                                className={
                                    day.month !== calendarDays[15].month ? 
                                        'cell not-curr' : day.selected ? 
                                        'cell selected' : 'cell'
                                } 
                                key={index}
                            >
                                {day.number}
                                {checkEvent(day.year, day.month, day.number) ?
                                <div className='event'>
                                    {/* {events[day.year][day.month][day.number].map((item) => {
                                        return(
                                            <p key={item}>{item}</p>
                                        )
                                    })} */}
                                </div> : ''}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Calendar