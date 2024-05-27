import React, { useEffect, useRef, useState } from 'react';
import { usePlatform } from '../hooks/useCrossplatform.jsx';
import Button from '../button/button.jsx';
import Popup from '../popup/popup.jsx';
import './productItem.css';

const ProductItem = ({ product }) => {
    const [startPress, endPress] = usePlatform.getTypePress();
    const cardProductRef = useRef(null);
    const [isPopupShow, setIsPopupShow] = useState(false);
    const [isButtonShow, setIsButtonShow] = useState(true);
    const [optionsCard, setOptionsCard] = useState(null);
    let timer = 0; 

    const updateOptions = () => { return cardProductRef.current.getBoundingClientRect() };
    const popupClose = () => {
        cardProductRef.current.classList.remove('hide');
        setIsPopupShow(false);
    };
    const hideButton = () => { setIsButtonShow(false) };
    const showButton = () => { setIsButtonShow(true) };
    const expandCard = () => {
        cardProductRef.current.classList.remove('entering');
        cardProductRef.current.classList.add('hide');
        setOptionsCard(updateOptions);
        setIsPopupShow(true);
    };
    
    const handleStartPress = (e) => {
        if (e.target.closest('.buttonSpace') === null) {
            const cardProduct = cardProductRef.current;
            cardProduct.classList.add('entering');
            const options = updateOptions();
            timer = setTimeout(() => {
                if (options.top >= 55) {
                    if (options.bottom <= window.innerHeight) {
                        expandCard();
                    } else {
                        window.addEventListener('scrollend', expandCard, { once: true });
                        window.scroll({
                            top: cardProduct.offsetTop - window.innerHeight / 8,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    window.addEventListener('scrollend', expandCard, {once: true});
                    window.scroll({
                        top: cardProduct.offsetTop - window.innerHeight / 8,
                        behavior: 'smooth'
                    });
                }
            }, 400);
        }
    };

    const handleEndPress = () => {
        cardProductRef.current.classList.remove('entering');
        clearTimeout(timer);
    };

    useEffect(() => {
        cardProductRef.current.addEventListener(`${startPress}`, handleStartPress);
        cardProductRef.current.addEventListener(`${endPress}`, handleEndPress);
        
        return () => {
            cardProductRef.current.removeEventListener(`${startPress}`, handleStartPress);
            cardProductRef.current.removeEventListener(`${endPress}`, handleEndPress);
        }
    }, []);

    return (
        <>
            <div 
                ref={cardProductRef} 
                className='cardProduct Menu'
            >
                <picture><img src={`data:image/jpeg;base64,${product["ProductPhoto"]}`} alt=''/></picture>
                <h3 >{product["ProductName"]}</h3>
                <p>{product["ProductDescription"]}</p>
                {isButtonShow && (<Button product={product} locationCall={'menu'}/>)}
            </div>
            {isPopupShow && (
                <Popup 
                    product={product} 
                    options={optionsCard}
                    onClose={popupClose}
                    hideButton={hideButton}
                    showButton={showButton}
                    cardProduct={cardProductRef.current}
                />
            )}
        </>
    );
}

export default ProductItem;