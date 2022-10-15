import { Link } from "react-router-dom";

import { Cartao } from "./partials/Cartao";

import cartao from '../../assets/imgs/cartao.svg';
import cupom from '../../assets/imgs/cupom.svg';
import cadeado from '../../assets/imgs/cadeado.svg';

import './style.scss';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/AuthContext";

export function Pagamento({ cards, setCards, coupons, setCoupons }) {
    const { user } = useContext(Context);

    useEffect(() => {
        if (user) {
            setCards(user.person?.cards);
            setCoupons(user.person?.coupons);
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
                        <input className="checkbox-card" type='checkbox' checked={card.active} onChange={(e) => {
                            const newCards = cards.slice();
                            newCards[index].active = e.target.checked
                            setCards(newCards)
                        }} />
                        </Cartao>
                        {
                            card.active && (
                                <div className="payment-quantity">
                                    Valor:
                                    <input 
                                        type="number" 
                                        value={card.value} 
                                        onChange={(e)=>{ 
                                            const newCards = cards.slice();
                                            newCards[index].value = e.target.value
                                            setCards(newCards)
                                        }} 
                                        placeholder="0,00" 
                                    />
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>

            <div className="novo-cartao">
                <img src={cartao} alt="" />
                <Link to='/register-card'>Novo cartão de crédito</Link>
            </div>

            <div className="cupons">

                {
                    coupons.length > 0 ? coupons.map((coupon, index) => (
                        <div className="cupom">                
                            <img src={cupom} alt="" />
                            <div className={`coupon-selector ${coupon.active ? 'active-coupon' : ''}`}>
                                <input className="checkbox-coupon" type='checkbox' checked={coupon.active} onChange={(e) => {
                                    const newCoupons = coupons.slice();
                                    newCoupons[index].active = e.target.checked
                                    setCoupons(newCoupons)
                                }
                                } />
                                <p>{coupon.code.replace(/.+?(?=-)/g,'')}</p>
                        </div>
                        </div>
                    )) : <p>Nenhum cupom cadastrado</p>
                }
            </div>
            <div className="protegido">
                <img src={cadeado} alt="" />
                <p>Ambiente 100% seguro</p>
            </div>
        </div>
    );
}