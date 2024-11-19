import React from 'react'

import './intro.css'

import { images1, images2 } from './IntroVars'

const Intro = () => {
    return (
        <div className='intro'>
            <div className='images'>
                {images1.map((image, index) => {
                    return (
                        <img 
                            src={`https://saintmarychurch.s3.amazonaws.com/images/${image}`} 
                            key={index} 
                            alt='Images of our church community'/>
                    )
                })}
            </div>
            
            <div className='text-wrapper'>
                <h4>Who We Are</h4>
                <p>
                    St. Mary Orthodox Church is a tight-knit, loving community of parishioners who partake in the traditions of the Orthodox Faith. We seek to grow in faith together through the Most Holy Trinity and warmly welcome people from all backgrounds to join us.
                </p>
            </div>

            <div className='images bottom'>
                {images2.map((image, index) => {
                    return (
                        <img 
                            src={`https://saintmarychurch.s3.amazonaws.com/images/${image}`} 
                            key={index} 
                            alt='Images of our church community'/>
                    )
                })}
            </div>
        </div>
    )
}

export default Intro