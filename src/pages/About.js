import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion } from "framer-motion";

import bgimg from '../images/bgimg.jpg'
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
        <div className='about'>
            <div className='container'>
                <div className='icon'>
                    <div
                        className='thumbnail'
                        style={{
                            width: 500,
                            height: 300,
                        }}>
                        <div className='frame'>
                            <Link to={`/about`}>
                                <div>
                                    <ProgressiveImage
                                        src={bgimg}
                                        placeholder={bgimg}>
                                        {(src) => (
                                            <>
                                            <motion.img
                                                    src={src}
                                                    alt='Church'
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                                                    transition={transition}
                                                />
                                            </>
                                        )}
                                    </ProgressiveImage>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={transition}
                        className='information'>
                    </motion.div>
                </div>
                <div className='col'>
                    <h2>About Us</h2>
                    <span className='line' />
                    <p>
                        St. Mary Orthodox Church is a canonical Church under the Romanian 
                        Orthodox Metropolia of the Americas, with the blessing of his Eminence 
                        Archbishop and Metropolitan Nicolae.
                    </p>
                    <Link to='/about'>
                        <button className='button'>
                            LearnMore
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About