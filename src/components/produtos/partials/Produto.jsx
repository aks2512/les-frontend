import { Link } from 'react-router-dom';

import star from '../../../assets/imgs/star.svg';
import starFull from '../../../assets/imgs/star_full.svg';

export function Produto({name, price, id, imageURL}) {
    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="produto">
                <div className="image">
                    <img src={imageURL} width={250} height={250} alt="" />
                </div>
                <div className="content">
                    <p>{name}</p>
                    <ul className="stars">
                        <li className="star"><img src={star} alt="" /></li>
                        <li className="star"><img src={star} alt="" /></li>
                        <li className="star"><img src={star} alt="" /></li>
                        <li className="star"><img src={star} alt="" /></li>
                        <li className="star"><img src={starFull} alt="" /></li>
                    </ul>
                    <h4>R$ {price}</h4>
                    <Link className="buy" to={`/produto-detalhes?id=${id}`}>Detalhes</Link>
                </div>
            </div>
        </div>
    );
}