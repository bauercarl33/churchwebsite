import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/calendar.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Calendar = () => {
    const calendarRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: calendarRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['150%', '0%']);

    return (
        <motion.div className='calendar'>
            <motion.div 
                className='parallax-img' 
                id='calendar'
                ref={calendarRef}
                style={{
                    backgroundPositionY: y,
                }}
            />
            <iframe 
              src="https://embed.styledcalendar.com/#wlDvInZ735Z6JDn82azU" 
              title="Styled Calendar" 
              className="styled-calendar-container" 
              style={{
                width: '100%', 
                height: '100%',
                border: 'none',
              }}
            />
        </motion.div>
    )
}

export default Calendar