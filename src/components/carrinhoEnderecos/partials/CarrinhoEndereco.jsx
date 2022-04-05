import localizacao from '../../../assets/imgs/localizacao.svg';

export function CarrinhoEndereco() {
    return (
        <div className="carrinho-endereco">
            <div className="image">
                <img src={localizacao} />
            </div>
            <div className="content">
                <p className="name">Casa 1</p>
                <p className="information1">Rua xxxxxxxxxxxxxxxxxxx xx</p>
                <p className="information2">Mogi das Cruzes, São Paulo - CEP 08795120</p>
            </div>
        </div>
    );
}