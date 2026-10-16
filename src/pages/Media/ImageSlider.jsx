import { useState, useEffect, useRef } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import './imageSlider.css';
import { s3Image } from '../../lib/api';

const ImageSlider = ({ images, index }) => {
    const [imageIndex, setImageIndex] = useState(index);
    const [isSliding, setIsSliding] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchMoveX, setTouchMoveX] = useState(0);
    const [velocity, setVelocity] = useState(0);

    const sliderRef = useRef(null);
    const prev = (imageIndex - 1 + images.length) % images.length;
    const next = (imageIndex + 1 + images.length) % images.length;

    const handleNextImage = () => {
        if (isSliding || isTransitioning) return;
        setIsSliding(true);
        setDirection(1);
    };

    const handlePrevImage = () => {
        if (isSliding || isTransitioning) return;
        setIsSliding(true);
        setDirection(-1);
    };

    const handleTouchStart = (e) => {
        if (isTransitioning) return;
        const touchX = e.touches[0].clientX;
        setTouchStartX(touchX);
        setTouchMoveX(touchX);
    };

    const handleTouchMove = (e) => {
        if (isSliding || isTransitioning) return;
        const touchX = e.touches[0].clientX;
        setTouchMoveX(touchX);
        const distanceMoved = touchX - touchStartX;
        const velocity = distanceMoved / e.timeStamp;
        setVelocity(Math.abs(velocity));
        sliderRef.current.style.transform = `translateX(${distanceMoved}px)`;
    };

    const handleTouchEnd = () => {
        if (isTransitioning) return;
        const swipeDistance = touchMoveX - touchStartX;
        const swipeThreshold = 30;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0) handleNextImage();
            else handlePrevImage();
        } else {
            sliderRef.current.style.transform = 'translateX(0)';
        }
    };

    useEffect(() => {
        if (!isSliding) return;
        setIsTransitioning(true);

        const timeout = setTimeout(() => {
            setImageIndex((prevIndex) => {
                return (prevIndex + direction + images.length) % images.length;
            });
            setIsSliding(false);
            setDirection(0);
            setIsTransitioning(false);
        }, 300 * (1 / (1 + velocity)));

        return () => clearTimeout(timeout);
    }, [isSliding, direction, velocity, images.length]);

    const transitionSpeed = 0.3 * (1 / (1 + velocity))

    return (
        <div 
            className='slider' 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button className='cycle prev' onClick={handlePrevImage} aria-label='Previous image'><FaChevronLeft /></button>
            <button className='cycle next' onClick={handleNextImage} aria-label='Next image'><FaChevronRight /></button>
            <div 
                ref={sliderRef}
                className='slider-container'
                style={{
                    transition: isSliding ? `transform ${transitionSpeed}s` : 'none',
                    transform: `translateX(calc(${direction} * -100%))`,
                }}
            >
                <div className='image-wrapper'>
                    <img 
                        src={s3Image(images[prev].id)} 
                        alt={images[prev].name}
                    />
                </div>
                <div className='image-wrapper'>
                    <img 
                        src={s3Image(images[imageIndex].id)} 
                        alt={images[imageIndex].name}
                    />
                </div>
                <div className='image-wrapper'>
                    <img 
                        src={s3Image(images[next].id)} 
                        alt={images[next].name}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
