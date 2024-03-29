import bag from '../../../assets/imgs/shopping-bag.svg';

export function Resultado({ data }) {
    return (
        <div className="resultado-mensal">
            <div className="row justify-content-around">
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Lucro Bruto</p>
                    <p><strong>R$ {data?.monthly_sales}</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Quantidade de Itens Vendidos</p>
                    <p><strong>{data?.monthly_quantity} Un.</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Cupons de troca Gerados</p>
                    <p><strong>R$ {data?.monthly_coupomgen}</strong></p>
                </div>
                <div className="col-12 col-md-5 box">
                    <img src={bag} alt="" />
                    <p>Lucro - Cupons de Troca</p>
                    <p><strong>R$ {data?.monthly_sales - data?.monthly_coupomgen}</strong></p>
                </div>
            </div>
        </div>
    );
}