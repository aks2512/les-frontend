import { useState } from 'react';
import produto from '../../../assets/imgs/lego.svg';

export function CarrinhoProduto() {
    const [amount, setAmount] = useState('1');

    function addAmount() {
        if (amount !== '99') setAmount((parseInt(amount) + 1).toString());
    }

    function rmvAmount() {
        if (amount !== '1') setAmount((parseInt(amount) - 1).toString());
    }

    return (
        <div className="carrinho-produto">
            <button className="remove-produto">x</button>
            <div className="body">
                <div className="image">
                    <img src={produto} />
                </div>
                <div className="content">
                    <div className="title">Jogo Uma  Aventura Movie  Lego 2 </div>
                    <fieldset className="amount">
                        <button onClick={rmvAmount} className="remove">-</button>
                        <input 
                            type="text"
                            value={amount}
                            maxLength="2"
                            disabled={true}
                        />
                        <button onClick={addAmount} className="add">+</button>
                    </fieldset>
                </div>
                <div className="price"><p>R$ 49,90</p></div>
            </div>
        </div>
    );
}