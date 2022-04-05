import { useEffect, useState } from 'react';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import api from '../api';

export function UpdatePersonalData() {

    //dados pessoais
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [DDD, setDDD] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(1);
    const [birthdate, setBirthdate] = useState('');

    useEffect(async () => {
        let res = await api.get('/users/4575936f-8c3a-4de1-9c53-7f7385467573');

        if(res.status === 201) {
            let data = res.data;

            setName(data.person.name);
            setCPF(data.person.cpf);
            setCellphone(data.person.cellphone);
            setDDD(data.person.phone.ddd);
            setPhone(data.person.phone.number);
            setGender(data.person.gender_id);
            setBirthdate(data.person.birth_date.slice(0,10));
            
        }
    }, [])

    async function updatePersonalData(e) {
        e.preventDefault();

        //formatado
        let formatedBirthdate = birthdate.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, group1, group2, group3) => {
            return `${group3}/${group2}/${group1}` 
        });

        let res = await api.put('/persons/eb4c3037-57ff-4199-9a58-fe8f54124a61', {
            "name": name,
            "cpf": CPF,
            "cellphone": cellphone,
            "gender_id": gender,
            "birth_date": formatedBirthdate,
            "phone": {
                "ddd": DDD,
                "number": phone
            }
        });

        console.log(res)
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