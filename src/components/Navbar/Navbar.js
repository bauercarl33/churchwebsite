import React, { useEffect, useState } from 'react'

import './navbar.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Events, Link as ScrollLink, scroller } from 'react-scroll'
import { AnimatePresence } from 'framer-motion'
import { GrHomeRounded, GrCircleInformation, GrCalendar, GrCamera } from "react-icons/gr";
import { LuDoorOpen } from "react-icons/lu";


const Navbar = () => {
    const donationLink = 'https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0'

    const pages = {
        'Home': {
            link: '/',
            icon: <GrHomeRounded className='icon'/>
        },
        'About': {
            link: '/about',
            icon: <GrCircleInformation className='icon' />
        },
        'Calendar': {
            link: '/calendar',
            icon: <GrCalendar className='icon' />
        },
        'Media': {
            link: '/media',
            icon: <GrCamera className='icon' />
        },
        'Visitors': {
            link: '/visitors',
            icon: <LuDoorOpen className='icon' />
        }
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
        if (click) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    
        return () => {
            document.body.style.overflow = '';
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
                    <a href={donationLink} target='_blank' aria-label='To donation page' id='mobile' className='button filled'>
                        Donate
                    </a>
                    {/* <RouterLink to='/donate' id='mobile' className='button filled'>
                        Donate
                    </RouterLink> */}
                    <div className='hamburger' onClick={handleClick}>
                        {click ?
                            <div className='hamburger-icon active'/> :
                            <div className='hamburger-icon' />
                        }
                    </div>
                </div>
                <ul className={click ? "active" : ""}>
                    {Object.entries(pages).map(([name, data]) => (
                        <li 
                            key={name}
                            onClick={() => closeMenu(data.link)}
                            className={activeLink === data.link ? 'active' : ''} 
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
                            <RouterLink to={data.link}>
                                {data.icon}{name}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
                {/* <RouterLink to='/donate' id='fullscreen' className='button filled'>
                    Donate
                </RouterLink> */}
                <a href={donationLink} target='_blank' id='fullscreen' aria-label='To donation page.' className='button filled'>
                    Donate
                </a>
            </nav>
        </header>
    )
}

export default Navbar