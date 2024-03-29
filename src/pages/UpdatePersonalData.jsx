import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Context } from '../contexts/AuthContext';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export function UpdatePersonalData() {
    const navigate = useNavigate();
    const { user, userLoadData } = useContext(Context);

    //dados pessoais
    const [name, setName] = useState();
    const [CPF, setCPF] = useState();
    const [cellphone, setCellphone] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [birthdate, setBirthdate] = useState();

    async function updatePersonalData(e) {
        e.preventDefault();

        try {
            const response = await api.put('/persons/' + user?.person.id, {
                "name": name,
                "cpf": CPF,
                "cellphone": cellphone,
                "gender_id": gender,
                "birth_date": moment(birthdate).format('YYYY-MM-DD'),
                "phone": phone,
            });

            if (response.status === 201) {
                toast.success('Dados pessoais atualizados com sucesso!');
                navigate('/meu-perfil');
            }
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    }

    const handleCPF = (e) => {
        let cpf = e?.target?.value || e;
        cpf = cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        setCPF(cpf);
    }

    const handleCellphone = (e) => {
        let phone = e?.target?.value || e;
        phone = phone.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')

        setCellphone(phone);
    }

    useEffect(() => {
        if (!user) {
            userLoadData();
        } else {
            setName(user?.person.name);
            handleCPF(user?.person.cpf);
            handleCellphone(user?.person.cellphone);
            setPhone(user?.person.phone);
            setBirthdate(moment(user?.person.birth_date).format('YYYY-MM-DD'));
        }
    }, [user, userLoadData]);

    return (
        <>
            <Header />
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar dados pessoais" />
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
                                        onChange={(e) => handleCPF(e)}
                                        disabled={true}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="celular">Celular</label>
                                    <input
                                        id="celular"
                                        type="phone"
                                        value={cellphone}
                                        onChange={(e) => handleCellphone(e)}
                                    />
                                </fieldset>

                                <fieldset className="p10">
                                    <label htmlFor="ddd">DDD</label>
                                    <input
                                        id="ddd"
                                        type="text"
                                        value={phone?.ddd}
                                        onChange={(e) => setPhone({
                                            ...phone, ddd: e.target.value
                                        })}
                                    />
                                </fieldset>

                                <fieldset className="p40">
                                    <label htmlFor="telefone">Telefone Fixo</label>
                                    <input
                                        id="telefone"
                                        type="text"
                                        value={phone?.number}
                                        onChange={(e) => setPhone({
                                            ...phone, number: e.target.value
                                        })}
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
                                    />
                                </fieldset>

                            </div>
                        </div>

                        <button type="submit">Atualizar</button>

                    </CustomForm>
                </div>
            </main>
            <Footer />
        </>
    );
}