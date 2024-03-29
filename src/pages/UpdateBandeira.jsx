import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function UpdateBandeira() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [nomeDaBandeira, setNomeDaBandeira] = useState('');
    const [linkDaBandeira, setLinkDaBandeira] = useState('');

    async function loadData() {
        if (id) {
            const response = await api.get(`/brands/${id}`);

            console.log(response);
            setNomeDaBandeira(response.data.name);
            setLinkDaBandeira(response.data.image.split("/")[3]);
        } else {
            navigate('/admin-bandeiras');
        }
    }

    async function updateBrand(e) {
        e.preventDefault();

        const fd = new FormData();

        if (linkDaBandeira) {
            fd.append('image', linkDaBandeira, linkDaBandeira.name);
        }
        fd.append('name', nomeDaBandeira);

        try {
            await api.put(`/brands/${id}`, fd,
                {
                    onUploadProgress: progressEvent => {
                        console.log(Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
                    }
                }
            );

            toast('Atualizado com sucesso');
        } catch (err) {
            toast(err?.response?.data?.message || 'Erro ao atualizar a bandeira');
        }

    }

    useEffect(() => {
        loadData();
    }, [id]);

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu />
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminCustomForm onSubmit={updateBrand}>
                        <h4>Editar Bandeira</h4>

                        <fieldset>
                            <label htmlFor="nome_da_bandeira">Nome da Bandeira</label>
                            <input type="text" id="nome_da_bandeira" value={nomeDaBandeira} onChange={(e) => setNomeDaBandeira(e.target.value)} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="link_da_bandeira">Link da Bandeira</label>
                            <input type="file" id="link_da_bandeira"
                                onChange={(e) => setLinkDaBandeira(e.target.files[0])} />
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