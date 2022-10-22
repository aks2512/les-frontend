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
    const [userVerify, setUserVerify] = useState(false);

    useEffect(() => {
        if (user && userVerify === false) {
            setCards(user?.person?.cards);
            setCoupons(user?.person?.coupons);
            setUserVerify(true);
        }
    }, [user, userVerify, setCards, setCoupons, setUserVerify]);

    return (
        <div className="pagamento">
            <p>
                Selecione pelo menos um
            </p>
            <p><strong>Cartões</strong></p>
            <Link to="#" onClick={(e) => e.target.nextSibling.classList.add('active')}>Selecionar um cartão</Link>
            <div className="cartoes">
                <div className="cartoes-container">
                    <div className="close" onClick={(e) => e.target.parentNode.parentNode.classList.remove('active')}>X</div>
                    {cards?.length > 0 ? cards.map((card, index) => (
                        <div key={`card_${index}`} className={`card-selector ${card.active ? 'active-card' : ''}`}>
                            <Cartao
                                index={index}
                                name={card.number}
                                image=""
                            >
                                <input id={`card_checkbox${index}`} className="checkbox-card" type='checkbox' checked={card.active} onChange={(e) => {
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
                                            onChange={(e) => {
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
                    )) : <div>Nenhum cartão cadastrado</div>}
                </div>
            </div>
            <div className="novo-cartao">
                <img src={cartao} alt="" />
                <Link to='/register-card'>Novo cartão de crédito</Link>
            </div>
            <strong>Cupons</strong>
            <div className="cupons table-container">
                <table className="odd">
                    {
                        coupons.length > 0 ? (
                            <tbody>
                                {
                                    user?.person?.coupons?.map((coupon, index) => (
                                        <tr key={coupon.id}>
                                            <td><img src={cupom} alt="" /></td>
                                            <td>{coupon.code.replace(/.+?(?=)-/g, '')}</td>
                                            <td>R$ {coupon.value}</td>
                                            <td>
                                                <input className="checkbox-coupon" type='checkbox' checked={coupon.active} onChange={(e) => {
                                                    const newCoupons = coupons.slice();
                                                    newCoupons[index].active = e.target.checked
                                                    setCoupons(newCoupons)
                                                }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        ) : <tbody>
                            <tr>
                                <td>Nenhum cupom cadastrado</td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="protegido">
                <img src={cadeado} alt="" />
                <p>Ambiente 100% seguro</p>
            </div>
        </div>
    );
}