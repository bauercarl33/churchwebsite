
import './mission.css'
import InfiniteSlider from './InfiniteSlider'


const Mission = () => {
    const images = [
        "community-1",
        "community-2",
        "community-3",
        "community-4",
        "community-5",
        "community-6",
        "community-7",
        "community-8",
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