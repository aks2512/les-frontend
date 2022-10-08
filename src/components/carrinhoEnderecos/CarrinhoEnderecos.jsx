import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";

import { CarrinhoEndereco } from "./partials/CarrinhoEndereco";

import './style.scss';

export function CarrinhoEnderecos() {
    const { user } = useContext(Context);
    return (
        <div className="carrinho-enderecos">
            <div className="d-block d-md-flex">
                <div className="enderecos col-12 col-md-6">
                    <h4>Endereços</h4>
                    {
                        user?.person?.addresses?.map(address => (
                            <CarrinhoEndereco
                                name={address.name}
                                place={address.place}
                                city={address.city}
                                state={address.state}
                                cep={address.cep}
                            />
                        ))
                    }
                </div>
                <div className="novo-endereco col-12 col-md-6">
                    <Link to="/register-address">Cadastrar novo endereco</Link>
                </div>
            </div>
        </div>
    );
}