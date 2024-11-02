import React from 'react'

import './infinite-slider.css'

const InfiniteSlider = ({ reverse }) => {
    const images = [
        '/images/home/image1.jpeg',
        '/images/home/image2.jpeg',
        '/images/home/image3.jpeg',
        '/images/home/image4.jpeg',
        '/images/home/image5.jpeg',
        '/images/home/image6.jpeg',
        '/images/home/image7.jpeg',
        '/images/home/image8.jpeg'
    ]

    return (
        <div className='infinite-wrapper'>
            <div className={
                reverse ? 'infinite-slider reverse' : 'infinite-slider'
            }>
                {images.map((image, index) => {
                    return (
                        <img src={image} key={index} />
                    )
                })}
                {images.map((image, index) => {
                    return (
                        <img src={image} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default InfiniteSlider