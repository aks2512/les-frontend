import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../../assets/imgs/cart.svg';
import { Context } from '../../../contexts/AuthContext';

export function Cart() {
    const { authenticated } = useContext(Context)
    
    function checkAuthentication() {
        if (authenticated) {
            return (
                <div className="content">
                    <p> Meu carrinho<br/><strong>0 itens</strong>
                    </p>
                </div>
            )
        }

        return (
            <div className="content">
                <Link to="/signin">Faça login</Link>
            </div>
        )
    }

    return (
        <Link to="/carrinho" className="cart">
            {checkAuthentication()}
            <div className="image">
                <img src={cart} alt="cart access" />
            </div>
        </Link>
    );
}