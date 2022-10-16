import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../api/index';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosDaConta from '../assets/imgs/dados_da_conta.svg';
import { Context } from '../contexts/AuthContext';

export function UpdatePassword() {
    const { handleLogout, user } = useContext(Context);

    //senha
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function updatePassword(e) {
        e.preventDefault();

        try {
            if (password === confirmPassword) {
                await api.put(`users/${user?.id}`, {
                    user: {
                        password: password,
                    }
                })
                toast.success('Senha atualizada com sucesso!');
                handleLogout();
            } else {
                toast.error('As senhas não conferem!');
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }

    }

    return (
        <>
            <Header />
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar senha" />
                    <CustomForm onSubmit={updatePassword}>

                        <h3>Deseja atualizar sua senha</h3>

                        <div className="group">

                            <div className="title">
                                <img src={dadosDaConta} alt="" />
                                <h4>Dados da Conta</h4>
                            </div>

                            <div className="row">

                                <fieldset className="p50">
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="confirmePassword">Confirme a senha</label>
                                    <input
                                        id="confirmePassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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