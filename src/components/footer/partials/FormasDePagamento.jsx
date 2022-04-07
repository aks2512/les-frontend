import mastercard from '../../../assets/imgs/mastercard.svg'
import visa from '../../../assets/imgs/visa.svg'

export function FormasDePagamento() {
    return (
        <div className="formas-de-pagamento">
            <span>Pague com</span>
            <ul>
                <li><img src={mastercard} alt="" /></li>
                <li><img src={visa} alt="" /></li> 
            </ul>
        </div>
    );
}