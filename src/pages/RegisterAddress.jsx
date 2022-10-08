import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import localizacao from '../assets/imgs/localizacao.svg';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export function RegisterAddress() {
    const navigate = useNavigate();
    //endereço
    const [name, setName] = useState();
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
                cep: CEP,
                place: place,
                number: number,
                complement: complement,
                neighborhood: neighborhood,
                address_type_id: typeOfAddress,
                place_type_id: typeOfPlace,
                city: city,
                state: state,
                country: country
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

        setTypeOfAddress(1);
        setTypeOfPlace(1);
    }, []);

    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Registrar endereço"/>
                    <CustomForm onSubmit={createAddress}>

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
                                        value={typeOfPlace}
                                        onChange={(e) => setTypeOfPlace(e.target.value)}
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

                        <button>Cadastrar</button>

                    </CustomForm>
                </div>
            </main>
            <Footer/>
        </>
    );
}