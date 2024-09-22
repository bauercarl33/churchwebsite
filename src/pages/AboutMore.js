import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { motion, useTransform, useScroll } from "framer-motion";

import bgimg from '../images/bgimg.jpg'
import '../css/aboutmore.css'
import ScrollForMore from '../components/ScrollForMore';

const AboutMore = () => {
    // const { scrollYProgress } = useScroll();
    // const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    // const [canScroll, setCanScroll] = useState(false);

    // useEffect(() => {
    //     if (canScroll === false) {
    //     document.querySelector("body").classList.add("no-scroll");
    //     } else {
    //     document.querySelector("body").classList.remove("no-scroll");
    //     }
    // }, [canScroll]);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200])


    return (
      <div className='about-more'>
        <div className='container'>
          <div className='row top'>
            <div className='title'>
              <div className='word'>
                <span>A</span>
                <span>b</span>
                <span>o</span>
                <span>u</span>
                <span>t</span>
              </div>
              <div className='word'>
                <span>U</span>
                <span>s</span>
              </div>
            </div>
          </div>
          <div className='row bottom'>
            <motion.div className='img-container'>
              <motion.img
                  // className=''
                    src={bgimg}
                    alt="Church"
                    style={{ translateY: y }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  />
              {/* <ProgressiveImage src={bgimg} placeholder={bgimg}>
                {(src) => {
                  <motion.img
                  // className=''
                    src={src}
                    alt="Church"
                    // translateY={y}
                  />
                }}
              </ProgressiveImage> */}
            </motion.div>
          </div>
          <div className='row content'>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
              <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis netus vestibulum fames magna condimentum semper facilisis rutrum sollicitudin. Phasellus euismod convallis elit consequat condimentum quisque dictum accumsan metus. Tellus commodo blandit gravida nec himenaeos interdum consectetur urna. Nec torquent ut cursus semper sollicitudin neque. Dis accumsan at in curae mattis ante elit. Molestie tristique facilisis tristique tristique fringilla accumsan. Fusce ultrices sociosqu ultrices nibh conubia facilisi. Dignissim viverra malesuada ad cursus purus nec ligula mauris.</p><p></p>
          </div>
        </div>
      </div>
    )
}

export default AboutMore