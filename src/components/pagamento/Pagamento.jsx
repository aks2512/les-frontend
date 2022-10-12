import { Link } from "react-router-dom";

import { Cartao } from "./partials/Cartao";

import cartao from '../../assets/imgs/cartao.svg';
import cupom from '../../assets/imgs/cupom.svg';
import cadeado from '../../assets/imgs/cadeado.svg';

import './style.scss';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/AuthContext";

export function Pagamento({ cards, setCards }) {
    const { user } = useContext(Context);

    useEffect(() => {
        if (user) {
            setCards(user.person?.cards);
        }
    }, [user]);

    return (
        <div className="pagamento">
            <p>Selecione pelo menos um cartão</p>

            <div className="cartoes">
                {cards && cards.map((card, index) => (
                    <div className={`card-selector ${card.active ? 'active-card' : ''}`}>
                        <Cartao
                            name={card.number}
                            image=""
                        >
                        <input className="checkbox-card" type='checkbox' value={card.active} onChange={(e) => {
                            const cardExists = cards.findIndex(c => c.id == card.id)
                            const newCards = cards.slice();

                            newCards[cardExists].active = e.target.checked
                            setCards(newCards)
                        }} />
                        </Cartao>
                    </div>
                ))}
            </div>

            <div className="novo-cartao">
                <img src={cartao} alt="" />
                <Link to='/register-card'>Novo cartão de crédito</Link>
            </div>

            <div className="cupom">
                <img src={cupom} alt="" />
                <input type="text" placeholder="Cupom de Desconto ou Troca" />
            </div>
            <div className="protegido">
                <img src={cadeado} alt="" />
                <p>Ambiente 100% seguro</p>
            </div>
        </div>
    );
}