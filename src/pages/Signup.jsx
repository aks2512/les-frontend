import { useState } from 'react';

import api from '../api/index';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import dadosDaConta from '../assets/imgs/dados_da_conta.svg';
import dadosPessoais from '../assets/imgs/dados_pessoais.svg';
import localizacao from '../assets/imgs/localizacao.svg';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

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

    //opções
    const [placeTypes, setPlaceTypes] = useState([]);
    const [addressTypes, setAddressTypes] = useState([]);
    const [genders, setGenders] = useState([]);

    async function getPlaceTypes() {
        const response = await api.get('/places-types');
        setPlaceTypes(response.data);
    }

    async function getAddressTypes() {
        const response = await api.get('/addresses-types');
        setAddressTypes(response.data);
    }

    async function getGenders() {
        const response = await api.get('/genders');
        setGenders(response.data);
    }

    // endereços
    const [enderecos, setEnderecos] = useState([]);

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

            toast.success('Cadastro realizado com sucesso!');
        } catch(e) {
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        getPlaceTypes();
        getAddressTypes();
        getGenders();
    }, []);

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
                                        {genders.map((gender)=>{
                                            return (
                                                <option value={gender.id}>{gender.name}</option>
                                            )
                                        })}
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

                                            <fieldset className="p100">
                                                <label>Nome</label>
                                                <input  
                                                    type="text" 
                                                    value={endereco.name}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].name = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>CEP</label>
                                                <input 
                                                    type="text" 
                                                    value={endereco.cep}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].cep = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Logradouro</label>
                                                <input 
                                                    type="text"
                                                    value={endereco.place}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].place = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>
                                            
                                            <fieldset className="p50">
                                                <label>Número</label>
                                                <input 
                                                    type="text" 
                                                    value={endereco.number}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].number = Number(e.target.value) ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>
                                            
                                            <fieldset className="p50">
                                                <label>Complemento</label>
                                                <input 
                                                    type="text" 
                                                    value={endereco.complement}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].complement = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Bairro</label>
                                                <input 
                                                    type="text" 
                                                    value={endereco.neighborhood}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].neighborhood = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Tipo de endereço</label>
                                                <select 
                                                    className='select-addresstype'
                                                    value={endereco.address_type_id} 
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].address_type_id = Number(e.target.value) ; setEnderecos(newArray) }}
                                                >
                                                    {addressTypes.map((addressType)=>{
                                                        return (
                                                            <option value={addressType.id}>{addressType.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Tipo de Logradouro</label>
                                                <select 
                                                    className='select-placestype'
                                                    value={endereco.place_type_id} 
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].place_type_id = Number(e.target.value) ; setEnderecos(newArray) }}
                                                >
                                                    {placeTypes.map((placeType)=>{
                                                        return (
                                                            <option value={placeType.id}>{placeType.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Cidade</label>
                                                <input 
                                                    type="text"
                                                    value={endereco.city}
                                                    onChange={(e) => { let newArray = [...enderecos]; newArray[index].city = e.target.value ; setEnderecos(newArray) }}
                                                />
                                            </fieldset>

                                            <fieldset className="p50">
                                                <label>Estado</label>
                                                <input 
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

                            <div className="btn_add_addresses" style={{cursor: 'pointer', color: 'white'}}
                                onClick={(e) => setEnderecos(
                                    [
                                        ...enderecos,
                                        {
                                            "name": '',
                                            "cep": '',
                                            "place": '',
                                            "number": '',
                                            "complement": '',
                                            "neighborhood": '',
                                            "address_type_id": 1,
                                            "place_type_id": 1,
                                            "city": '',
                                            "state": '',
                                            "country": ''
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