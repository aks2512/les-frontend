import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { CarrinhoProduto } from "./partials/CarrinhoProduto";

import './style.scss';

export function CarrinhoProdutos() {
    const [cart, setCart] = useState([]);

    async function getCart() {
        try {
            const response = await api.get('/carts', {
                isOpen: true
            });
            setCart(response.data[0]);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getCart()
    }, [cart]);

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
                <p><strong>R$ {cart.total_price}</strong></p>
            </div>
        </div>
    );
}