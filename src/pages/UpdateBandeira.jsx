import { useState } from "react";

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function UpdateBandeira() {
    const [nomeDaBandeira, setNomeDaBandeira] = useState('');
    const [linkDaBandeira, setLinkDaBandeira] = useState('');

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminCustomForm>
                        <h4>Editar Bandeira</h4>

                        <fieldset>
                            <label htmlFor="nome_da_bandeira">Nome da Bandeira</label>
                            <input type="text" id="nome_da_bandeira" value={nomeDaBandeira} onChange={(e) => setNomeDaBandeira(e.target.value)}/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="link_da_bandeira">Link da Bandeira</label>
                            <input type="text" id="link_da_bandeira" value={linkDaBandeira} onChange={(e) => setLinkDaBandeira(e.target.value)}/>
                        </fieldset>

                        <div className="btns">
                            <button className="voltar">Voltar</button>
                            <button className="submit">Atualizar</button>
                        </div>

                    </AdminCustomForm>
                </div>
            </div>
        </main>
    );
}