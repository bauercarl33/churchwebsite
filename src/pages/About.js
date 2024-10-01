import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'

import { aboutVars } from '../vars/AboutVars'
import { motion, useScroll, useTransform } from 'framer-motion';

import '../css/about.css'


const About = () => {     
    const aboutRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: aboutRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className='about'>
            <div className='container' >
                {Object.entries(aboutVars).map(([key, value]) => {
                    return (
                        <div className='row' key={key}>
                            <div className='label' />
                            <div className='col'>
                                <div className='text'>
                                    <h5>Our</h5>
                                    <h4>{key}</h4>
                                    <p>{value.text}</p>
                                    <button className='button'>Learn More</button>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='image'>
                                    <img className='image' src={value.image} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default About