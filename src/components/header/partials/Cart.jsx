import { Link } from 'react-router-dom';
import cart from '../../../assets/imgs/cart.svg';

export function Cart() {
    return (
        <Link to="/" className="cart">
            <div className="content">
                <p> Meu carrinho<br/><strong>0 itens</strong>
                </p>
            </div>
            <div className="image">
                <img src={cart} alt="cart access" />
            </div>
        </Link>
    );
}