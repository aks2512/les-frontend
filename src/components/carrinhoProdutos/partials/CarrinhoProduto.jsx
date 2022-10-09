import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api';import { Context } from '../../../contexts/AuthContext';
;

export function CarrinhoProduto({ item: itemPass}) {
    const { cart, cartLoadData } = useContext(Context);
    const [item, setItem] = useState({...itemPass});
    const [loading, setLoading] = useState(true);

    function addAmount() {
        if (item.quantity < 100) setItem({
            ...item, 
            quantity: item.quantity + 1
        });
    }

    function rmvAmount() {
        if (item.quantity > 1) setItem({
            ...item, 
            quantity: item.quantity - 1
        });
    }
    
    async function updateItem() {
        try {
            const response = await api.put(`/cart-items/${item.id}`, item);
            toast.success(response.data.message);
        } catch (e) {
            toast.error(e.response.data.message);
        }
        cartLoadData();
    }

    async function deleteItem() {
        try {
            const response = await api.delete(`/cart-items/${item.id}`);
            toast.success(response.data.message);
            cartLoadData();
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        const quantity = item.quantity;
        setItem({...itemPass, quantity});
    }, [cart]);

    useEffect(() => {    
        const tmt = setTimeout(() => {
            if(!loading){
                setLoading(true);
                updateItem();
            }

            setLoading(false);
        }, 1000);

        return () => clearTimeout(tmt);
    }, [item.quantity]);

    return (
        <div className="carrinho-produto">
            <button className="remove-produto" onClick={(e) => deleteItem()}>x</button>
            <div className="body">
                <div className="image">
                    <img src={'http://localhost:3333/files/' + (item?.product?.image || 'default.png')} alt="" />
                </div>
                <div className="content">
                    <div className="title">{item?.product?.name}</div>
                    <fieldset className="amount">
                        <button onClick={rmvAmount} className="remove" disabled={loading}>-</button>
                        <input 
                            type="text"
                            value={item?.quantity}
                            onChange={(e) => setItem({...item, quantity: e.target.value})}
                            maxLength="2"
                            disabled={loading}
                        />
                        <button onClick={(e)=>{addAmount()}} className="add" disabled={loading}>+</button>
                    </fieldset>
                </div>
                <div className="price"><p>R$ {item?.price}</p></div>
            </div>
        </div>
    );
}