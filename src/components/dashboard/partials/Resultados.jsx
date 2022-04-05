import bag from '../../../assets/imgs/shopping-bag.svg';

export function Resultado() {
    return (
        <div className="resultado-mensal">
            <div className="row justify-content-around">
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Numero de Compras</p>
                    <p><strong>R$ 20000</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Numero de Compras</p>
                    <p><strong>R$ 20000</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Numero de Compras</p>
                    <p><strong>R$ 20000</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Numero de Compras</p>
                    <p><strong>R$ 20000</strong></p>
                </div>
            </div>
        </div>
    );
}