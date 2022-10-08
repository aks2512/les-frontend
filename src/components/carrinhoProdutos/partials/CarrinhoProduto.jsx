import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api';import { Context } from '../../../contexts/AuthContext';
;

export function CarrinhoProduto(itemPass) {
    const { cartLoadData } = useContext(Context);
    const [item, setItem] = useState({...itemPass.item});

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
            cartLoadData();
        } catch (e) {
            toast.error(e.response.data.message);
        }
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
        updateItem();
    }, [item]);

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
                        <button onClick={rmvAmount} className="remove">-</button>
                        <input 
                            type="text"
                            value={item?.quantity}
                            maxLength="2"
                            disabled={true}
                        />
                        <button onClick={addAmount} className="add">+</button>
                    </fieldset>
                </div>
                <div className="price"><p>R$ {item?.price}</p></div>
            </div>
        </div>
    );
}