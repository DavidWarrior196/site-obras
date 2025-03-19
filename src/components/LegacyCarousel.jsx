import { useEffect, useState } from 'react';
import '@styles/global.css';

export default function Carousel({ slides }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(slides.length - 1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAuto, setIsAuto] = useState(true);

    const nextSlide = () => {
        if (!isAnimating) {
            setPreviousIndex(currentIndex);
            setCurrentIndex((currentIndex + 1) % slides.length);
            setIsAnimating(true);
            setIsAuto(false);
        }
    };
    
    const previousSlide = () => {
        if (!isAnimating) {
            setPreviousIndex(currentIndex);
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
            setIsAnimating(true);
            setIsAuto(false);
        }
    };

    useEffect(() => {
        const carouselInterval = setInterval(() => {
            document.querySelector(".carousel__arrow--right").click();
        }, 5000);
        if(!isAuto) clearInterval(carouselInterval);
        return () => clearInterval(carouselInterval);
    }, [isAuto]);

    return (
        <div className="carousel">
            <div 
                className="carousel__display"
                onTransitionEnd={() => setIsAnimating(false)}
            >
                {slides.map((slide, index) =>
                    <SlideImage
                        src={`images/carousel/${slide.imageSrc}`}
                        alt={slide.imageAlt}
                        index={index}
                        involved={index == currentIndex || index == previousIndex}
                        showing={currentIndex == index}
                        direction={previousIndex === slides.length - 1 && currentIndex === 0
                            ? -1 // Último para o primeiro
                            : previousIndex === 0 && currentIndex === slides.length - 1
                            ? 1 // Primeiro para o último
                            : currentIndex > previousIndex
                            ? -1 // Normal (direita)
                            : 1 // Normal (esquerda)
                        }
                        title={slide.title}
                        description={slide.description}
                    />
                )}
            </div>
                
            <div className="carousel__controls">
                <button 
                    className="carousel__arrow carousel__arrow--left"
                    onClick={previousSlide}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                    className="carousel__arrow carousel__arrow--right"
                    onClick={nextSlide}
                    id="ball"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>
    ); 
}

function SlideImage({ src, alt, showing, involved, direction, title, description }) {

    const calculateTransforms = (multiplier = 1) => {
        if(showing) return "translateX(0)";
        if(involved) return direction === 1 ? `translateX(${100 * multiplier}%)` : `translateX(-${100 * multiplier}%)`;
        return direction === 1 ? `translateX(-${100}%)` : `translateX(${100}%)`;
    }
    
    const slideStyles = {
        transform: calculateTransforms(),
        transition: involved ? "transform 0.8s ease-in-out" : "none",
        visibility: involved ? "visible" : "hidden"
    }

    const titleStyles = {
        transform: calculateTransforms(1.2),
        transition: involved ? "transform 0.8s ease-in-out" : "none",
    }

    const descriptionStyles = {
        transform: calculateTransforms(1.2),
        transition: involved ? "transform 0.7s ease-in-out 0.1s" : "none",
    }

    const buttonStyles = {
        transform: calculateTransforms(1.2),
        transition: involved ? "transform 0.6s ease-in-out 0.2s" : "none",
    }

    return (
        <div className="carousel__slide" style={slideStyles}>
            <div className="carousel__slide_image_container">
                <img 
                    src={src}
                    alt={alt}
                    className="carousel__slide_image"
                />
            </div>
            <div className="carousel__slide_text_container">
                <div className="carousel__slide_text">
                    <h1 className="carousel__slide_title light_text" style={titleStyles}>
                        {title}
                    </h1>
                    <span className="carousel__slide_description light_text" style={descriptionStyles}>
                        {description}
                    </span>
                    <div className="carousel__slide_button" style={buttonStyles}>
                        <ExploreButton 
                            text="Explora Mais"
                            url="/"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExploreButton({ text, url }) {
    return (
        <a 
            className="button--primary"
            href={url}
        >
            {text}
        </a>
    );
}