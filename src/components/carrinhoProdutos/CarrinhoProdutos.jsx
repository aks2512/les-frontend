import { useContext } from "react";
import { Context } from "../../contexts/AuthContext";
import { CarrinhoProduto } from "./partials/CarrinhoProduto";

import './style.scss';

export function CarrinhoProdutos() {
    const { cart } = useContext(Context);

    return (
        <div className="carrinho-produtos">
            <div className="produtos">
                {
                    cart?.items?.length && cart.items.length > 0 ? cart.items.map(item => {
                        return (<CarrinhoProduto key={item.id} item={item}/>)
                    }) : (
                        <div className="sem-produtos">Sem Produtos</div>
                    )
                }
            </div>
            <div className="total">
                <p>Total</p>
                <p><strong>R$ {cart?.total_price}</strong></p>
            </div>
        </div>
    );
}