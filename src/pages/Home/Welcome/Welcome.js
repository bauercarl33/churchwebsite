import React from 'react'

import './welcome.css'
import { FaLocationDot } from 'react-icons/fa6'
import { FaDoorOpen } from 'react-icons/fa'

const Welcome = () => {
  return (
    <div className='welcome'>
        <div className='heading'>
            <h3>Welcome</h3>
            <p>It would be a blessing for you to join us in worship of the the Most Holy Trinity.</p>
        </div>
        
        <div className='container'>
            <div className='card'>
                <FaLocationDot size={160} className='icon' color='var(--primary-color' />
                <h5>Temporary Location</h5>
                <p>13740 Research Boulevard, 1 Lake Creek Office Park Suite W, Austin, TX 78759</p>
            </div>
            <div className='card'>
                <FaDoorOpen size={160} className='icon' />
                <h5>Visitors Welcome</h5>
                <p>Plese come, we love visitors! If you have any questions, please see the FAQ.</p>
            </div>
        </div>
    </div>
  )
}

export default Welcome