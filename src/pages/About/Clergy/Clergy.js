import React from 'react'

import './clergy.css'

const Clergy = () => {
    return (
        <div className='clergy'>
            <div className='col'>
                <h4>Our Clergy</h4>
                <p>
                    Our current priest, Fr. Gabriel-Teofil Ilies, was born in Romania on October 31, 1988. He completed his studies at the Orthodox Seminary Venianim Costachi of Neamt Monastery, and continued at Fr. Dumitru Staniloae Orthodox University in Iasi. In 2013, Fr. Gabriel moved to the United States and was ordained as a Deacon on March 1, 2020. In February 26, 2022, he had become the Priest of Saint Mary Romanian Orthodox Church. Fr. Gabriel and his wife, Ana-Ioana Ilies, are blessed with two children, Timotei and Elena.
                </p>
            </div>
            <div className='col'>
                <div className='image'>
                <img 
                    alt='Fr. Gabriel'
                    src="https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1Ls9IYg5eX1gHZhF6c6qoQAbX3VyUt04M"
                /> 
                </div>
                
            </div>
        </div>
    )
}

export default Clergy