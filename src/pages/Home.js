import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/home.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    return (
        <div className='home'>
            <div className='parallax-img' />
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
    )
}

export default Home