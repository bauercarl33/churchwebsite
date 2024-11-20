import React, { useEffect, useState } from 'react'

import './intro.css'

import { images1, images2 } from './IntroVars'

const Intro = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images1.length);
        }, 3000); // Change active image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='intro'>
            <div className='col'>
                <h4>Who We Are</h4>
                <p>
                St. Mary Orthodox Church is a tight-knit, loving community of parishioners who partake in the traditions of the Orthodox Faith. We seek to grow in faith together through the Most Holy Trinity and warmly welcome people from all backgrounds to join us.                </p>
            </div>
            <div className='col'>
                <div className='image'>
                    <img 
                        src={images1[3]} 
                        alt='Community '
                    />
                </div>
            </div>
        </div>
    )
}

export default Intro