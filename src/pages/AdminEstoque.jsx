import { useEffect, useState } from "react";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminEstoque() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products');
            console.log(response);
            if(response.status === 200) {
                setProducts(response.data.results);
                setLoading(false);
            }
        }

        loadProducts();

    }, [])

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem 
                        title="Estoque"
                        registerLink="/register-estoque"
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

                            {loading === false && products.map((product) => 
                                (
                                    <tr key={product.id}>
                                        <td><img width="100" src={product.image} alt="" /></td>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <input type="text" placeholder="adicionar ao estoque" />
                                            <div className="d-flex">
                                                <button>Adicionar</button>
                                                <button >Inativar</button>
                                            </div>
                                        </td>
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