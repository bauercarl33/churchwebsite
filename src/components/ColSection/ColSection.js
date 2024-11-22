import React from 'react'
import {  Link } from 'react-router-dom'

import './colsection.css'
import { FaChevronRight } from 'react-icons/fa6'


const ColSection = ({ colSectionVars }) => {     
    return (
        <div className='col-section'>
            <div className='decoration' />
            <div className='decoration' />
            <div className='decoration' />
            {Object.entries(colSectionVars).map(([key, value]) => {
                return (
                    <div className='row' key={key}>
                        <div className='col'>
                            <div className='image'>
                                <img 
                                    src={value.image} 
                                    loading='lazy' 
                                    alt={value.alt} 
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='text'>
                                <h4>
                                    Our&nbsp;
                                    <span className='highlight'>{key}</span>
                                </h4>
                                <p>{value.text}</p>
                                <Link to='/about' className='link' aria-label='To about page'>
                                    Learn More<span><FaChevronRight size={12} /></span>
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default ColSection