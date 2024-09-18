import React from 'react'
import {Link} from 'react-router-dom'

import '../css/navbar.css'
import cross from '../images/cross.png'
import png from '../images/png-1.svg'

const Navbar = () => {
  return (
    <div className='header'>
        <Link className='logo' to='/'>
            {/* <img className='logo' src={cross} alt="png" /> */}
            <h1>St. Mary</h1>
        </Link>
        <div className='nav-links'>
            <div className='nav-item'>
                <Link className='nav-link' to='/'>Home</Link>
            </div>
            <div className='nav-item'>
                <Link className='nav-link' to='/about'>About</Link>
            </div>
            <div className='nav-item'>
                <Link className='nav-link' to='/bulletin'>Bulletin</Link>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar