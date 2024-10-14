import React, { useEffect, useState, useRef } from 'react';
import { daysOfWeek } from './CalVars';
import Modal from './Modal';

const MonthView = ({ calendarDays, formattedData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, translateX: 0 });

    const modalRef = useRef(null);
    const buttonRefs = useRef({});

    const checkEvent = (year, month, day) => {
        return formattedData[year]?.[month]?.[day] ? true : false;
    }

    const openModal = (event, buttonKey) => {
        setSelectedEvent(event);
        setIsOpen(true);

        const buttonRef = buttonRefs.current[buttonKey];
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
        setSelectedEvent(null);
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
                        {day.day}
                        {checkEvent(day.year, day.month, day.day) &&
                            formattedData[day.year][day.month][day.day].events.map((item, eventIndex) => {
                                const buttonKey = `${dayIndex}-${eventIndex}`; // Create a unique key

                                return (
                                    eventIndex > 1 ?
                                        <div className='show-more' key="show-more">More...</div>
                                        :
                                        <div key={buttonKey} className='event' >
                                            <button
                                                ref={(el) => (buttonRefs.current[buttonKey] = el)} // Store ref in the object
                                                className='event-button'
                                                onClick={(e) => {
                                                    openModal(item, buttonKey); // Pass the unique key to openModal
                                                    e.stopPropagation();    
                                                }} 
                                            >
                                            </button>
                                            <p>{item}</p>
                                        </div>
                                );
                            })
                        }
                    </div>
                ))}
                {isOpen && 
                    <Modal 
                        closeModal={closeModal} 
                        event={selectedEvent} 
                        ref={modalRef}
                        style={{
                            top: `${modalPosition.top}px`, 
                            left: `${modalPosition.left}px`,
                            translate: `${modalPosition.translateX} calc(1.2rem - 100%)`
                        }}
                    />}
            </div>
        </>
    );
}

export default MonthView;
