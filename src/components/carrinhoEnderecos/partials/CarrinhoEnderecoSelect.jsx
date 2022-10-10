import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../contexts/AuthContext";

import { CarrinhoEndereco } from "../partials/CarrinhoEndereco";

import '../style.scss';

export function CarrinhoEnderecoSelect({ onClose, onSelect, type }) {
    const { user } = useContext(Context);

    return (
        <div className="carrinho-enderecos">
             <div className="select-endereco d-block d-md-flex">
                    <div className="enderecos col-12 col-md-12">
                    <button className="select-endereco-fechar" onClick={onClose}>x</button>
                        <div className="select-address">
                            <h3>{type === 1 ? 'Cobrança' : 'Entrega'}</h3>
                            {user?.person?.addresses?.map(address => {
                                if([3,type].includes(address.address_type.id)){
                                        return (
                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-8">
                                                <CarrinhoEndereco
                                                    name={address?.name}
                                                    place={address?.place}
                                                    city={address?.city}
                                                    state={address?.state}
                                                    cep={address?.cep}
                                                />
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <button 
                                                    className="enderecos-select-tipo" 
                                                    onClick={(e) => onSelect(address)}
                                                > Selecionar </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
        </div>
    );
}