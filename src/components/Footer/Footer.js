import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { footerLinks, pageLinks, socialLinks } from './footerVars'
import './footer.css'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='footer'>
      <div className='container'>
          <div className='logo'>
            <Link to='/' aria-label='Go back to home page'>
              <h4>St. Mary</h4>
              <h5>Orthodox Church</h5>
            </Link>
          </div>
          <div className='info'>
            {Object.entries(footerLinks).map(([key, value]) => {
              return (
                <a href={value.link} key={key} target='_blank'>
                  <span className='item' aria-label={value.label}>
                      {value.icon}
                      <p>
                        <span className={value.bold}>{value.boldContent} &nbsp;</span>
                        {value.content}
                      </p>
                  </span>
                </a>
              )
            })}
            <button 
              className='button filled' 
              onClick={() => navigate('/donate')}
              aria-label='Go to donation page'
            >
              Donate
            </button>
          </div>
      </div>
      <div className='bottom'>
        <ul className='links'>
          {Object.entries(pageLinks).map(([key, value]) => {
            return (
              <li key={key}>
                <Link to={value.link} aria-label={value.label}>
                  {value.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className='social'>
          {Object.entries(socialLinks).map(([key, value]) => {
            return (
              <li key={key}>
                <a href={value.link} aria-label={value.label} target='_blank'>
                  {value.icon}
                </a>
              </li>
            )
          })}
        </ul>
        <p>St. Mary Orthodox Church</p>
      </div>
    </div>
  )
}

export default Footer