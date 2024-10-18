import React, { forwardRef } from 'react';
import './modal.css';
import { FaTimes } from 'react-icons/fa';

const Modal = forwardRef(({ closeModal, events, style, screenWidth }, ref) => {
    return (
        <>
            {screenWidth > 600 ?
                <div className='modal'  ref={ref} style={style}>
                    <h5>{events.startDate}</h5>
                    <button className='close-modal' onClick={closeModal}>
                        <FaTimes size={16} />
                    </button>
                    <h6>{events.summary}</h6>
                    <p>{events.startTime} - {events.endTime}</p>
                </div> :
                <div className='modal'>
                    <h5>{events[0].startDate}</h5>
                    <button className='close-modal' onClick={closeModal}>
                        <FaTimes size={16} />
                    </button>
                    {events && Array.isArray(events) && events.map((item, index) => {
                        return (
                            <div key={index} className='modal-mobile'>
                                <h6>{item.summary}</h6>
                                <p>{item.startTime} - {item.endTime}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    );
});

export default Modal;