import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPhoneAlt, FaFax, FaFacebook, FaInstagram, FaEnvelope, FaTruck } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

import './footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const links = {
    home: '/#home',
    about: '/#about',
    calendar: '/#calendar',
    location: 'https://www.google.com/maps/search/13740+Research+Boulevard,+1+Lake+Creek+Office+Park+Suite+W,+Austin,+TX+78759/@30.4591469,-97.7973402,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    parking: 'https://www.google.com/maps/place/11111+Lakeline+Blvd,+Austin,+TX+78717/@30.4788245,-97.798764,17z/data=!3m1!4b1!4m6!3m5!1s0x865b32a7ff7d7151:0x773487c9ebcceaee!8m2!3d30.4788245!4d-97.7961891!16s%2Fg%2F11bw435mbp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    // phoneFax: '8325385188',
    phoneFax: '7374004458',
    email: 'church@saintmaryaustin.org',
    donate: '/donate',
    facebook: 'https://www.facebook.com/saintmaryaustin/',
    instagram: 'https://www.instagram.com/saintmaryaustin/'
  }

  return (
    <div className='footer'>
      <div className='container'>
          <div className='logo'>
            <Link to='/'>
              <h3>St. Mary</h3>
              <h5>Orthodox Church</h5>
            </Link>
          </div>
          <div className='info'>
            <a href={links.location} target='_blank'>
              <span className='item'>
                  <FaLocationDot size={24} className='icon' />
                  <p>
                    <span className='bold'>NEW Temporary Address:&nbsp;</span>
                    13740 Research Boulevard, 1 Lake Creek Office Park Suite W, Austin, TX 78759
                  </p>
              </span>
            </a>
            <a href={links.parking} target='_blank'>
              <span className='item'>
                <FaTruck size={24} className='icon' />
                <p>
                  <span className='bold'>Semi-truck parking:&nbsp;</span>
                  11111 Lakeline Blvd, Austin, TX 78717
                </p>
              </span>
            </a>
            <a href={'tel:' + links.phoneFax} target='_blank'>
              <span className='item'>
                <FaPhoneAlt size={24} className='icon' />
                <p>(737) 400-4458</p>
              </span>
            </a>
            <a href={'tel:' + links.phoneFax} target='_blank'>
              <span className='item'>
                <FaFax size={24} className='icon' />
                <p>(737) 400-4458</p>
              </span> 
            </a>
            <a href={'mailto:' + links.email} target='_blank'>
              <span className='item'>
                <FaEnvelope size={24} className='icon' />
                <p>church@saintmaryaustin.org</p>
              </span> 
            </a>
            <button className='button' onClick={() => navigate(links.donate)}>Donate</button>
          </div>
      </div>
      <div className='bottom'>
        <ul className='links'>
          <li><Link to={links.home}>Home</Link></li>
          <li><Link to={links.about}>About</Link></li>
          <li><Link to={links.calendar}>Calendar</Link></li>
        </ul>
        <ul className='social'>
          <li>
            <a href={links.facebook} target='_blank'>
              <FaFacebook size={32} className='icon'/>
            </a>
          </li>
          <li>
            <a href={links.instagram} target='_blank'>
              <FaInstagram size={32} className='icon'/>
            </a>
          </li>
        </ul>
        <p>St. Mary Orthodox Church</p>
      </div>
    </div>
  )
}

export default Footer