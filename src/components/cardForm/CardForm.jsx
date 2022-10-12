import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Titulo } from '../titulo/Titulo';
import { CustomForm } from '../customForm/CustomForm';
import  cartao from '../../assets/imgs/cartao.svg'
import { useContext } from 'react';
import { Context } from '../../contexts/AuthContext';

export function CardForm({ onSubmit, children }) {
    const { userLoadData } = useContext(Context);
    const navigate = useNavigate();
    const [brands, setBrands] = useState();

    //inputs
    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadBrandsdata() {
            const brandsdata = await api.get('/brands');
            setBrands(brandsdata.data);
            setCard({ ...card, brand_id: brandsdata.data[0].id})
        }

        loadBrandsdata();

    }, []);

    async function registerNewCard(e) {
        e.preventDefault();

        try {
            const response = await api.post('/cards', {
                ...card
            })

            if(response.status === 201) {
                userLoadData();
                toast.success('Cartão cadastrado com sucesso!');
                navigate(-1);
            }
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    }

    return (
        <>
             <CustomForm onSubmit={onSubmit ? (e) => {
                            onSubmit(e, {
                                ...card
                            }) 
                        }: (e) => {
                            registerNewCard(e)
                        }}
                    >

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
                                value={card.name}
                                onChange={e => setCard({ ...card, name: e.target.value})}
                            />
                        </fieldset>

                        <fieldset className="p50">
                            <label htmlFor="nome_do_titular">Nome do Titular</label>
                            <input 
                                id="nome_do_titular"
                                type="text"
                                value={card.owner_name}
                                onChange={e => setCard({ ...card, owner_name: e.target.value})}
                            />
                        </fieldset>

                        <fieldset className="p50">
                            <label htmlFor="numero_do_cartao">Numero do Cartão</label>
                            <input 
                                id="numero_do_cartao"
                                type="text"
                                value={card.number}
                                onChange={e => setCard({ ...card, number: e.target.value})}
                                minlength="16"
                                maxlength="16"
                            />
                        </fieldset>
                        
                        <fieldset className="p50">
                            <label htmlFor="bandeira">Bandeira do Cartão</label>
                            <select id="bandeira"                                 
                                value={card.brand_id}
                                onChange={e => setCard({ ...card, brand_id: e.target.value})}>
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
                                value={card.security_code}
                                onChange={e => setCard({ ...card, security_code: e.target.value})}
                            />
                        </fieldset>

                    </div>
                </div>

                <button>Cadastrar</button>

            </CustomForm>
        </>
    );
}