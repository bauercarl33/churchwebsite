import React, { forwardRef } from 'react';
import './modal.css';
import { FaTimes } from 'react-icons/fa';

const Modal = forwardRef(({ closeModal, event, style }, ref) => {
    return (
        <div className='modal' ref={ref} style={style}>
            <button className='close' onClick={closeModal}>
                <FaTimes size={16} />
            </button>
            <h6>{event}</h6>
        </div>
    );
});

export default Modal;