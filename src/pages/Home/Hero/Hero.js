import React from 'react'

import './hero.css'
import homeimg from '../../../images/church-home.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='title-wrapper'>
                <div className='title'>
                    <h4>St. Mary<span className='highlight'>Orthodox Church</span></h4>
                    <p>A Romanian Orthodox Christian parish in Austin, TX.</p>
                    <div className='buttons'>
                        <Link to='/donate' className='button filled'>New Building Plan</Link>
                        <Link to='/visitors' className='button empty'>Visitors</Link>
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