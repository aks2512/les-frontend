import { Children } from 'react';
import mastercard from '../../../assets/imgs/mastercard.svg';

export function Cartao({name, image, children, index}) {

    return (
        <label htmlFor={`card_checkbox${index}`} className="cartao" >
            {children}
            <div className="image">
                <img src={mastercard} alt="" />
            </div>
            <div className="content">
                <p>{name}</p>
            </div>
        </label>
    );
}