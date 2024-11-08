import React, { useEffect, useState, useRef } from 'react';
import './navbar.css';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { GrHomeRounded, GrCircleInformation, GrCalendar, GrCamera } from "react-icons/gr";
import { LuDoorOpen } from "react-icons/lu";

const Navbar = () => {
    const donationLink = 'https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0';

    const pages = {
        'Home': {
            link: '/',
            icon: <GrHomeRounded className='icon' />
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
    };

    const location = useLocation();
    const [click, setClick] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [pillStyle, setPillStyle] = useState({ top: 0, left: 0, width: 0 });
    const navRef = useRef(null);

    const closeMenu = () => {
        setClick(false);
    };

    const handleClick = () => {
        setClick(!click);
    };
    
    const handleLink = (link) => {
        setActiveLink(link)
        closeMenu();
    };

    useEffect(() => {
        setActiveLink(location.pathname);
        window.scroll(0, 0);
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
            if (width > 960) {
                setClick(false);
            }

            // Recalculate the pill position and size based on the active link on resize
            const activeElement = navRef.current?.querySelector('.active a');
            if (activeElement) {
                updatePillPosition(activeElement);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const activeElement = navRef.current?.querySelector('.active a');
        if (activeElement) {
            updatePillPosition(activeElement);
        }
    }, [activeLink]);

    const updatePillPosition = (element) => {
        const rect = element.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setPillStyle({
            top: rect.top - navRect.top - 7,
            left: rect.left - navRect.left - 17,
            width: rect.width + 32,
        });
    };

    const handleMouseEnter = (e) => {
        const target = e.currentTarget.querySelector('a');
        if (target) {
            updatePillPosition(target);
        }
    };

    const handleMouseLeave = () => {
        // Reset the pill to the active link position
        const activeElement = navRef.current?.querySelector('.active a');
        if (activeElement) {
            updatePillPosition(activeElement);
        }
    };

    return (
        <header className='navbar'>
            <nav ref={navRef}>
                <RouterLink to='/' onClick={closeMenu} className='logo'>
                    <h6>St. Mary</h6>
                </RouterLink>
                <div className='button-wrapper'>
                    <a href={donationLink} target='_blank' aria-label='To donation page' id='mobile' className='button filled'>
                        Donate
                    </a>
                    <div className='hamburger' onClick={handleClick}>
                        <div className={click ? 'hamburger-icon active' : 'hamburger-icon'} />
                    </div>
                </div>
                <ul className={click ? "active" : ""}>
                    <div className="pill" style={pillStyle} />
                    {Object.entries(pages).map(([name, data]) => (
                        <li
                            key={name}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleLink(data.link)}
                            className={activeLink === data.link ? 'active' : ''}
                        >
                            <RouterLink to={data.link}>
                                {data.icon}{name}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
                <a href={donationLink} target='_blank' id='fullscreen' aria-label='To donation page' className='button filled'>
                    Donate
                </a>
            </nav>
        </header>
    );
};

export default Navbar;
