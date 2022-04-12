import { useContext, useState } from 'react';
import moment from 'moment';

import { Context } from '../contexts/AuthContext';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import api from '../api';
import { useNavigate } from 'react-router-dom';


export function UpdatePersonalData() {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    
    //dados pessoais
    const [name, setName] = useState(user.person.name);
    const [CPF, setCPF] = useState(user.person.cpf);
    const [cellphone, setCellphone] = useState(user.person.cellphone);
    const [DDD, setDDD] = useState(user.person.phone.ddd);
    const [phone, setPhone] = useState(user.person.phone.number);
    const [gender, setGender] = useState(user.person.gender_id);
    const [birthdate, setBirthdate] = useState(moment(user.person.birth_date.slice(0,9)).format('yyyy-MM-DD'));

    async function updatePersonalData(e) {
        e.preventDefault();

        const response = await api.put('/persons/' + user.person.id, {
            "name": name,
            "cpf": CPF,
            "cellphone": cellphone,
            "gender_id": gender,
            "birth_date": moment(birthdate).format('DD/MM/yyyy'),
            "phone": {
                "ddd": DDD,
                "number": phone
            }
        });

        if(response.status === 201) {
            navigate('/meu-perfil');
        }
    }

    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar dados pessoais"/>
                    <CustomForm onSubmit={updatePersonalData}>

                        <h3>Deseja atualizar seus dados</h3>

                        <div className="group">

                            <div className="title">
                                <img src={dadosPessoais} alt="" />
                                <h4>Dados Pessoais</h4>
                            </div>

                            <div className="row">

                                <fieldset className="p50">
                                    <label htmlFor="nome">Nome Completo</label>
                                    <input 
                                        id="nome" 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="cpf">CPF</label>
                                    <input 
                                        id="cpf" 
                                        type="text" 
                                        value={CPF}
                                        onChange={(e) => setCPF(e.target.value)}
                                        disabled={true}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="celular">Celular</label>
                                    <input 
                                        id="celular" 
                                        type="phone" 
                                        value={cellphone}
                                        onChange={(e) => setCellphone(e.target.value)}
                                    />
                                </fieldset>
                                
                                <fieldset className="p10">
                                    <label htmlFor="ddd">DDD</label>
                                    <input 
                                        id="ddd" 
                                        type="text"
                                        value={DDD}
                                        onChange={(e) => setDDD(e.target.value)} 
                                    />
                                </fieldset>

                                <fieldset className="p40">
                                    <label htmlFor="telefone">Telefone Fixo</label>
                                    <input 
                                        id="telefone" 
                                        type="text" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="sexo">Sexo</label>
                                    <select id="sexo" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value={1}>Masculino</option>
                                        <option value={2}>Feminino</option>
                                        <option value={3}>Outro</option>
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="data_de_nascimento">Data de Nascimento</label>
                                    <input 
                                        id="data_de_nascimento" 
                                        type="date" 
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        disabled={true}
                                    />
                                </fieldset>

                            </div>
                        </div>

                        <button type="submit">Atualizar</button>

                    </CustomForm>
                </div>
            </main>
            <Footer/>
        </>
    );
}