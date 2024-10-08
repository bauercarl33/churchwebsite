import React, { useLayoutEffect, useRef, useState } from 'react'

import './hero.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    return (
        <div className='hero'>
            <div className="e-with-fixed-bg">
                <div className="bg-wrap">
                    <div className="bg"></div>
                </div>
                <div className='content'>
                    <h1>St. Mary</h1>
                    <h3>Orthodox Church</h3>         
                </div> 
            </div> 
        </div>
    )
}

export default Hero