import React from 'react'

import './mission.css'
import InfiniteSlider from './InfiniteSlider'


const Mission = () => {
    const images = [
        "1uuK_CTkF2t7zoa4ApJiYFN_kB1f-FuzT",
        "1edY29V8tPqq0LbetBujJ7HZiS06vaeJq",
        "1IHC06XtLEkFz57I4DzfXD_P7nRBFF3OA",
        "1LtuDhQSwXLI6QQZOCEMRosXoyTQEAmt2",
        "1frW7TdxVYaNUqe7D8UsDGNJ-aVwNFdwd",
        "1iaQYjJaX-OdyZsruM2ti9bfFbTQnBPJx",
        "1SimxkZIw-pvA7fdhQ-trW4LcBuovsaBk",
        "15kZH16bjYkLLN4w7tz509tMXvFLpqr3x"
    ]

    return (
        <div className='mission'>
            <div className='decoration'/>
            <div className='statement'>
                <h5>
                    St. Mary Orthodox Church aims to provide a spiritual home for anyone who desires salvation through Christ.
                </h5>
            </div>
            <InfiniteSlider images={images} />
        </div>
    )
}

export default Mission