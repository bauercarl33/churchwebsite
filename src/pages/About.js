import React from 'react'
import {Link} from 'react-router-dom'

import Theotokos from '../images/Theotokos.jpg'
import '../css/about.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img className='icon' src={Theotokos} alt='Theotokos' />
                <div className='col'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>
                        St. Mary Orthodox Church is a canonical Church under the Romanian 
                        Orthodox Metropolia of the Americas, with the blessing of his Eminence 
                        Archbishop and Metropolitan Nicolae.
                    </p>
                    <button className='button'><Link to='/about'>Learn More</Link></button>
                </div>
            </div>
        </div>
    )
}

export default About