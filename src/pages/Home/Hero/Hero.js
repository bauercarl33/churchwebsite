import React from 'react'

import './hero.css'
import homeimg from '../../../images/church-home.jpg'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='title-wrapper'>
                <div className='title'>
                    <h4>St. Mary</h4>
                    <p>A Romanian Orthodox Christian parish in Cedar Park, TX.</p>
                    <div className='buttons'>
                        <button className='button filled'>Important</button>
                        <button className='button empty'>Less Important</button>
                    </div>
                </div>
            </div>
            <div className='image-wrapper'>
                <img src={homeimg} alt='St. Mary' />
            </div>
        </div>
    )
}

export default Hero