import React, { useEffect, useState } from 'react'
import './visitors.css'
import { QAs } from './QAs';

const Visitors = () => { 
    const [selected, setSelected] = useState(null);

    const handleClick = (index) => {
        index === selected ? setSelected(null) : setSelected(index);
    }

    return (
        <div className='visitors'>
            <div className='accordion'>
                {Object.entries(QAs).map((item, index) => {
                    return (
                        <div className={selected === index ? 'item open' : 'item'} key={index}>
                            <button onClick={() => handleClick(index)}>
                                <h6>{item[1].question}</h6>
                            </button>
                            <p>{item[1].answer}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Visitors;