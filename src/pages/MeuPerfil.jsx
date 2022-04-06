import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import api from "../api/index";

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import cartao from '../assets/imgs/cartao.svg';
import localizacao from '../assets/imgs/localizacao.svg';
import { Context } from "../contexts/AuthContext";

export function MeuPerfil() {

    //dados da conta
    const [email, setEmail] = useState();

    //dados pessoais
    const [name, setName] = useState();
    const [CPF, setCPF] = useState();
    const [cellphone, setCellphone] = useState();
    const [DDD, setDDD] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [birthdate, setBirthdate] = useState();

    useEffect(async () => {
        const userData = await api.get('users');
        const user = userData.data;

        setEmail(user.email);
        setName(user.person.name);
        setCPF(user.person.cpf);
        setCellphone(user.person.cellphone);
        setDDD(user.person.phone.ddd);
        setPhone(user.person.phone.number);
        setGender(user.person.gender_id);
        setBirthdate(moment(user.person.birthdate).format('DD/MM/yyyy'))
    })

    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <SideMenu/>
                        </div>
                        <div className="col-12 col-lg-8">
                            <WhiteBox>
                                <div className="group col-12 col-md-6">

                                    <div className="title">
                                        <img src={dadosPessoais} alt="" />
                                        <h4>Dados Cadastrais</h4>
                                    </div>

                                    <div className="table-container">
                                        <table className="odd">
                                            <tbody>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>{name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sexo</td>
                                                    <td>{gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>Data de Nascimento</td>
                                                    <td>{moment(birthdate).format('DD/MM/yyyy')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Telefone</td>
                                                    <td>({DDD}) {phone}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="btns">
                                        <Link to="/update-password">Editar senha</Link>
                                        <Link to="/update-personal-data">Editar cadastro</Link>
                                    </div>

                                </div>

                                <div className="group col-12 col-md-6">
                                    <div className="title">
                                        <img src={localizacao} alt="" />
                                        <h4>Endereços</h4>
                                    </div>

                                    <div className="table-container">
                                        <table className="odd">
                                            <tbody>
                                                <tr>
                                                    <td>Minha casa</td>
                                                    <td><Link to="/update-address">editar</Link></td>
                                                    <td><Link to="/update-address">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Minha casa</td>
                                                    <td><Link to="/update-address">editar</Link></td>
                                                    <td><Link to="/update-address">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Minha casa</td>
                                                    <td><Link to="/update-address">editar</Link></td>
                                                    <td><Link to="/update-address">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Minha casa</td>
                                                    <td><Link to="/update-address">editar</Link></td>
                                                    <td><Link to="/update-address">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Minha casa</td>
                                                    <td><Link to="/update-address">editar</Link></td>
                                                    <td><Link to="/update-address">remover</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="btns">
                                        <Link to="/register-address">Cadastrar endereço</Link>
                                    </div>
                                </div>

                                <div className="group col-12 col-md-6">
                                    <div className="title">
                                        <img src={dadosPessoais} alt="" />
                                        <h4>Cupons</h4>
                                    </div>
                                    <div className="table-container">
                                        <table className="odd">
                                            <tbody>
                                                <tr>
                                                    <td>R$ 75</td>
                                                    <td>xxxxx-xxxxxx</td>
                                                </tr>
                                                <tr>
                                                    <td>R$ 75</td>
                                                    <td>xxxxx-xxxxxx</td>
                                                </tr>
                                                <tr>
                                                    <td>R$ 75</td>
                                                    <td>xxxxx-xxxxxx</td>
                                                </tr>
                                                <tr>
                                                    <td>R$ 75</td>
                                                    <td>xxxxx-xxxxxx</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                <div className="group col-12 col-md-6">
                                    <div className="title">
                                        <img src={cartao} alt="" />
                                        <h4>Cartões</h4>
                                    </div>
                                    <div className="table-container">
                                        <table className="odd">
                                            <tbody>
                                                <tr>
                                                    <td>Cartão 1</td>
                                                    <td><Link to="/update-card">editar</Link></td>
                                                    <td><Link to="/update-card">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cartão 1</td>
                                                    <td><Link to="/update-card">editar</Link></td>
                                                    <td><Link to="/update-card">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cartão 1</td>
                                                    <td><Link to="/update-card">editar</Link></td>
                                                    <td><Link to="/update-card">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cartão 1</td>
                                                    <td><Link to="/update-card">editar</Link></td>
                                                    <td><Link to="/update-card">remover</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cartão 1</td>
                                                    <td><Link to="/update-card">editar</Link></td>
                                                    <td><Link to="/update-card">remover</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="btns">
                                        <Link to="/register-card">Cadastrar cartão</Link>
                                    </div>
                                </div>

                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}