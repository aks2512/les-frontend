import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { Context } from "../../contexts/AuthContext";
import { CarrinhoEnderecos } from "../carrinhoEnderecos/CarrinhoEnderecos";
import { CarrinhoProdutos } from "../carrinhoProdutos/CarrinhoProdutos";
import { Pagamento } from "../pagamento/Pagamento";
import { WhiteBox } from "../whiteBox/WhiteBox";

import './style.scss'

export function CartBody() {
    const navigate = useNavigate();
    const { cart, cartLoadData, setCart, userLoadData } = useContext(Context);
    const [cards, setCards] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [paymentAddress, setPaymentAddress] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [totalPaid, setTotalPaid] = useState({ coupon: 0, card: 0 });

    function handleSetCards(cards){
        const total = cards.reduce((total, card) => {
            if(card.active){
                return total + (card.value || 0);
            }

            return total;
        }, 0);

        setTotalPaid({ ...totalPaid, card: Number(total) });
        setCards(cards);
    }

    function handleSetCoupons(coupons){
        const total = coupons.reduce((total, coupon) => {
            if(coupon.active){
                return total + (coupon.value || 0);
            }

            return total;
        }, 0);
        
        setTotalPaid({ ...totalPaid, coupon: Number(total) });
        setCoupons(coupons);
    }
    async function onSubmit(){
        try{
            const activeCards = cards.filter(c => c.active)
            const activeCoupons = coupons.filter(c => c.active)
            const response = await api.post('/purchases', {
                cart_id: cart.id,
                payment_address: paymentAddress,
                delivery_address: deliveryAddress,
                cards: activeCards,
                coupons: activeCoupons,
            })

            toast(response.data.message);

            const newCart = await api.post('/carts')
            setCart(newCart);
            userLoadData();
            
            navigate('/meus-pedidos')
        } catch(err){
            toast.error(err.response.data.message || 'Falha ao finalizar compra');
        }
    }

    return (
        <>
            <WhiteBox>
                <h3>Carrinho</h3>
                <div className="d-flex flex-wrap">
                    <div className="col-12 col-xl-8 mb-2">
                        <CarrinhoProdutos totalPaid={totalPaid}/>
                        <CarrinhoEnderecos
                            deliveryAddress={deliveryAddress}
                            paymentAddress={paymentAddress}
                            setDeliveryAddress={setDeliveryAddress}
                            setPaymentAddress={setPaymentAddress}
                        />
                    </div>
                    <div className="col-12 col-xl-4 mb-2">
                        <Pagamento 
                            cards={cards} 
                            setCards={handleSetCards} 
                            coupons={coupons} 
                            setCoupons={handleSetCoupons} 
                            onSubmit={onSubmit}
                        />
                        <div className="d-flex justify-content-center create-purchase">
                            <button className="btn-finalizar" onClick={(e) => {onSubmit(e)}}>Finalizar compra</button>
                        </div>
                    </div>
                </div>
            </WhiteBox>
        </>
    );
}