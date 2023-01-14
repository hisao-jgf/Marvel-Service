import { useState, useEffect } from 'react';

import arrowUp from '../../resources/img/arrow-up.png';

import './arrowUp.scss';

const ArrowUp = () => {
    const [scroll, setScroll] = useState(0);

    const setScrollPosition = () => {
        setScroll(() => window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', setScrollPosition)

        return () => window.removeEventListener('scroll', setScrollPosition)
    }, [])

    const displayArrow = scroll > 1400 ? <img 
                                            src={arrowUp} 
                                            alt="Arrow-Up" 
                                            className="arrow-up" 
                                            onClick={() => window.scrollTo(0, 0)} 
                                        /> 
                                        : null;
    return (
       <>
        {displayArrow}
       </>
    )
}

export default ArrowUp;