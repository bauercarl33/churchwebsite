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
      <div className='container'>
        <div className='buttons'>
          <button className='button'>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Donate