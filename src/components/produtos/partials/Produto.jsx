import { Link } from 'react-router-dom';

import lego from '../../../assets/imgs/lego.svg';
import star from '../../../assets/imgs/star.svg';
// import starFull from '../../assets/imgs/star_full.svg';

export function Produto() {
    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="produto">
                <div className="image">
                    <img src={lego} />
                </div>
                <div className="content">
                    <p>Jogo Uma Aventura LEGO 2 Videogame - PS4</p>
                    <ul className="stars">
                        <li className="star"><img src={star} /></li>
                        <li className="star"><img src={star} /></li>
                        <li className="star"><img src={star} /></li>
                        <li className="star"><img src={star} /></li>
                        <li className="star"><img src={star} /></li>
                    </ul>
                    <h4>R$ 59,89</h4>
                    <Link className="buy" to="/produto-detalhes">Comprar</Link>
                </div>
            </div>
        </div>
    );
}