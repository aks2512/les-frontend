import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";

import { CarrinhoEndereco } from "./partials/CarrinhoEndereco";

import './style.scss';

export function CarrinhoEnderecos() {
    const { user } = useContext(Context);
    const [paymentAddress, setPaymentAddress] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();

    useEffect(() => {
        if (user) {
            setPaymentAddress(user?.person?.addresses?.find(address => [1,3].includes(address.address_type.id)));
            setDeliveryAddress(user?.person?.addresses?.find(address => [2,3].includes(address.address_type.id)));
        }
    }, [user]);

    return (
        <div className="carrinho-enderecos">
            <div className="d-block d-md-flex">
                <div className="enderecos col-12 col-md-6">
                    <h4>Endereços</h4>
                    <h5>Cobrança</h5>
                    { paymentAddress ? <CarrinhoEndereco
                        name={paymentAddress?.name}
                        place={paymentAddress?.place}
                        city={paymentAddress?.city}
                        state={paymentAddress?.state}
                        cep={paymentAddress?.cep}
                    /> : <p className="text-center">Nenhum endereço cadastrado</p> }
                    <h5>Entrega</h5>
                    { deliveryAddress ? <CarrinhoEndereco
                        type={deliveryAddress?.address_type}
                        name={deliveryAddress?.name}
                        place={deliveryAddress?.place}
                        city={deliveryAddress?.city}
                        state={deliveryAddress?.state}
                        cep={deliveryAddress?.cep}
                    /> : <p className="text-center">Nenhum endereço cadastrado</p> }
                </div>
                <div className="novo-endereco col-12 col-md-6">
                    <Link to="/register-address">Cadastrar novo endereco</Link>
                    <button className="select-address">Selecionar Endereço</button>
                </div>
            </div>
        </div>
    );
}