import { Link } from "react-router-dom";

import { CarrinhoEndereco } from "./partials/CarrinhoEndereco";

import './style.scss';

export function CarrinhoEnderecos() {
    return (
        <div className="carrinho-enderecos">
            <div className="d-block d-md-flex">
                <div className="enderecos col-12 col-md-6">
                    <CarrinhoEndereco/>
                    <CarrinhoEndereco/>
                    <CarrinhoEndereco/>
                    <CarrinhoEndereco/>
                </div>
                <div className="novo-endereco col-12 col-md-6">
                    <Link to="/register-address">Cadastrar novo endereco</Link>
                </div>
            </div>
        </div>
    );
}