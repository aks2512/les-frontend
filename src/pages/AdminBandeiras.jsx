import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminBandeiras() {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [search, setSearch] = useState("");

    async function loadBrands() {
        const response = await api.get(`/brands?search=${search}`);
        if (response.status === 201) {
            setBrands(response.data);
            setLoading(false);
        }
        console.log(response.data);
    }

    useEffect(() => {
        loadBrands();
    }, [])

    async function deleteBrand(e, id) {
        e.preventDefault();
        try {
            const response = await api.delete('/brands/' + id);
            toast('Deletado com sucesso')
            loadBrands();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu />
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem
                        title="Bandeiras"
                        hasRegisterLink={true}
                        registerLink="/register-bandeira"
                        search={search}
                        setSearch={setSearch}
                        onClick={loadBrands}
                    >
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Nome</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {loading === false && brands.map((brand) =>
                            (
                                <tr key={brand.id}>
                                    <td><img width="100" src={brand.image_url} alt="" /></td>
                                    <td>{brand.name}</td>
                                    <td className="btn"><Link to={'/update-bandeira?id=' + brand.id}>Editar</Link></td>
                                    <td className="btn"><button onClick={(e) => deleteBrand(e, brand.id)}>Excluir</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </AdminListagem>
                </div>
            </div>
        </main>
    );
}