import { useEffect, useState } from 'react';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import localizacao from '../assets/imgs/localizacao.svg';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function RegisterAddress() {
    const navigate = useNavigate();

    //types
    const [typesOfAddress, setTypesOfAddress] = useState();
    const [typesOfPlace, setTypesOfPlace] = useState();

    //endereço
    const [CEP, setCEP] = useState();
    const [place, setPlace] = useState();
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [typeOfAddress, setTypeOfAddress] = useState(1);
    const [typeOfPlace, setTypeOfPlace] = useState(1);
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {

        async function typesLoadData() {
            const typesOfAddressData = await api.get('/addresses-types');
            const typesOfPlaceData = await api.get('/places-types');

            setTypesOfAddress(typesOfAddressData.data.results);
            setTypesOfPlace(typesOfPlaceData.data.results);
        }

        typesLoadData();

    }, []);

    async function createAddress(e) {
        e.preventDefault();

        const response = await api.post('/addresses', {
            addresses: [
                {
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
                }
            ]
        });

        if (response.status === 201) {
            navigate('/meu-perfil');
        }
    }

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
                                        {typesOfAddress && typesOfAddress.map((type) => 
                                            (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        )}
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
                                        {typesOfPlace && typesOfPlace.map((type) => 
                                            (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        )}
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