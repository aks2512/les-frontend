import { useContext } from "react";
import { Context } from "../../contexts/AuthContext";
import { CarrinhoProduto } from "./partials/CarrinhoProduto";

import './style.scss';

export function CarrinhoProdutos({ totalPaid }) {
    const { cart } = useContext(Context);
    const cardCupomTotal = totalPaid.card + totalPaid.coupon;

    return (
        <div className="carrinho-produtos">
            <div className="produtos">
                {
                    cart?.items?.length && cart.items.length > 0 ? cart.items.map(item => {
                        return (<CarrinhoProduto key={item.id} item={item} />)
                    }) : (
                        <div className="sem-produtos">Sem Produtos</div>
                    )
                }
            </div>
            <div className="row">
                <div className="col-md-12 row">
                    <div className="col-md-6">
                        <p>Total</p>
                        <p>
                            <strong>R$ {cart?.total_price || 0}</strong>
                        </p>
                    </div>

                    {totalPaid.discount > 0 && (
                        <div className="col-md-6">
                            <p>Desconto</p>
                            <p>
                                <strong>R$ {Math.floor(cart?.total_price * (totalPaid.discount / 100))} / {totalPaid.discount}%</strong>
                            </p>
                        </div>
                    )}
                </div>
                <div className="col-md-12">
                    <p>A pagar</p>
                    <p className={cart?.total_price - cardCupomTotal > 0 ? 'alert' : 'success'}>
                        R$ {Math.floor(cart?.total_price * (1 - totalPaid.discount / 100) || 0) - cardCupomTotal}
                    </p>
                </div>
            </div>
        </div>
    );
}