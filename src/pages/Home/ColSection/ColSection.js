import React from 'react'
import {  Link } from 'react-router-dom'

import { colSectionVars } from './ColSectionVars'

import './colsection.css'


const ColSection = () => {     
    return (
        <div className='col-section'>
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
                                <Link to='/about' className='button filled' aria-label='To about page'>
                                    Learn More
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