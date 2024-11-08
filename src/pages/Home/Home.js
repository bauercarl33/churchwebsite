import React from 'react';

import Hero from './Hero/Hero';
import ColSection from '../../components/ColSection/ColSection';
import Welcome from './Welcome/Welcome';
import Mission from './Mission/Mission';

import { colSectionVars } from './ColSectionVars';

const Home = () => {
    return (
        <>
            <Hero />
            <Mission />
            <Welcome />
            <ColSection colSectionVars={colSectionVars} />            
        </>
    )
}

export default Home