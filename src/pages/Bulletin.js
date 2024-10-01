import React, { useLayoutEffect, useRef, useState } from 'react'

import '../css/bulletin.css'
import { motion, useScroll, useTransform } from 'framer-motion';

const Bulletin = () => {
    // const bulletinRef = useRef(null)
    // const { scrollYProgress } = useScroll({
    //     target: bulletinRef,
    //     offset: ["start end", "end start"]
    // });

    // const y = useTransform(scrollYProgress, [0, 1], ['150%', '0%']);

    return (
        // <motion.div className='bulletin'>
        //     <motion.div 
        //         className='parallax-img' 
        //         id='bulletin'
        //         ref={bulletinRef}
        //         style={{
        //             backgroundPositionY: y,
        //         }}
        //     />
        //         <div className='container'>
        //             <div className='content'>
        //                 <div className='title'>
        //                     <h3>Bulletin</h3>
        //                     <span className='line' />
        //                 </div>
        //                 <ul>
        //                     <li>
        //                         <h6>Monday, September 23, 2024</h6>
        //                         <p>9:30am: Orthros</p>
        //                         <p>10:30am: Divine Liturgy</p>
        //                     </li>
        //                     <li>
        //                         <h6>Tuesday, September 24, 2024</h6>
        //                         <p>9:30am: Orthros</p>
        //                         <p>10:30am: Divine Liturgy</p>
        //                     </li>
        //                     <li>
        //                         <h6>Wednesday, September 25, 2024</h6>
        //                         <p>9:30am: Orthros</p>
        //                         <p>10:30am: Divine Liturgy</p>
        //                     </li>
        //                     <li>
        //                         <h6>Thursday, September 26, 2024</h6>
        //                         <p>9:30am: Orthros</p>
        //                         <p>10:30am: Divine Liturgy</p>
        //                     </li>
        //                     <li>
        //                         <h6>Friday, September 27, 2024</h6>
        //                         <p>9:30am: Orthros</p>
        //                         <p>10:30am: Divine Liturgy</p>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        // </motion.div>
        <div className='bulletin'>
            <div className='container'>

            </div>
        </div>
    )
}

export default Bulletin