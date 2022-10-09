import localizacao from '../../../assets/imgs/localizacao.svg';

export function CarrinhoEndereco({ name, place, city, state, cep, type }) {
    return (
        <div className="carrinho-endereco">
            <div className="image">
                <img src={localizacao} alt=""/>
            </div> 
            <div className="content">
                <p className="type">{type.name}</p>
                <p className="name">{name}</p>
                <p className="information1">{place}</p>
                <p className="information2">{city}, {state} - CEP {cep}</p>
            </div>
        </div>
    );
}