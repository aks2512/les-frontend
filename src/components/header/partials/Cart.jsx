import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cartImg from '../../../assets/imgs/cart.svg';
import { Context } from '../../../contexts/AuthContext';

export function Cart() {
    const { authenticated, cart, cartLoadData  } = useContext(Context)
    
    function checkAuthentication() {
        if (authenticated) {
            return (
                <div className="content">
                    <p> Meu carrinho<br/><strong>
                        {cart?.items?.length || 0} itens
                    </strong></p>
                </div>
            )
        }
        

        return (
            <div className="content">
                <Link to="/signin">Faça login</Link>
            </div>
        )
    }

    useEffect(() => {
        if(authenticated) {
            cartLoadData();
        }
    }, [])

    return (
        <Link to="/carrinho" className="cart">
            {checkAuthentication()}
            <div className="image">
                <img src={cartImg} alt="cart access" />
            </div>
        </Link>
    );
}