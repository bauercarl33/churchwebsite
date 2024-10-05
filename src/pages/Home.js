import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/home.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    return (
        <div className='home'>
            <div class="e-with-fixed-bg">
                <div class="bg-wrap">
                    <div class="bg"></div>
                </div>
                <div className='content'>
                    <h2>St. Mary</h2>
                    <h4>Orthodox Church</h4>         
                </div> 
            </div> 
        </div>
    )
}

export default Home