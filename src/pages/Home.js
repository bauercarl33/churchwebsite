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
            <div className='home'>
                <div className='content'>
                    <div className='welcome'>
                        <h5>Welcome To</h5>
                        <h2>St. Mary</h2>
                        <h4>Orthodox Church</h4>
                        <h6>A Romanian Orthodox parish in Austin, Texas.</h6>
                        <h6>We would love for you to join us in worship of the Most Holy Trinity.</h6>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Home