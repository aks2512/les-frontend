import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api';;

export function CarrinhoProduto(itemPass) {
    const [item, setItem] = useState({});

    function addAmount() {
        if (item.quantity < 100) setItem({
            ...item, 
            quantity: item.quantity + 1
        }, updateItem());
    }

    function rmvAmount() {
        if (item.quantity > 1) setItem({
            ...item, 
            quantity: item.quantity - 1
        }, updateItem());
    }
    
    async function updateItem() {
        try {
            console.log(item);
            const response = await api.put(`/cart-items/${item.id}`, item);
            toast.success(response.data.message);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        setItem(itemPass.item);
    }, []);

    return (
        <div className="carrinho-produto">
            <button className="remove-produto">x</button>
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