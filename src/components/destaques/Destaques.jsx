import { Link } from 'react-router-dom';

import hfw from '../../assets/imgs/hfw.svg';

import './style.scss';

export function Destaques() {
    return (
        <section className="destaques container">

            <div className="col-md-12 col-lg-6 col-xl-4">
                <div className="destaque">
                    <p><span>Pré-Venda</span><br/><strong>Horizon Forbidden West</strong></p>
                    <img src={hfw} alt="" />
                    <Link to="/">Comprar</Link>
                </div>
            </div>

            <div className="col-md-12 col-lg-6 col-xl-4">
                <div className="destaque">
                    <p><span>Pré-Venda</span><br/><strong>Horizon Forbidden West</strong></p>
                    <img src={hfw} alt="" />
                    <Link to="/">Comprar</Link>
                </div>
            </div>
            
            <div className="col-md-12 col-lg-6 col-xl-4">
                <div className="destaque">
                    <p><span>Pré-Venda</span><br/><strong>Horizon Forbidden West</strong></p>
                    <img src={hfw} alt="" />
                    <Link to="/">Comprar</Link>
                </div>
            </div>

        </section>
    );
}