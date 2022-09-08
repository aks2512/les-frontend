import { useState } from 'react';

import api from '../api/index';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosDaConta from '../assets/imgs/dados_da_conta.svg';
import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import localizacao from '../assets/imgs/localizacao.svg';

export function Signup() {

    //dados da conta
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //dados pessoais
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [DDD, setDDD] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(1);
    const [birthdate, setBirthdate] = useState('');

    // endereços
    const [enderecos, setEnderecos] = useState([
        {
            "cep": '',
            "place": '',
            "number": '',
            "city": '',
            "state": '',
            "country": '',
            "complement": '',
            "neighborhood": '',
            "address_type_id": 1,
            "place_type_id": 1
        }
    ]);

    async function registerClient(e) {
        e.preventDefault();
        console.log(enderecos)

        //formatado
        let formatedBirthdate = birthdate.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, group1, group2, group3) => {
            return `${group3}/${group2}/${group1}` 
        });
        
        try {
            await api.post('users', {
                "user": {
                    "email": email,
                    "email_confirm": confirmEmail,
                    "password": password,
                    "password_confirm": confirmPassword
                },
                "person": {
                    "name": name,
                    "cpf": CPF,
                    "cellphone": cellphone,
                    "gender_id": Number(gender),
                    "birth_date": formatedBirthdate,
                    "phone": {
                        "ddd": DDD,
                        "number": phone
                    }
                },
                "addresses": enderecos
            })

            alert('Cadastro efetuado com sucesso');

        } catch(e) {

            alert('Houve algum erro no cadastro');

        }
    }


    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Sign Up"/>
                    <CustomForm onSubmit={registerClient}>

                        <h3>Ainda não sou cadastrado</h3>

                        <div className="group">

                            <div className="title">
                                <img src={dadosDaConta} alt="" />
                                <h4>Dados da Conta</h4>
                            </div>

                            <div className="row">

                                <fieldset className="p50">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        id="email"
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="confirmeEmail">Confirme o email</label>
                                    <input 
                                        id="confirmeEmail" 
                                        type="confirmeEmail"
                                        value={confirmEmail} 
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                    />
                                </fieldset>
                                
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
                                    />
                                </fieldset>

                            </div>
                        </div>

                        <div className="group">

                            { enderecos.map((endereco, index) => (
                                <div key={index} className="accordion">
                                    <div className="accordion__header" >
                                        <div className="title">
                                            <img src={localizacao} alt="" />
                                            <h4>Endereço</h4>
                                        </div>
                                        <div className="btns">
                                            <div 
                                                className="address__removed"
                                                onClick={(e) => { let newArray = [...enderecos]; newArray.splice(index, 1) ; setEnderecos(newArray) }}
                                            >
                                                Remover
                                            </div>
                                            <div className="accordion__open" onClick={(e) => e.target.parentNode.parentNode.parentNode.classList.toggle('active')}>+</div>
                                        </div>
                                    </div>
                                    <div className="accordion__content">

                                        <div className="row">

                                            <fieldset className="p50">
                                                <label htmlFor="cep">CEP</label>
                                                <input 
                                                    id="cep" 
                                                    type="text" 
                                                    value={endereco.cep}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].cep = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="logradouro">Logradouro</label>
                                                <input 
                                                    id="logradouro" 
                                                    type="text"
                                                    value={endereco.place}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].place = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>
                                            
                                            <fieldset className="p50">
                                                <label htmlFor="numero">Número</label>
                                                <input 
                                                    id="numero" 
                                                    type="text" 
                                                    value={endereco.number}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].number = Number(e.target.value) ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>
                                            
                                            <fieldset className="p50">
                                                <label htmlFor="complemento">Complemento</label>
                                                <input 
                                                    id="complemento" 
                                                    type="text" 
                                                    value={endereco.complement}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].complement = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="bairro">Bairro</label>
                                                <input 
                                                    id="bairro" 
                                                    type="text" 
                                                    value={endereco.neighborhood}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].neighborhood = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="tipo_de_endereco">Tipo de endereço</label>
                                                <select 
                                                    id="tipo_de_endereco" value={endereco.address_type_id} 
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].address_type_id = Number(e.target.value) ; setEnderecos(newArray) }}
                                                >
                                                    <option value={1}>Endereço de cobrança</option>
                                                    <option value={2}>Endereço de entrega</option>
                                                    <option value={3}>Ambos</option>
                                                </select>
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="tipo_de_logradouro">Tipo de Logradouro</label>
                                                <select 
                                                    id="tipo_de_logradouro" 
                                                    value={endereco.place_type_id} 
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].place_type_id = Number(e.target.value) ; setEnderecos(newArray) }}
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
                                                    value={endereco.city}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].city = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="estado">Estado</label>
                                                <input 
                                                    id="estado" 
                                                    type="text" 
                                                    value={endereco.state}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].state = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label htmlFor="pais">País</label>
                                                <input 
                                                    id="pais" 
                                                    type="text" 
                                                    value={endereco.country}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].country = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>
                                            

                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div style={{cursor: 'pointer', color: 'white'}}
                                onClick={(e) => setEnderecos(
                                    [
                                        ...enderecos,
                                        {
                                            cep: '',
                                            place: '',
                                            number: '',
                                            complement: '',
                                            neighborhood: '',
                                            typeOfAddress: 1,
                                            typeOfPlace: 1,
                                            city: '',
                                            state: '',
                                            country: ''
                                        }
                                    ]
                                )}
                            >
                                Adicionar
                            </div>
                            
                        </div>

                        <button type="submit">Cadastrar</button>

                    </CustomForm>

                </div>
            </main>
            <Footer/>
        </>
    );
}