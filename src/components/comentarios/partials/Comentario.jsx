import star from '../../../assets/imgs/star.svg';
import yoshi from '../../../assets/imgs/yoshi.svg';

export function Comentario() {
    return (
        <div className="comentario">
            <div className="image">
                <img src={yoshi} alt="" />
            </div>
            <div className="content">
                <span><strong>Jefferson Akira Fukamizu</strong></span>

                <ul className="stars">
                    <li className="star"><img src={star} /></li>
                    <li className="star"><img src={star} /></li>
                    <li className="star"><img src={star} /></li>
                    <li className="star"><img src={star} /></li>
                    <li className="star"><img src={star} /></li>
                </ul>

                <span>O meu está dando arquivo corrompido quando cheguei quase no final do jogo. Quero saber como faço pra trocar. Está na garantia.</span>
            </div>
        </div>
    );
}