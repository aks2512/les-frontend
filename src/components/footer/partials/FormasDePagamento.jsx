import mastercard from '../../../assets/imgs/mastercard.svg'
import visa from '../../../assets/imgs/visa.svg'

export function FormasDePagamento() {
    return (
        <div className="formas-de-pagamento">
            <span>Pague com</span>
            <ul>
                <li><img src={mastercard} /></li>
                <li><img src={visa} /></li> 
            </ul>
        </div>
    );
}