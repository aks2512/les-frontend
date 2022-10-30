import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';

import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import cartao from '../assets/imgs/cartao.svg';
import { toast } from 'react-toastify';

export function UpdateCard() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState();

    //params
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    //inputs
    const [name, setName] = useState();
    const [ownerName, setOwnerName] = useState();
    const [number, setNumber] = useState();
    const [brandId, setBrandId] = useState();
    const [securityCode, setSecurityCode] = useState();

    async function cardLoadData() {
        const cardData = await api.get(`/cards/${id}`);

        const card = cardData.data;

        setName(card.name);
        setOwnerName(card.owner_name);
        setNumber('');
        setBrandId(card.brand_id || brands[0].id);
        setSecurityCode(card.security_code);
    }

    async function loadBrandsdata() {
        const brandsdata = await api.get('/brands');
        setBrands(brandsdata.data);
        setBrandId(brandsdata.data[0].id)
    }


    useEffect(() => {
        loadBrandsdata();
        cardLoadData();
    }, [id]);

    async function updateCard(e) {
        e.preventDefault();

        try {
            const response = await api.put(`/cards/${id}`, {
                name: name,
                owner_name: ownerName,

                brand_id: brandId,
                security_code: securityCode
            })

            toast(response.data.message)
            navigate(-1);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'falha ao atualizar cartão')
        }

    }

    return (
        <>
            <Header />
            <main>
                <div className="container py-5">
                    <Titulo title="Atualizar cartão" />
                    <CustomForm onSubmit={updateCard}>

                        <h3>Atualizar Cartão</h3>

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
                                        placeholder="0000000000000000"
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
            <Footer />
        </>
    );
}