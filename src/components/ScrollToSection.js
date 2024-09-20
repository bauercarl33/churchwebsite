import { useEffect } from 'react'
import { scroller } from 'react-scroll'
import { useLocation } from 'react-router';

const ScrollToSection = () => {
    const location = useLocation();
  
    useEffect(() => {
      const hash = location.hash.replace('#', '');
      
      if (hash) {
        scroller.scrollTo(hash, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      }
    }, [location]);
  
    return null;
  };

export default ScrollToSection