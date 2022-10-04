import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import api from '../api';

import cartao from '../assets/imgs/cartao.svg';

export function RegisterCard() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState();

    //inputs
    const [name, setName] = useState();
    const [ownerName, setOwnerName] = useState();
    const [number, setNumber] = useState();
    const [brandId, setBrandId] = useState();
    const [securityCode, setSecurityCode] = useState();


    useEffect(() => {
        async function loadBrandsdata() {
            const brandsdata = await api.get('/brands');
            setBrands(brandsdata.data);
            setBrandId(brandsdata.data[0].id)
        }

        loadBrandsdata();

    }, []);

    async function registerNewCard(e) {
        e.preventDefault();

        try {
            const response = await api.post('/cards', {
                name: name,
                owner_name: ownerName,
                number: number,
                brand_id: brandId,
                security_code: securityCode
            })

            if(response.status === 201) {
                toast.success('Cartão cadastrado com sucesso!');
                navigate('/meu-perfil');
            }

        } catch (e) {
            toast.error(e?.response?.data?.message);
        }



    }


    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Cadastrar cartão"/>
                    <CustomForm onSubmit={registerNewCard}>

                        <h3>Cadastrar Cartão</h3>

                        <div className="group">

                            <div className="title">
                                <img src={cartao} alt="" />
                                <h4>Dados do cartão</h4>
                            </div>

                            <div className="row">
                                
                                <fieldset className="p100">
                                    <label htmlFor="nome">Nome</label>
                                    <input 
                                        id="nome"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="nome_do_titular">Nome do Titular</label>
                                    <input 
                                        id="nome_do_titular"
                                        type="text"
                                        value={ownerName}
                                        onChange={e => setOwnerName(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="numero_do_cartao">Numero do Cartão</label>
                                    <input 
                                        id="numero_do_cartao"
                                        type="text"
                                        value={number}
                                        onChange={e => setNumber(e.target.value)} 
                                        minlength="16"
                                        maxlength="16"
                                    />
                                </fieldset>
                                
                                <fieldset className="p50">
                                    <label htmlFor="bandeira">Bandeira do Cartão</label>
                                    <select id="bandeira" value={brandId} onChange={e => setBrandId(e.target.value)}>
                                        {brands && brands.map((brand) => 
                                            (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            )
                                        )}
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="codigo">Código de Segurança</label>
                                    <input 
                                        id="codigo" 
                                        type="text"
                                        value={securityCode}
                                        onChange={e => setSecurityCode(e.target.value)} 
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