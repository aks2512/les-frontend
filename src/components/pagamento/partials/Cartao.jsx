import mastercard from '../../../assets/imgs/mastercard.svg';

export function Cartao() {

    return (
        <div className="cartao" >
            <div className="image">
                <img src={mastercard} alt="" />
            </div>
            <div className="content">
                <p>Nubank **** 0000</p>
            </div>
        </div>
    );
}