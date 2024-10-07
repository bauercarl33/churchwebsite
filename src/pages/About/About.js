import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../../images/church-home.jpg'
import './about.css'


const About = () => {
    return (
      <>
        <div className='title-img'>
            <div class="e-with-fixed-bg">
                <div class="bg-wrap">
                    <div class="bg" />
                </div>
                <div className='page-title'>
                  <h1>About Us</h1>
                </div>
            </div>
        </div>
        <div className='about-more'>
          
        </div>
      </>
      
    )
}

export default About