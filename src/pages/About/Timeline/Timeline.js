import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './timeline.css';
import { timeline } from '../AboutVars';

const Timeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = document.querySelectorAll('.desktop-content-section');
            sectionElements.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveIndex(index);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='timeline'>
            <div className='left'>
                <div className='desktop-photos'>
                    <AnimatePresence>
                        {Object.entries(timeline).map((item, index) => (
                            index === activeIndex && (
                                <motion.img
                                    key={index}
                                    className='desktop-photo'
                                    src={item[1].image}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            )
                        ))}
                    </AnimatePresence>
                </div>
                
            </div>
            <div className='right'>
                {Object.entries(timeline).map((item, index) => (
                    <div className='desktop-content-section' key={index}>
                        <div className='desktop-content'>
                            <span style={{color: "var(--accent)"}}>{item[1].span}</span>
                            <h4>{item[1].heading}</h4>
                            {item[1].paragraphs.map((para, paraIndex) => (
                                <p key={paraIndex}>{para}</p>
                            ))}
                            <div className='mobile-photo'>
                                <img src={item[1].image} alt='timeline moment' />
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
