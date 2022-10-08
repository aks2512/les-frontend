import { Link } from "react-router-dom";

import { Cartao } from "./partials/Cartao";

import cartao from '../../assets/imgs/cartao.svg';
import cupom from '../../assets/imgs/cupom.svg';
import cadeado from '../../assets/imgs/cadeado.svg';

import './style.scss';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/AuthContext";

export function Pagamento() {
    const { user } = useContext(Context);
    const [cards, setCards] = useState();

    useEffect(() => {
        if (user) {
            setCards(user.cards);
        }
        console.log(cards);
    }, [user]);

    return (
        <div className="pagamento">
            <p>Selecione um cartão</p>

            <div className="cartoes">
                {cards && cards.map((card, index) => (
                    <Cartao
                        name={card.number}
                        image=""
                    />
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

            <div className="d-flex justify-content-center">
                <button className="btn-finalizar">Finalizar compra</button>
            </div>

            <div className="protegido">
                <img src={cadeado} alt="" />
                <p>Ambiente 100% seguro</p>
            </div>
        </div>
    );
}