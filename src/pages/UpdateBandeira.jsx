import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function UpdateBandeira() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [nomeDaBandeira, setNomeDaBandeira] = useState('');
    const [linkDaBandeira, setLinkDaBandeira] = useState('');

    useEffect(() => {
        async function loadData() {
            const response = await api.get('/brands?id='+id);
            console.log(response.status)
            if(response.status === 201) {
                setNomeDaBandeira(response.data.name);
                setLinkDaBandeira(response.data.image);
            }
        }

        loadData();
    }, [id]);

    async function updateBrand(e) {
        e.preventDefault();
        console.log(nomeDaBandeira)
        const response = await api.put('/brands', {
            id: id,
            brand: {
                name: nomeDaBandeira,
                image: linkDaBandeira
            }
        });

        if(response.status === 201) {
            alert("Bandeira atualizada com sucesso!");
            console.log(response);
        }

    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminCustomForm onSubmit={updateBrand}>
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
                            <Link className="voltar" to="/admin-bandeiras">Voltar</Link>
                            <button className="submit">Atualizar</button>
                        </div>

                    </AdminCustomForm>
                </div>
            </div>
        </main>
    );
}