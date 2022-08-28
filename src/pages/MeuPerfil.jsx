import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import api from "../api";
import { Context } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import cartao from '../assets/imgs/cartao.svg';
import localizacao from '../assets/imgs/localizacao.svg';

export function MeuPerfil() {
    const { user, userLoadData } = useContext(Context);

    //dados da conta
    const [email, setEmail] = useState();

    //dados pessoais
    const [name, setName] = useState();
    const [CPF, setCPF] = useState();
    const [DDD, setDDD] = useState();
    const [phone, setPhone] = useState();
    const [birthdate, setBirthdate] = useState();

    //cards
    const [cards, setCards] = useState();

    //addresses
    const [addresses, setAddresses] = useState();

    useEffect(() => {

        if (!user) {
            userLoadData();
        } else {
            setEmail(user.email);
            setName(user.person.name);
            setCPF(user.person.cpf);
            setDDD(user.person.phone.ddd);
            setPhone(user.person.phone.number);
            setBirthdate(moment(user.person.birth_date.slice(0, 9)).format('DD/MM/yyyy'));
            
            setCards(user.person.cards)
            setAddresses(user.person.addresses)
        }

    }, [user, userLoadData]);

    async function deleteCard(id) {
        try {
            await api.delete(`/cards/${id}`);
            toast.success('Cartão removido com sucesso!');
        } catch(e) {
            toast.error(e.response.data.message);
        }
    }

    async function deleteAddress(id) {
        try {
            await api.delete(`/addresses/${id}`);
            toast.success('Endereço removido com sucesso!');
        } catch(e) {
            toast.error(e.response.data.message);
        }
    }

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
                                                    <td>CPF</td>
                                                    <td>{CPF}</td>
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
                                                
                                                {addresses && addresses.map((address, index) => 
                                                    (
                                                        <tr key={address.id}>
                                                            <td className="ellipsis">Endereco{index+1}</td>
                                                            <td><Link to={`/update-address?id=${address.id}`}>editar</Link></td>
                                                            <td><button onClick={() => deleteAddress(address.id)}>remover</button></td>
                                                        </tr>
                                                    )
                                                )}
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
                                                {cards && cards.map(card => 
                                                    (
                                                        <tr key={card.id}>
                                                            <td>{card.number}</td>
                                                            <td><Link to={`/update-card?id=${card.id}`}>editar</Link></td>
                                                            <td><button onClick={() => deleteCard(card.id)}>remover</button></td>
                                                        </tr>
                                                    )
                                                )}
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