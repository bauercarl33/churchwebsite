import React from 'react'
import { Link } from 'react-router-dom'

import './hero.css'


const Hero = () => {
    const donationLink = 'https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0';

    return (
        <div className='hero'>
            <div className='title-wrapper'>
                <div className='title'>
                    <h4>St. Mary<span className='highlight'>Orthodox Church</span></h4>
                    <p>An Orthodox Christian parish in Austin, TX.</p>
                    <div className='buttons'>
                        <a href={donationLink} target='_blank' aria-label='To donation page.' className='button filled'>
                            Donate
                        </a>
                        <Link to='/visitors' className='button empty'>Visitors</Link>
                    </div>
                </div>
            </div>
            <div className='image-wrapper'>
                <img src={`${process.env.PUBLIC_URL}/images/home/nativity_of_the_theotokos.webp`} alt='Icon of the Nativity of the Theotokos' />
            </div>
        </div>
    );
}

export default Hero;