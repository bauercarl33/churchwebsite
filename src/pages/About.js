import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion } from "framer-motion";

import { aboutVars } from '../vars/AboutVars'
import '../css/about.css'

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const About = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
     
    return (
        <div className='about'>
            <div className='container' >
                {Object.entries(aboutVars).map(([key, value]) => {
                    return (
                        <div className='row' key={key}>
                            <div className='col'>
                                <h3>{key}</h3>
                                <p>{value.text}</p>
                                <button className='button'>Learn More</button>
                            </div>
                            <div className='col'>
                                <div className='image'>
                                    {console.log(value.image)}
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