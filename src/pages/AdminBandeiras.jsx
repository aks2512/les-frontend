import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminBandeiras() {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState();

    useEffect(() => {
        async function loadBrands() {
            const response = await api.get('/brands/index');
            console.log(response);
            if(response.status === 200) {
                setBrands(response.data.results);
                setLoading(false);
            }
        }

        loadBrands();

    }, [])

    async function deleteBrand(e, id) {
        e.preventDefault();
        const response = await api.delete('/brands/' + id);

        console.log(response);

        if(response.status === 200) {
            setBrands(brands.filter(brand => brand.id !== id));
        }
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem 
                        title="Bandeiras"
                        hasRegisterLink={true}
                        registerLink="/register-bandeira"
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
                                        <td><img width="20" src={brand.image} alt="" /></td>
                                        <td>{brand.name}</td>
                                        <td className="btn"><Link to={'/update-bandeira?id='+brand.id}>Editar</Link></td>
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