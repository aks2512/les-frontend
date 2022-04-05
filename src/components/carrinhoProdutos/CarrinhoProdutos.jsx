import { CarrinhoProduto } from "./partials/CarrinhoProduto";

import './style.scss';

export function CarrinhoProdutos() {
    return (
        <div className="carrinho-produtos">
            <div className="produtos">
                <CarrinhoProduto/>
                <CarrinhoProduto/>
                <CarrinhoProduto/>
                <CarrinhoProduto/>
            </div>
            <div className="total">
                <p>Total</p>
                <p><strong>R$ 99,00</strong></p>
            </div>
        </div>
    );
}