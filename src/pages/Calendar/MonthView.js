import React, { useEffect, useState, useRef } from 'react';
import { daysOfWeek } from './CalVars';
import Modal from './Modal';

const MonthView = ({ calendarDays, formattedData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, translateX: 0 });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [curButtonKey, setCurButtonKey] = useState(null)

    const modalRef = useRef(null);
    const buttonRefs = useRef({});

    const checkEvent = (year, month, day) => {
        return formattedData[year]?.[month]?.[day] ? true : false;
    }

    const openModal = (events, buttonKey) => {
        setSelectedEvents(events);
        setIsOpen(true);
        calcModalPos(buttonKey);
    }

    const calcModalPos = (buttonKey) => {
        const buttonRef = buttonRefs.current[buttonKey];
        setCurButtonKey(buttonKey);
        
        if (buttonRef) {
            const rect = buttonRef.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

            let top = rect.top + scrollTop;
            let left = rect.right + scrollLeft;
            let translateX = `4px`;

            if (rect.right > window.innerWidth / 2) {
                left = rect.left + scrollLeft;
                translateX = `calc(-100% - 4px)`
            }
                        
            setModalPosition({
                top: top,
                left: left,
                translateX: translateX
            });
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedEvents(null);
        buttonRefs.current = {};
    }

    const handleClickOutside = (e) => {
        const modal = document.querySelector('.modal');
        const eventButton = document.querySelector('.event-button');

        if (isOpen && modal && !modal.contains(e.target) && !eventButton.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => { 
            const width = window.innerWidth;
            setScreenWidth(width);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            document.body.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px)');

        const handleMediaQueryChange = () => {
            setIsOpen(false)
            closeModal();
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <>
            <div className='week-header'>
                {daysOfWeek.map((day) => (
                    <div className='day-header' key={day}>{day}</div>
                ))}
            </div>
            <div className='grid'>
                {calendarDays.map((day, dayIndex) => (
                    <div 
                        className={
                            day.month !== calendarDays[15].month ? 
                            'cell not-curr' : day.selected ? 
                            'cell selected' : 'cell'
                        } 
                        key={dayIndex}
                    >
                        <p className='day'>{day.day}</p>
                        {checkEvent(day.year, day.month, day.day) &&
                            formattedData[day.year][day.month][day.day].events.map((item, eventIndex) => {
                                const buttonKey = `${dayIndex}-${eventIndex}`;
                                let events = {}
                                let startTime = item.startTime
                                let summary = item.summary
                                if (screenWidth > 600) {
                                    events = item
                                } else {
                                    events = formattedData[day.year][day.month][day.day].events
                                }

                                return (
                                    eventIndex > 1 ?
                                        <div className='show-more' key="show-more">More...</div>
                                        :
                                        <div key={buttonKey} className='event' >
                                            <button
                                                ref={(el) => (buttonRefs.current[buttonKey] = el)}
                                                className='event-button'
                                                onClick={(e) => {
                                                    openModal(events, buttonKey);
                                                    e.stopPropagation();   
                                                }} 
                                            >
                                            </button>
                                            <p>{startTime} - {summary}</p>
                                        </div>
                                );
                            })
                        }
                    </div>
                ))}
            </div>
            {isOpen && 
                <Modal 
                    closeModal={closeModal} 
                    events={selectedEvents} 
                    ref={modalRef}
                    screenWidth={screenWidth}
                    style={{
                        top: `${modalPosition.top}px`, 
                        left: `${modalPosition.left}px`,
                        translate: `${modalPosition.translateX} calc(1rem - 100%)`
                    }}
            />}
        </>
    );
}

export default MonthView;
