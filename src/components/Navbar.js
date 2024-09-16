import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import {Link} from 'react-scroll'

import '../css/navbar.css'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const [selectItem, setSelectItem] = useState("home")
    const handleClick = () => setClick(!click)
    

    const closeMenu = () => setClick(false)

    return (
        <div className='header'>
            <nav className='navbar'>
                <Link to='home' spy={true} smooth={true} offset={0} duration={500} className='logo'>
                    ST MARY
                </Link>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to='home' spy={true} smooth={true} offset={0} duration={500} onClick={closeMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='about' spy={true} smooth={true} offset={0} duration={500} onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='bulletin' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>Bulletin</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='calendar' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>Calendar</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='photo-album' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>Photos</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='faq' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>FAQ</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar