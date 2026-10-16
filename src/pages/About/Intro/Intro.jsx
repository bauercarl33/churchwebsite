
import './intro.css'

import { introPhoto } from './IntroVars'
import Photo from '../../../components/Photo/Photo'
import { SIZES } from '../../../images/photos'

const Intro = () => {
    return (
        <div className='intro'>
            <div className='decoration' />
            <div className='decoration' />
            <div className='col'>
                <h4>Who We Are</h4>
                <p>
                St. Mary Orthodox Church is a tight-knit, loving community of parishioners who partake in the traditions of the Orthodox Faith. We seek to grow in faith together through the Most Holy Trinity and warmly welcome people from all backgrounds to join us.                </p>
            </div>
            <div className='col'>
                <div className='image'>
                    <Photo
                        name={introPhoto}
                        sizes={SIZES.halfColumn}
                        alt='Our community'
                        loading='eager'
                    />
                </div>
            </div>
        </div>
    )
}

export default Intro