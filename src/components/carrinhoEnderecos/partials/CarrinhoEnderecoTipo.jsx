export function CarrinhoEnderecoTipo({type_name, register_func,  select_func}) {
    return (
        <div className="enderecos-tipo d-block d-md-flex">
            <h5 className="col-md-6">{type_name}</h5>
            <button 
                className="enderecos-create col-md-3" 
                onClick={register_func}
            >Cadastrar</button>
            <button 
                className="enderecos-select-tipo col-md-3" 
                onClick={select_func}
            >Selecionar</button>
        </div>
    )
}