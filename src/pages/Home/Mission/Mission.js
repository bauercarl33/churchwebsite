import React from 'react'

import './mission.css'
import InfiniteSlider from './InfiniteSlider'

const Mission = () => {
    

    return (
        <div className='mission'>
            <InfiniteSlider />
            <div className='statement'>
                <h5>This is a mission statement</h5>
            </div>
            <InfiniteSlider reverse={true} />
        </div>
    )
}

export default Mission