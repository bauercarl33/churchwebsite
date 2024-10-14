import React from 'react'

import './hero.css'
import homeimg from '../../../images/church-home.jpg'

const Hero = () => {
    return (
        <div className='hero'>
            <img className='bg' src={homeimg} alt='bg' />
            <div className='overlay' />
            <div className='content'>
                <h4>St. Mary Orthodox Church</h4>
                <p>A Romanian Orthodox Christian Parish in Cedar Park, TX.</p>
            </div>
            {/* <svg class="curve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 1920 400'>
                <path d="M0,400 Q800,350 1920,400 Z" stroke="var(--secondary-color)" stroke-width="10" fill="var(--secondary-color)"/>
                </svg> */}
        </div>
    )
}

export default Hero