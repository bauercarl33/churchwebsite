import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'

import { colSectionVars } from './ColSectionVars'
import { motion, useScroll, useTransform } from 'framer-motion';

import './colsection.css'


const ColSection = () => {     
    const navigate = useNavigate()

    return (
        <div className='col-section'>
            <svg class="curve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 1920 400'>
                <path d="M0,0 Q1200,100 1920,0 Z" fill="var(--secondary-color)" stroke="var(--secondary-color)" stroke-width="10"/>
            </svg>
            {Object.entries(colSectionVars).map(([key, value]) => {
                return (
                    <div className='row' key={key}>
                        <div className='col'>
                            <div className='image'>
                                <img 
                                    className='image' 
                                    src={value.image} 
                                    loading='lazy' 
                                    alt={key} 
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='text'>
                                <span className='h5'>Our</span>
                                <h4>{key}</h4>
                                <p>{value.text}</p>
                                <button 
                                    className='button' 
                                    onClick={() => navigate(`/about`)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default ColSection