import { CustomForm } from '../components/customForm/CustomForm';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';

import cartao from '../assets/imgs/cartao.svg';

export function RegisterCard() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Cadastrar cartão"/>
                    <CustomForm>

                        <h3>Cadastrar Cartão</h3>

                        <div className="group">

                            <div className="title">
                                <img src={cartao} alt="" />
                                <h4>Dados do cartão</h4>
                            </div>

                            <div className="row">
                                
                                <fieldset className="p50">
                                    <label htmlFor="nome_do_titular">Nome do Titular</label>
                                    <input id="nome_do_titular" type="text" />
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="numero_do_cartao">Numero do Cartão</label>
                                    <input id="numero_do_cartao" type="text" />
                                </fieldset>
                                
                                <fieldset className="p50">
                                    <label htmlFor="bandeira">Bandeira do Cartão</label>
                                    <select id="bandeira">
                                        <option value="Mastercard">Mastercard</option>
                                        <option value="Visa">Visa</option>
                                    </select>
                                </fieldset>

                                <fieldset className="p50">
                                    <label htmlFor="codigo">Código de Segurança</label>
                                    <input id="codigo" type="text" />
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