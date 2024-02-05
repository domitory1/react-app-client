import React from 'react';
import Button from './../button/button.jsx';
import './popup.css';

const Popup = ({ product , onClose}) => {

    document.body.classList.add('popup-open');

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup">
                <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt='' /></picture>
                <h3>
                    {product["Название"]}
                </h3>
                <p>
                    {product["Описание"]}
                </p>
            </div>
            <Button price={product["Стоимость"]}/>
        </div>
    );
}

export default Popup;