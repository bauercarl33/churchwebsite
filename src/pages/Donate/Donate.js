import React, { useState } from 'react'

import './donate.css'


const Donate = () => {
  const svgs = {
    cashapp: '/public/donate/cashapp.svg',
    venmo: '/public/donate/venmo.svg',
    paypal: '/donate/paypal.svg',
    gofundme: '/donate/gofundme.svg'
  }

  const [donationOption, setDonationOption] = useState('venmo')

  const handleDonation = (option) => {
    setDonationOption(option);
  }

  return (
    <div className='donate'>
      {/* <div className='container'>
        <div className='buttons'>
          <button className='button'>
          </button>
        </div>
      </div> */}
      <iframe 
        src='https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0' 
        style={{
          width: '100%',
          height: '100vh',
          marginTop: '80px',
          border: 'none',
          // overflow: 'hidden'
        }}
      />
    </div>
  )
}

export default Donate