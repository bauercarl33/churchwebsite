import React from 'react'

import './infinite-slider.css'

const InfiniteSlider = ({ images, reverse }) => {
    return (
        <div className='infinite-wrapper'>
            <div className={
                reverse ? 'infinite-slider reverse' : 'infinite-slider'
            }>
                {images.map((image, index) => {
                    return (
                        <img 
                            src={`https://saintmarychurch.s3.amazonaws.com/images/${image}`} 
                            key={image}
                            alt='Images of our community.'   
                        />
                    )
                })}
                {images.map((image, index) => {
                    return (
                        <img 
                            src={`https://saintmarychurch.s3.amazonaws.com/images/${image}`} 
                            key={image + '2'}
                            alt='Images of our community.'       
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default InfiniteSlider