import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import cartao from '../assets/imgs/cartao.svg';

export function UpdateCard() {

    const [brands, setBrands] = useState();

    //params
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    //inputs
    const [ownerName, setOwnerName] = useState();
    const [number, setNumber] = useState();
    const [brandId, setBrandId] = useState();
    const [securityCode, setSecurityCode] = useState();


    useEffect(() => {

        async function cardLoadData() {
            const cardData = await api.post('/cards/show', {
                id: id
            } );

            const card = cardData.data;

            setOwnerName(card.owner_name);
            setNumber(card.number);
            setBrandId(card.brand_id);
            setSecurityCode(card.security_code);
        }

        async function loadBrandsdata() {
            const brandsdata = await api.get('/brands/index');
            setBrands(brandsdata.data.results);
            setBrandId(brandsdata.data.results[0].id)
        }

        loadBrandsdata();
        cardLoadData();

    }, [id]);

    async function updateCard(e) {
        e.preventDefault();

        await api.put('/cards', {
            id: id,
            card:{
                owner_name: ownerName,
                number: number,
                brand_id: brandId,
                security_code: securityCode
            }
        })
    }

    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar cartão"/>
                    <CustomForm onSubmit={updateCard}>

                        <h3>Atualizar Cartão</h3>

                        <div className="group">

                            <div className="title">
                                <img src={cartao} alt="" />
                                <h4>Dados do cartão</h4>
                            </div>

                            <div className="row">
                                
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

                        <button>Atualizar</button>

                    </CustomForm>
                </div>
            </main>
            <Footer/>
        </>
    );
}