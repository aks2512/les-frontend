import { Children } from 'react';
import mastercard from '../../../assets/imgs/mastercard.svg';

export function Cartao({name, image, children}) {

    return (
        <div className="cartao" >
            {children}
            <div className="image">
                <img src={mastercard} alt="" />
            </div>
            <div className="content">
                <p>{name}</p>
            </div>
        </div>
    );
}