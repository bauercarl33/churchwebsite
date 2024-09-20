import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../images/bgimg.jpg'
import '../css/aboutmore.css'
import ScrollForMore from '../components/ScrollForMore';

// const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const firstName = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };
  
  const lastName = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.04,
        staggerDirection: 1,
      },
    },
  };
  
  const letter = {
    initial: {
      y: 400,
    },
    animate: {
      y: 0,
      transition: { duration: 1, ...transition },
    },
  };

const AboutMore = () => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    const [canScroll, setCanScroll] = useState(false);

    useEffect(() => {
        if (canScroll === false) {
        document.querySelector("body").classList.add("no-scroll");
        } else {
        document.querySelector("body").classList.remove("no-scroll");
        }
    }, [canScroll]);

    return (
        <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className='single'
        initial='initial'
        animate='animate'
        exit='exit'>
            <div className='container fluid'>
                <div className='row center top-row'>
                    <div className='top'>
                        <motion.div className='model'>
                        <motion.span className='first' variants={firstName}>
                            <motion.span variants={letter}>A</motion.span>
                            <motion.span variants={letter}>b</motion.span>
                            <motion.span variants={letter}>o</motion.span>
                            <motion.span variants={letter}>u</motion.span>
                            <motion.span variants={letter}>t</motion.span>
                        </motion.span>
                        <motion.span className='last' variants={lastName}>
                            <motion.span variants={letter}>U</motion.span>
                            <motion.span variants={letter}>s</motion.span>
                        </motion.span>
                        </motion.div>
                    </div>
                </div>
                <div className='row bottom-row'>
                    <div className='bottom'>
                        <motion.div className='image-container-single'>
                            <motion.div
                                initial={{
                                    y: "-50%",
                                    width: 500,
                                    height: 300,
                                }}
                                animate={{
                                    y: 0,
                                    width: "100%",
                                    height: window.innerWidth > 1440 ? 800 : 400,
                                    transition: { delay: 0.2, ...transition },
                                }}
                                className='thumbnail-single'>
                                <motion.div
                                    className='frame-single'
                                    whileHover='hover'
                                    transition={transition}>
                                    <motion.img
                                        src={{bgimg}}
                                        alt='an image'
                                        style={{ scale: scale }}
                                        initial={{ scale: 1.0 }}
                                        animate={{
                                            transition: { delay: 0.2, ...transition },
                                            y: window.innerWidth > 1440 ? -1200 : -600,
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                    <ScrollForMore />
                </div>
            </div>
            <div className='detailed-information'>
                <div className='container'>
                <div className='row'>
                    <h2 className='title'>
                    The insiration behind the artwork & <br /> what it means.
                    </h2>
                    <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of
                    the more obscure Latin words, consectetur, from a Lorem Ipsum
                    passage, and going through the cites of the word in classical
                    literature, discovered the undoubtable source. Lorem Ipsum comes
                    from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
                    BC. This book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum, "Lorem
                    ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                </div>
            </div>
        </motion.div>
    )
}

export default AboutMore