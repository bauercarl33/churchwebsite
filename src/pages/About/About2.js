import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './about2.css';
import { sections } from './AboutVars';

const About2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const arr = ['red', 'green', 'blue', 'pink']

    // Track scroll position to update the active index
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
        <div className='about'>
            <div className='left'>
                {Object.entries(sections).map((item, index) => (
                    <div className='desktop-content-section' key={index}>
                        <div className='desktop-content'>
                            <h4>{item[1].heading}</h4>
                            {item[1].paragraphs.map((para, paraIndex) => (
                                <p key={paraIndex}>{para}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='right'>
                <div className='desktop-photos'>
                    <AnimatePresence>
                        {Object.entries(sections).map((item, index) => (
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
        </div>
    );
};

export default About2;
