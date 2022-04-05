import { Link } from "react-router-dom";

import { Cartao } from "./partials/Cartao";

import cartao from '../../assets/imgs/cartao.svg';
import cupom from '../../assets/imgs/cupom.svg';
import cadeado from '../../assets/imgs/cadeado.svg';

import './style.scss';

export function Pagamento() {
    return (
        <div className="pagamento">
            <p>Selecione um cartão</p>

            <div className="cartoes">
                <Cartao/>
                <Cartao/>
                <Cartao/>
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