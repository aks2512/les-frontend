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
    const [showModal, setShowModal] = useState({open: false, type: 3});

    useEffect(() => {
        if (user) {
            setPaymentAddress(user?.person?.addresses?.find(address => [1,3].includes(address.address_type.id)));
            setDeliveryAddress(user?.person?.addresses?.find(address => [2,3].includes(address.address_type.id)));
        }
    }, [user]);

    function selectAddress() {
        if(showModal.open){
            return (
                <div className="d-block d-md-flex">
                    <div className="enderecos col-12 col-md-12">
                    <button className="select-endereco-fechar" onClick={(e) => setShowModal({ open: false })}>x</button>
                        <div className="select-address">
                            <h3>Cobrança</h3>
                            {user?.person?.addresses?.map(address => {
                                if([3,showModal.type].includes(address.address_type.id)){
                                    return (<CarrinhoEndereco
                                        name={address?.name}
                                        place={address?.place}
                                        city={address?.city}
                                        state={address?.state}
                                        cep={address?.cep}
                                    />)
                                }
                            })}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="d-block d-md-flex">
                    <div className="enderecos col-12 col-md-6">
                        <h4>Endereços</h4>
                        <div className="enderecos-tipo d-block d-md-flex">
                            <h5 className="col-md-6">Cobrança</h5>
                            <button 
                                className="enderecos-select-tipo col-md-6" 
                                onClick={(e) => setShowModal({ open: true, type: 1 })}
                            >Selecionar</button>
                        </div>
                        { paymentAddress ? <CarrinhoEndereco
                            name={paymentAddress?.name}
                            place={paymentAddress?.place}
                            city={paymentAddress?.city}
                            state={paymentAddress?.state}
                            cep={paymentAddress?.cep}
                        /> : <p className="text-center">Nenhum endereço cadastrado</p> }
                        <hr></hr>
                        <div className="enderecos-tipo d-block d-md-flex">
                            <h5 className="col-md-6">Entrega</h5>
                            <button 
                                className="enderecos-select-tipo col-md-6" 
                                onClick={(e) => setShowModal({ open: true, type: 2 })}
                            >Selecionar</button>
                        </div>
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
                        <Link to="/register-address">Informar Outro Endereço</Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="carrinho-enderecos">
            {selectAddress()}
        </div>
    );
}