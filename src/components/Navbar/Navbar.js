import React, { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import './navbar.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Events, Link as ScrollLink, scroller } from 'react-scroll'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const pages = {
        'Home': '/',
        'About': '/about',
        'Calendar': '/calendar'
    }

    const location = useLocation()
    const navigate = useNavigate()

    const [click, setClick] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [navColor, setNavColor] = useState('transparent')
    const [activeLink, setActiveLink] = useState('/')

    const closeMenu = (link) => {
        setClick(false)
    }
    const handleClick = () => setClick(!click)
    const handleLink = (link) => setActiveLink('/' + link) 

    
    useEffect(() => {
        // const hash = location.hash.replace('#', '');
        // if (hash) {
        //     scroller.scrollTo(hash, {
        //         duration: 800,
        //         delay: 0,
        //         smooth: 'easeInOutQuart',
        //         offset: 0,
        //     });
        // } else {
        setActiveLink(location.pathname)
            window.scroll(0, 0);
        // }
    }, [location]);


    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          setScrollY(scrollY);

          if (scrollY > window.innerHeight * 0.2) {
            setNavColor('var(--secondary-dark)');
          } else {
            setNavColor('transparent');
          }

        };

        if (click && (window.innerWidth <= 960)) {
            setNavColor('var(--secondary-dark)');
        } else if (scrollY < window.innerHeight * 0.2) {
            setNavColor('transparent')
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [click]);


    useEffect(() => {
        if (click) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [click]);


    return (
        <div 
            className='header'
            style={{
                backgroundColor: navColor,
                transition: '0.5s'
            }}    
        >
            <nav className='navbar'>
                <RouterLink to='/' onClick={closeMenu} className='logo'>
                    St. Mary
                </RouterLink>
                <div className='hamburger'>
                    <button className='button' onClick={() => navigate('/donate')}>
                        Donate
                    </button>
                    {click ? 
                        (<FaTimes 
                            className='hamburger-icon'
                            onClick={handleClick}
                            size={30}
                        />) : 
                        (<FaBars 
                            className='hamburger-icon'
                            onClick={handleClick}
                            size={30}
                        />)}
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    {Object.entries(pages).map(([name, link]) => (
                        <li 
                            key={name}
                            className='nav-item' 
                            onClick={() => closeMenu(link)}
                        >
                            {/* <ScrollLink
                                to={section}
                                smooth={true}
                                duration={800}
                                hashSpy={true}
                                spy={true}
                                onClick={() => closeMenu(section)}
                                activeClass='active'
                            >
                                {section.substring(0, 1).toUpperCase() + section.substring(1)}
                            </ScrollLink> */}
                            <RouterLink 
                                className={activeLink === link ? 'active' : ''} 
                                to={link}
                            >
                                {name}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
                <button className='button' onClick={() => navigate('/donate')}>
                    Donate
                </button>
            </nav>
        </div>
    )
}

export default Navbar