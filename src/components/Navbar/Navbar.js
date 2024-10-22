import React, { useEffect, useState } from 'react'

import './navbar.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Events, Link as ScrollLink, scroller } from 'react-scroll'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const pages = {
        'Home': '/',
        'About': '/about',
        'Calendar': '/calendar',
        'Media': '/media',
        'Visitors': '/visitors',
    }

    const location = useLocation()
    const navigate = useNavigate()

    const [click, setClick] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [navColor, setNavColor] = useState({bg: 'transparent', text: 'var(--bg-color)'})
    const [activeLink, setActiveLink] = useState('/')
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const closeMenu = (link) => {
        setClick(false);
    }
    const handleClick = () => {
        setClick(!click);
    }
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
        const preventDefault = (e) => e.preventDefault();
    
        if (click) {
            document.body.style.overflow = 'hidden';
            document.body.addEventListener('touchmove', preventDefault, { passive: false });
        } else {
            document.body.style.overflow = '';
            document.body.removeEventListener('touchmove', preventDefault);
        }
    
        return () => {
            document.body.style.overflow = '';
            document.body.removeEventListener('touchmove', preventDefault);
        };
    }, [click]);

    useEffect(() => {
        const handleResize = () => { 
            const width = window.innerWidth;
            setWindowSize(width);

            if (width > 960) {
                setClick(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            document.body.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <header>
            <nav>
                <RouterLink to='/' onClick={closeMenu} className='logo'>
                    <h6>St. Mary</h6>
                </RouterLink>
                <div className='button-wrapper'>
                    <RouterLink to='/donate' id='mobile' className='button filled'>
                        Donate
                    </RouterLink>
                    <div className='hamburger' onClick={handleClick}>
                        {click ?
                            <div className='hamburger-icon active'/> :
                            <div className='hamburger-icon' />
                        }
                    </div>
                </div>
                <ul className={click ? "active" : ""}>
                    {Object.entries(pages).map(([name, link]) => (
                        <li 
                            key={name}
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
                <RouterLink to='/donate' id='fullscreen' className='button filled'>
                    Donate
                </RouterLink>
            </nav>
        </header>
    )
}

export default Navbar