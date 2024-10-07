import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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