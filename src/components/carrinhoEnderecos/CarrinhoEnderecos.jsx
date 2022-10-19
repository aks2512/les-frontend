import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { Context } from "../../contexts/AuthContext";
import { RegisterAddress } from "../../pages/RegisterAddress";
import { AddressForm } from "../addressForm/AddressForm";
import { Modal } from "../modal/Modal";
import { Titulo } from "../titulo/Titulo";

import { CarrinhoEndereco } from "./partials/CarrinhoEndereco";
import { CarrinhoEnderecoSelect } from "./partials/CarrinhoEnderecoSelect";
import { CarrinhoEnderecoTipo } from "./partials/CarrinhoEnderecoTipo";

import './style.scss';

export function CarrinhoEnderecos({ 
    paymentAddress,
    deliveryAddress,
    setPaymentAddress,
    setDeliveryAddress,
 }) {
    const { user } = useContext(Context);
    const [showModalSelect, setShowModalSelect] = useState({open: false, type: 3});
    const [showModalCreate, setShowModalCreate] = useState({open: false, type: 1, edit: false});
    const [createAddress, setCreateAddress] = useState(false);

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
                        if(showModalSelect.type == 1){
                            setDeliveryAddress(address);
                        }
                        
                        if(showModalSelect.type == 2){
                            setPaymentAddress(address);
                        } 

                        setShowModalSelect({ open: false });
                    }}
                />
            )
        }
    }

    return (
        <div className="carrinho-enderecos">
            {selectAddress()}
            <div className="d-block d-md-flex">
                <div className="enderecos col-12 col-md-12">
                    <div className="enderecos-tipo title d-block d-md-flex">
                        <div className="col-12 col-md-6">
                            <h4>Endereços</h4>
                        </div>
                    </div>
                    <CarrinhoEnderecoTipo
                        type_name="Cobrança"
                        register_func={(e) => { setShowModalCreate({open: true, type: 1}) }}
                        select_func={(e) => { setShowModalSelect({open: true, type: 1}) }}     
                    />
                    { paymentAddress ? <CarrinhoEndereco
                        name={paymentAddress?.name}
                        place={paymentAddress?.place}
                        city={paymentAddress?.city}
                        state={paymentAddress?.state}
                        cep={paymentAddress?.cep}
                    /> : <p className="text-center">Nenhum endereço cadastrado</p> }
                    <hr></hr>
                    <CarrinhoEnderecoTipo
                        type_name="Entrega"
                        register_func={(e) => { setShowModalCreate({open: true, type: 2}) }}
                        select_func={(e) => { setShowModalSelect({open: true, type: 2}) }}     
                    />
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
            <Modal onClose={()=>{setShowModalCreate({...showModalCreate, open: false})}} isOpen={showModalCreate.open}>
                <AddressForm onSubmit={async (e,{...params}) => {
                    e.preventDefault();
                    if([1, 3].includes(Number(params.address_type_id))){
                        setDeliveryAddress({...params, save: createAddress.save})
                    } 
                    
                    if([2, 3].includes(Number(params.address_type_id))){
                        setPaymentAddress({...params, save: createAddress.save})
                    }

                    if(createAddress){
                        try{
                            const response = await api.post(`addresses`, {
                                ...params
                            })
                            toast.message(response.data.message);
                        } catch(err) {
                            toast.error(err.response.data.message || 'Falha ao cadastrar endereço')
                            return;
                        }
                    }
                    
                    setCreateAddress(false)
                    setShowModalCreate(false)
                }}>
                    <div className="cadastrar-endereco custom-form mb-4">
                        <Titulo title={'Deseja Salvar o Endereço na Sua Conta?'} />
                        <button 
                            className={createAddress ? 'button-true' : 'button-false'} 
                            onClick={
                                (e) => {
                                    e.preventDefault()
                                    setCreateAddress(!createAddress)
                                }
                            }
                        >
                            {createAddress ? 'Sim' : 'Não'}
                        </button>
                    </div>
                </AddressForm>
            </Modal>  
        </div>
    );
}