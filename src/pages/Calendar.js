import '../css/calendar.css'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Calendar = () => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return (
        <div className='calendar'>
            <div className='container'>
                <div className='head'>
                    <div className='buttons-wrapper'>
                        <div className='buttons'>
                            <button className='button'><FaAngleLeft styles={{ fontWeight: 100 }}/></button>
                            <button className='button'><FaAngleRight /></button>
                        </div>
                        <div className='buttons'>
                            <button className='button'>Today</button>
                        </div>
                    </div>
                    <h5>Month Year</h5>
                    <div className='buttons'>
                        <button className='selected'>Month</button>
                        <button className='button'>Week</button>
                        <button className='button'>Day</button>
                    </div>
                </div>
                <div className='week-header'>
                    {daysOfWeek.map((day) => {
                        return (
                            <div className='day-header' key={day}>{day}</div>
                        )
                    })}
                </div>
                {Array.from({ length: 5 }, (_, i) => { 
                    return (
                        <div className='row' key={i}>
                            {Array.from({ length: 7 }, (_, i) => {
                                return (
                                    <div className='col' key={i} >
                                        {i}
                                    </div>
                                )
                                
                            })}
                        </div>
                    )
                 })}
            </div>
        </div>
    )
}

export default Calendar