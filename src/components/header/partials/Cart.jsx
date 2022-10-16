import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cartImg from '../../../assets/imgs/cart.svg';
import { Context } from '../../../contexts/AuthContext';

export function Cart() {
    const { authenticated, user, cart, cartLoadData } = useContext(Context)

    function checkAuthentication() {
        if (authenticated) {
            if (user?.person) {
                return (
                    <div className="content">
                        <p> Meu carrinho<br /><strong>
                            {cart?.items?.length || 0} itens
                        </strong></p>
                    </div>
                )
            } else {
                return (
                    <div className="content">
                        <Link to="/signin">Não autorizado</Link>
                    </div>
                )
            }
        }


        return (
            <div className="content">
                <Link to="/signin">Faça login</Link>
            </div>
        )
    }

    useEffect(() => {
        if (authenticated && user?.person) {
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