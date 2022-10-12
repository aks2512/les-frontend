import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Titulo } from '../titulo/Titulo';
import { CustomForm } from '../customForm/CustomForm';
import localizacao from '../../assets/imgs/localizacao.svg';
export function AddressForm({ onSubmit, children, addressPass }) {
    const navigate = useNavigate();
    //endereço
    const [address, setAddress] = useState(addressPass || {})

    //opções
    const [placeTypes, setPlaceTypes] = useState([]);
    const [addressTypes, setAddressTypes] = useState([]);

    
    async function getPlaceTypes() {
        const response = await api.get('/places-types');
        setPlaceTypes(response.data);
    }

    async function getAddressTypes() {
        const response = await api.get('/addresses-types');
        setAddressTypes(response.data);
    }

    async function createAddress(e) {
        e.preventDefault();

        try {
            const response = await api.post('/addresses', {
                ...address
            });
    
            if (response.status === 201) {
                toast.success('Endereço cadastrado com sucesso!');
                navigate(-1);
            }
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    }
    
    useEffect(() => {
        getPlaceTypes();
        getAddressTypes();

        if(!addressPass){
            setAddress({ 
                address_type_id: 1,
                place_type_id: 1
            });
        }
    }, []);

    return (
        <>
                <CustomForm onSubmit={onSubmit ? (e) => {
                            onSubmit(e, {
                                ...address
                            }) 
                        }: (e) => {
                            createAddress(e)
                        }}
                    >
                        <h3>Registrar endereço</h3>
                        <div className="group">
                            <div className="title">
                                <img src={localizacao} alt="" />
                                <h4>Endereço</h4>
                            </div>
                            <div className="row">

                                <fieldset className="p100">
                                    <label htmlFor="nome">Nome</label>
                                    <input 
                                        id="nome" 
                                        type="text"
                                        value={address.name}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            name: e.target.value
                                        })} 
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="cep">CEP</label>
                                    <input 
                                        id="cep" 
                                        type="text" 
                                        value={address.cep}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            cep: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="logradouro">Logradouro</label>
                                    <input 
                                        id="logradouro" 
                                        type="text"
                                        value={address.place}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            place: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="numero">Número</label>
                                    <input 
                                        id="numero" 
                                        type="text" 
                                        value={address.number}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            number: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="complemento">Complemento</label>
                                    <input 
                                        id="complemento" 
                                        type="text" 
                                        value={address.complement}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            complement: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="bairro">Bairro</label>
                                    <input 
                                        id="bairro" 
                                        type="text" 
                                        value={address.neighborhood}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            neighborhood: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="tipo_de_endereco">Tipo de endereço</label>
                                    <select 
                                        id="tipo_de_endereco" 
                                        value={address.address_type_id}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            address_type_id: Number(e.target.value) 
                                        })}
                                    >
                                        {addressTypes.map((addressType)=>{
                                            return (
                                                <option value={addressType.id}>{addressType.name}</option>
                                            )
                                        })}
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="tipo_de_logradouro">Tipo de Logradouro</label>
                                    <select 
                                        id="tipo_de_logradouro" 
                                        type="text" 
                                        value={address.place_type_id}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            place_type_id: Number(e.target.value) 
                                        })}
                                    >
                                       {placeTypes.map((placeType)=>{
                                            return (
                                                <option value={placeType.id}>{placeType.name}</option>
                                            )
                                        })}
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input 
                                        id="cidade" 
                                        type="text"
                                        value={address.city}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            city: e.target.value 
                                        })} 
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="estado">Estado</label>
                                    <input 
                                        id="estado" 
                                        type="text" 
                                        value={address.state}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            state: e.target.value 
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="pais">País</label>
                                    <input 
                                        id="pais" 
                                        type="text" 
                                        value={address.country}
                                        onChange={(e) => setAddress({ 
                                            ...address, 
                                            country: e.target.value 
                                        })}
                                    />
                                </fieldset>

                            </div>
                        </div>

                        {children}

                        <button>Cadastrar</button>


                    </CustomForm>
        </>
    );
}