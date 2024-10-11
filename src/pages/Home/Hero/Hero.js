import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import './hero.css'
import { motion, useScroll, useTransform } from 'framer-motion';
import homeimg from '../../../images/church-home.jpg'

const Hero = () => {
    return (
        <div className='hero'>
            <img className='bg' src={homeimg} alt='bg' />
            <div className='overlay' />
            <div className='content'>
                <h2>St. Mary</h2>
                <h3>Orthodox Church</h3>
            </div>
        </div>
    )
}

export default Hero