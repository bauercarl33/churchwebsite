import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/home.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    const homeRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: homeRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

    return (
        <motion.div className='home'>
            <motion.div 
                className='parallax-img' 
                id='home'
                ref={homeRef}
                style={{
                    backgroundPositionY: y,
                }}
            />
                <div className='content'>
                    <h1>St. Mary</h1>
                    <p>Orthodox Church</p>
                </div>
        </motion.div>
    )
}

export default Home