import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminProdutos() {
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

    async function deleteProduct(e, id) {
        e.preventDefault();
        const response = await api.delete(`/products/${id}`);

        console.log(response);

        if(response.status === 200) {
            setProducts(products.filter(product => product.id !== id));
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
                        title="Produtos"
                        hasRegisterLink={true}
                        registerLink="/register-produto"
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
                                        <td><img width="100" src={product.image_url} alt="" /></td>
                                        <td>{product.name}</td>
                                        <td className="btn"><Link to={'/update-produto?id='+product.id}>Editar</Link></td>
                                        <td className="btn"><button onClick={(e) => deleteProduct(e, product.id)}>Excluir</button></td>
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