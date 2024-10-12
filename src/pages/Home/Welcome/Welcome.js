import React from 'react'
import { Link } from 'react-router-dom'

import './welcome.css'
import { FaCalendar, FaChevronRight, FaLocationDot } from 'react-icons/fa6'
import { FaDoorOpen } from 'react-icons/fa'

const Welcome = () => {
  return (
    <div className='welcome'>
        <div className='container'>
            <div className='card'>
                {/* <FaLocationDot size={24} className='icon' /> */}
                <h5>Temporary Location</h5>
                <p>13740 Research Boulevard, 1 Lake Creek Office Park Suite W, Austin, TX 78759</p>
                <a 
                    href='https://www.google.com/maps/search/13740+Research+Boulevard,+1+Lake+Creek+Office+Park+Suite+W,+Austin,+TX+78759/@30.4591469,-97.7973402,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D'
                    aria-label='Map to church'
                    target='_blank'
                >
                    Map<span><FaChevronRight size={12} /></span>
                </a>
            </div>
            <div className='card'>
                {/* <FaCalendar size={24} className='icon' /> */}
                <h5>Divine Services</h5>
                <p>Orthros on Sundays at 9:30am followed by the Divine Liturgy of St. John Chrysostom at 10:30am. Check the calendar for more.</p>
                <Link
                    to='/calendar' 
                    aria-label='Church calendar'
                >
                    Calendar<span><FaChevronRight size={12} /></span>
                </Link>
            </div>
            <div className='card'>
                {/* <FaDoorOpen size={24} className='icon' /> */}
                <h5>Visitors Welcome</h5>
                <p>Please come, we love visitors! If you have any questions, please see the FAQ.</p>
                <Link
                    to='/faq' 
                    aria-label='Frequently asked questions'
                >
                    FAQ<span><FaChevronRight size={12} /></span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Welcome