import React from 'react';

import Hero from './Hero/Hero';
import ColSection from './ColSection/ColSection';
import Welcome from './Welcome/Welcome';
import Mission from './Mission/Mission';

const Home = () => {
    return (
        <>
            <Hero />
            <Mission />
            <Welcome />
            <ColSection />            
        </>
    )
}

export default Home