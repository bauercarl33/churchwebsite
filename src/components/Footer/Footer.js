import React from 'react'
import { Link } from 'react-router-dom'

import { footerLinks, pageLinks, socialLinks } from './footerVars'
import './footer.css'

const Footer = () => {
  const donationLink = 'https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0'

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
            <Link to='/donate'
              className='button filled' 
              aria-label='Go to donation page'
            >
              Donate
            </Link>
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