import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../../images/church-home.jpg'
import './about.css'

import { sections } from './AboutVars';


const About = () => {
    return (
      <>
        <div className='heading'>
          <img className='bg' src={bgimg} alt='bg' />
          <div className='overlay' />
        </div>
        <div className='about'>
          {Object.entries(sections).map((item, index) => {
            console.log(item[1])
            return (
              <section key={item[1].heading}>
                <h5>{item[1].heading}</h5>
                {Object.entries(item[1].paragraphs).map((para, index) => {
                  return (
                    <p key={index}>{para[1]}</p>
                  )
                })}
              </section>
            )
          })}
          </div>
      </>
      
    )
}

export default About