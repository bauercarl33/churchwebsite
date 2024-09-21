import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../images/bgimg.jpg'
import '../css/aboutmore.css'
import ScrollForMore from '../components/ScrollForMore';

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
      <div className='about-more'>
        <div className='container'>
          <div className='top-row'>
            <div className='title-wrapper'>
            <div className='title'>
              <span>A</span>
              <span>b</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </div>
            <div className='title'>
              <span>U</span>
              <span>s</span>
            </div>
            </div>
          </div>
          <div className='bottom-row'>
            <div className='img-container'>
              <img src={bgimg} />
            </div>
          </div>
          <div className='info'>
            <div className='info-container'>
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
      </div>
    )
}

export default AboutMore