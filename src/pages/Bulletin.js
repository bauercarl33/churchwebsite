import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/bulletin.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Bulletin = () => {
    const bulletinRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: bulletinRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['150%', '0%']);

    return (
        <motion.div className='bulletin'>
            <motion.div 
                className='parallax-img' 
                id='bulletin'
                ref={bulletinRef}
                style={{
                    backgroundPositionY: y,
                }}
            />
                <div className='container'>
                    <div className='content'>
                        <div className='title'>
                            <h1>Bulletin</h1>
                            <span className='line' />
                        </div>
                        <ul>
                            <li>
                                <h3>Monday, September 23, 2024</h3>
                                <p>9:30am: Orthros</p>
                                <p>10:30am: Divine Liturgy</p>
                            </li>
                            <li>
                                <h3>Tuesday, September 24, 2024</h3>
                                <p>9:30am: Orthros</p>
                                <p>10:30am: Divine Liturgy</p>
                            </li>
                            <li>
                                <h3>Wednesday, September 25, 2024</h3>
                                <p>9:30am: Orthros</p>
                                <p>10:30am: Divine Liturgy</p>
                            </li>
                            <li>
                                <h3>Thursday, September 26, 2024</h3>
                                <p>9:30am: Orthros</p>
                                <p>10:30am: Divine Liturgy</p>
                            </li>
                            <li>
                                <h3>Friday, September 27, 2024</h3>
                                <p>9:30am: Orthros</p>
                                <p>10:30am: Divine Liturgy</p>
                            </li>
                        </ul>
                    </div>
                </div>
        </motion.div>
    )
}

export default Bulletin