import React from 'react';

import Hero from './Hero/Hero';
import ColSection from './ColSection/ColSection';
import Welcome from './Welcome/Welcome';

const Home = () => {
    return (
        <>
            <Hero />
            <Welcome />
            <ColSection />            
        </>
    )
}

export default Home