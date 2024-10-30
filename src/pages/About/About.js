import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../../images/church-home.jpg'
import './about.css'


const About = () => {
    return (
      <>
        <div className='heading'>
          <img className='bg' src={bgimg} alt='bg' />
          <div className='overlay' />
        </div>
        <div className='about'>
          <section>
            <h5>Who we are</h5>
            <p>St. Mary Orthodox Church is a tight-knit, loving community of parishioners who partake in the traditions of the Orthodox Faith. We seek to grow in faith together through the Most Holy Trinity and warmly welcome people from all backgrounds to join us.</p>
          </section>
          
          <h5>Our Parish's History</h5>
          <p>Magna labore laboris officia aliquip. Incididunt fugiat id minim aute amet reprehenderit adipisicing proident ut sunt irure velit aliquip sint. Adipisicing et aliquip eu sunt sint ex fugiat pariatur magna elit pariatur elit eu aliqua. Adipisicing pariatur sit sint labore nostrud minim dolore ad dolore sint aliquip. Incididunt mollit sint ut eiusmod adipisicing consequat</p>
          <img src={bgimg} alt='bg' />
          <p>Magna labore laboris officia aliquip. Incididunt fugiat id minim aute amet reprehenderit adipisicing proident ut sunt irure velit aliquip sint. Adipisicing et aliquip eu sunt sint ex fugiat pariatur magna elit pariatur elit eu aliqua. Adipisicing pariatur sit sint labore nostrud minim dolore ad dolore sint aliquip. Incididunt mollit sint ut eiusmod adipisicing consequat</p>
        </div>
      </>
      
    )
}

export default About