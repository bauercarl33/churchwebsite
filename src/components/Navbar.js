import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import '../css/navbar.css'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)    

    const closeMenu = () => setClick(false)
    let location = useLocation()

    return (
        <div className='header'>
            <nav className='navbar'>
                <Link to='/#home' onClick={closeMenu} className='logo'>St. Mary</Link> 
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#000' }} />)
                        : (<FaBars size={30} style={{ color: '#000' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link 
                            to='/#home' 
                            onClick={closeMenu} 
                            className={location.hash === '#home' ? 'active' : ''}
                        >
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link 
                            to='/#about' 
                            onClick={closeMenu}
                            className={location.hash === '#about' ? 'active' : ''}
                        >
                            About
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link 
                            to='/#bulletin' 
                            onClick={closeMenu}
                            className={location.hash === '#bulletin' ? 'active' : ''}
                        >
                            Bulletin
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link 
                            to='/#calendar' 
                            onClick={closeMenu}
                            className={location.hash === '#calendar' ? 'active' : ''}
                        >
                            Calendar
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link 
                            to='/#photos' 
                            onClick={closeMenu}
                            className={location.hash === '#photos' ? 'active' : ''}
                        >
                            Photos
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link 
                            to='/#faq' 
                            onClick={closeMenu}
                            className={location.hash === '#faq' ? 'active' : ''}
                        >
                            FAQ
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar