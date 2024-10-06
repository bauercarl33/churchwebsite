import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../../images/bgimg.jpg'
import './aboutmore.css'
import ScrollForMore from '../../components/ScrollForMore';


const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  animate: {
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

    const location = useLocation()

    const imageDetails = location.state || {}
    console.log(location)

    useEffect(() => {
        window.scroll(0, 0);
        if (canScroll === false) {
          document.querySelector("body").classList.add("no-scroll");
        } else {
          document.querySelector("body").classList.remove("no-scroll");
        }
    }, [canScroll]);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200])


    return (
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className='about-more'
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <div className='container'>
          <div className='row top'>
            <motion.div className='title'>
              <motion.span className='word' variants={firstName} animate={{opacity: 1}}>
                <motion.span variants={letter}>A</motion.span>
                <motion.span variants={letter}>b</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>t</motion.span>
              </motion.span>
              <motion.span className='word' variants={lastName}>
                <motion.span variants={letter}>U</motion.span>
                <motion.span variants={letter}>s</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className='row bottom'>
          <motion.div className='img-container'>
            {/* <motion.div
              layout
              layoutId='img'
              initial={{
                width: imageDetails.width,
                height: imageDetails.height,
                scale: 1
              }}
              animate={{
                y: "-50%",
                width: "100%",
                height: "50vh",
                transition: { delay: 0.2, ...transition }
              }}
            >
              <motion.div
                whileHover='hover'
                transition={transition}
              >
                <motion.img 
                  src={bgimg}
                  alt='bgimg'
                  style={{ scale: scale }}
                  initial={{ scale: 1.0 }}
                  animate={{
                    transition: { delay: 0.2, ...transition },
                  }}
                />

              </motion.div>
            </motion.div> */}
          </motion.div>
          {/* <ScrollForMore /> */}
        </div>
        
        
      </motion.div>
    )
}

export default AboutMore