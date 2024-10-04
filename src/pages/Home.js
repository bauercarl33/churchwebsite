import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/home.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    return (
        
        <div className='home'>
            <img className='parallax-img' />
            <div className='content'>
                <h2>St. Mary</h2>
                <h4>Orthodox Church</h4>
                        
            </div> 
            {/* <svg className='svg-mask' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 919">
                <path fill="var(--bg-color)" d="M 0,919 Q 800,919 1920,850 L1920,920 L0,920 Z"></path>
            </svg>            */}
        </div>
    )
}

export default Home