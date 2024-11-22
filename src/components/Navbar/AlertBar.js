import React from 'react'

import './alert-bar.css'

const AlertBar = ({ active }) => {
    return (
        <div 
            className='alert'
            style={{
                display: active ? 'flex' : 'none'
            }}
        >
            <a 
                href='https://drive.google.com/file/d/1N8bk6NGveprV3arwYoIF40yCUUiPrvrZ/view?usp=sharing'
                target='_blank'
                rel='noreferrer'
            >
                Comunicat de Presă: Biserica românească- lumina viitoarelor generații
            </a>
        </div>
    )
}

export default AlertBar