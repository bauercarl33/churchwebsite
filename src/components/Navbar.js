import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import '../css/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const [selectItem, setSelectItem] = useState("home")
    const handleClick = () => setClick(!click)    

    const closeMenu = () => setClick(false)

    return (
        <div className='header'>
            <nav className='navbar'>
                <Link to='/#home' onClick={closeMenu} className='logo'>LOGO</Link> 
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to='/#home' onClick={closeMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/#about' onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/#bulletin' onClick={closeMenu}>Bulletin</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/#calendar' onClick={closeMenu}>Calendar</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/#photo-album' onClick={closeMenu}>Photos</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/#faq' onClick={closeMenu}>FAQ</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar