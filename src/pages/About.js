import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion } from "framer-motion";

import bgimg from '../images/interior.jpg'
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
        <div className='about' id='about'>
            <div className='container'>
                <div className='col'>
                    <h1>About Us</h1>
                    <span className='line' />
                    <p>
                        St. Mary Orthodox Church is a canonical Church under the Romanian 
                        Orthodox Metropolia of the Americas, with the blessing of his Eminence 
                        Archbishop and Metropolitan Nicolae.
                    </p>
                    <Link to='/about'>
                        <button className='button'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Learn More
                        </button>
                    </Link>
                </div>
                <div className='icon'>
                    <div
                        className='thumbnail'
                        ref={useRef(bgimg)}
                    >
                        <div className='frame' >
                            <Link to={`/about`}>
                                    <ProgressiveImage
                                        src={bgimg}
                                        placeholder={bgimg}>
                                        {(src) => (
                                            <motion.img
                                                src={src}
                                                alt='Church'
                                                whileHover={{ scale: 1.1 }}
                                                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                                                transition={transition}
                                            />
                                        )}
                                    </ProgressiveImage>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default About