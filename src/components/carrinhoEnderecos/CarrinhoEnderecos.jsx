import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { RegisterAddress } from "../../pages/RegisterAddress";
import { Modal } from "../Modal/Modal";

import { CarrinhoEndereco } from "./partials/CarrinhoEndereco";
import { CarrinhoEnderecoSelect } from "./partials/CarrinhoEnderecoSelect";

import './style.scss';

export function CarrinhoEnderecos() {
    const { user } = useContext(Context);
    const [paymentAddress, setPaymentAddress] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [showModalSelect, setShowModalSelect] = useState({open: false, type: 3});
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [newAddress, setNewAddress] = useState({});

    useEffect(() => {
        if (user) {
            setPaymentAddress(user?.person?.addresses?.find(address => [1,3].includes(address.address_type.id)));
            setDeliveryAddress(user?.person?.addresses?.find(address => [2,3].includes(address.address_type.id)));
        }
    }, [user]);

    function selectAddress() {
        if(showModalSelect.open){
            return (
                <CarrinhoEnderecoSelect 
                    setDeliveryAddress={setDeliveryAddress} 
                    setPaymentAddress={setPaymentAddress}
                    type={showModalSelect.type}
                    onClose={(params) => setShowModalSelect({ open: false })}
                    onSelect={(address) => {
                        if(showModalSelect.type === 1){
                            setPaymentAddress(address);
                        } else {
                            setDeliveryAddress(address);
                        }
                        setShowModalSelect({ open: false });
                    }}
                />
            )
        } else {
            return (
                <div className="d-block d-md-flex">
                    <div className="enderecos col-12 col-md-12">
                        <div className="enderecos-tipo title d-block d-md-flex">
                            <div className="col-12 col-md-6">
                                <h4>Endereços</h4>
                            </div>
                            <button 
                                className="enderecos-create col-12 col-md-6" 
                                onClick={(e) => setShowModalCreate(true)}
                            >Cadastrar</button>
                        </div>
                        <div className="enderecos-tipo d-block d-md-flex">
                            <h5 className="col-md-6">Cobrança</h5>
                            <button 
                                className="enderecos-select-tipo col-md-3" 
                                onClick={(e) => setShowModalSelect({ open: true, type: 2 })}
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
                                onClick={(e) => setShowModalSelect({ open: true, type: 1 })}
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
                </div>
            )
        }
    }

    return (
        <div className="carrinho-enderecos">
            {selectAddress()}
            <Modal isOpen={false} onClose={(e)=>{setShowModalCreate(false)}}>
                <div className="modal-endereco">
                    <RegisterAddress/>
                </div>
            </Modal>
        </div>
    );
}