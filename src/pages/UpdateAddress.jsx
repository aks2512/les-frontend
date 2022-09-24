import {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import localizacao from '../assets/imgs/localizacao.svg';

export function UpdateAddress() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    //types
    const [typesOfAddress, setTypesOfAddress] = useState();
    const [typesOfPlace, setTypesOfPlace] = useState();

    //endereço
    const [name, setName] = useState();
    const [address_id, setAddress_id] = useState();
    const [CEP, setCEP] = useState();
    const [place, setPlace] = useState();
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [typeOfAddress, setTypeOfAddress] = useState();
    const [typeOfPlace, setTypeOfPlace] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {

        async function typesLoadData() {
            const typesOfAddressData = await api.get('/addresses-types');
            const typesOfPlaceData = await api.get('/places-types');

            setTypesOfAddress(typesOfAddressData.data);
            setTypesOfPlace(typesOfPlaceData.data);
        }
        
        async function addressLoadData() {
            const addressData = await api.get(`/addresses/${id}`, {
                id: id
            });

            const address = addressData.data;

            setName(address.name);
            setAddress_id(address.id);
            setCEP(address.cep);
            setPlace(address.place);
            setNumber(address.number);
            setComplement((address.complement !== null) ? address.complement : '');
            setNeighborhood(address.neighborhood);
            setTypeOfAddress(address.address_type_id);
            setTypeOfPlace(address.place_type_id);
            setCity(address.city);
            setState(address.state);
            setCountry(address.country);
        }

        typesLoadData();
        addressLoadData();

    }, [id]);

    async function updateAddress(e) {
        e.preventDefault();

        try {
            const response = await api.put('/addresses', {
                id: address_id,
                name: name,
                cep: CEP,
                place: place,
                number: number,
                city: city,
                state: state,
                country: country,
                complement: complement,
                neighborhood: neighborhood,
                address_type_id: typeOfAddress,
                place_type_id: typeOfPlace
            });
    
            if(response.status === 201) {
                toast.success('Endereço atualizado com sucesso!');
                navigate('/meu-perfil');
            }

        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
        
    }

    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar endereço"/>
                    <CustomForm onSubmit={updateAddress}>

                        <h3>Atualizar endereço</h3>

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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="cep">CEP</label>
                                    <input 
                                        id="cep" 
                                        type="text" 
                                        value={CEP}
                                        onChange={(e) => setCEP(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="logradouro">Logradouro</label>
                                    <input 
                                        id="logradouro" 
                                        type="text"
                                        value={place}
                                        onChange={(e) => setPlace(e.target.value)} 
                                    />
                                </fieldset>
                                
                                <fieldset className="p50">
                                    <label htmlFor="numero">Número</label>
                                    <input 
                                        id="numero" 
                                        type="text" 
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </fieldset>
                                
                                <fieldset className="p50">
                                    <label htmlFor="complemento">Complemento</label>
                                    <input 
                                        id="complemento" 
                                        type="text" 
                                        value={complement}
                                        onChange={(e) => setComplement(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="bairro">Bairro</label>
                                    <input 
                                        id="bairro" 
                                        type="text" 
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="tipo_de_endereco">Tipo de endereço</label>
                                    <select 
                                        id="tipo_de_endereco" 
                                        value={typeOfAddress}
                                        onChange={(e) => setTypeOfAddress(e.target.value)}
                                    >
                                        <option value={1}>Endereço de entrega</option>
                                        <option value={2}>Endereço de cobrança</option>
                                        <option value={3}>Ambos</option>
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="tipo_de_logradouro">Tipo de Logradouro</label>
                                    <select 
                                        id="tipo_de_logradouro" 
                                        type="text" 
                                        value={typeOfPlace}
                                        onChange={(e) => setTypeOfPlace(e.target.value)}
                                    >
                                        <option value={1}>Alameda</option>
                                        <option value={2}>Avenida</option>
                                        <option value={3}>Beco</option>
                                        <option value={4}>Bloco</option>
                                        <option value={5}>Condomínio</option>
                                        <option value={6}>Distrito</option>
                                        <option value={7}>Rua</option>
                                        <option value={8}>Residencial</option>
                                        <option value={9}>Sitio</option>
                                        <option value={10}>Vila</option>
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input 
                                        id="cidade" 
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)} 
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="estado">Estado</label>
                                    <input 
                                        id="estado" 
                                        type="text" 
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="pais">País</label>
                                    <input 
                                        id="pais" 
                                        type="text" 
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </fieldset>
                                

                            </div>
                        </div>

                        <button>Atualizar</button>

                    </CustomForm>
                </div>
            </main>
            <Footer/>
        </>
    );
}