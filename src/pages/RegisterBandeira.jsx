import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../api';

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function RegisterBandeira() {
    const [nomeDaBandeira, setNomeDaBandeira] = useState('');
    const [linkDaBandeira, setLinkDaBandeira] = useState('');

    async function createBrand(e) {
        e.preventDefault();
        const response = await api.post('brands', 
            {
                name: nomeDaBandeira,
                image: linkDaBandeira
            }
        )

        if(response.status === 201) {
            alert('Bandeira cadastrada com sucesso!')
        }
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminCustomForm onSubmit={createBrand}>
                        <h4>Cadastrar Bandeira</h4>

                        <fieldset>
                            <label htmlFor="nome_da_bandeira">Nome da Bandeira</label>
                            <input type="text" id="nome_da_bandeira" value={nomeDaBandeira} onChange={(e) => setNomeDaBandeira(e.target.value)}/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="link_da_bandeira">Link da Bandeira</label>
                            <input type="text" id="link_da_bandeira" value={linkDaBandeira} onChange={(e) => setLinkDaBandeira(e.target.value)}/>
                        </fieldset>

                        <div className="btns">
                            <Link className="voltar" to="/admin-bandeiras">Voltar</Link>
                            <button className="submit">Cadastrar</button>
                        </div>

                    </AdminCustomForm>
                </div>
            </div>
        </main>
    );
}