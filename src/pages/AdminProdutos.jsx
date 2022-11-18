import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";
import { Pagination } from "../components/pagination/Pagination";

export function AdminProdutos() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProducts();
    }, [])

    async function loadProducts(page = 1, limit = 6) {
        const response = await api.get(`/products?search=${search}&page=${page}&limit=${limit}`);
        if (response.status === 201) {
            console.log(Math.ceil(response.data.total / response.data.limit))
            setProducts(response.data.results);
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
            setLoading(false);
        }
    }

    async function deleteProduct(e, id) {
        e.preventDefault();
        try {
            const response = await api.delete('/products/' + id);
            toast('Deletado com sucesso')
            loadProducts();
        } catch (error) {
            toast.error(error?.message)
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
                        title="Produtos"
                        hasRegisterLink={true}
                        registerLink="/register-produto"
                        search={search}
                        setSearch={setSearch}
                        onClick={loadProducts}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                    <td className="small">{product.id}</td>
                                    <td><img width="100" height="80" src={product.image_url} alt="" /></td>
                                    <td>{product.name}</td>
                                    <td className="btn"><Link to={'/update-produto?id=' + product.id}>Editar</Link></td>
                                    <td className="btn"><button onClick={(e) => deleteProduct(e, product.id)}>Excluir</button></td>
                                </tr>
                            )
                            )}
                        </tbody>

                    </AdminListagem>
                    <Pagination
                        totalPages={totalPages}
                        func={loadProducts}
                    />
                </div>
            </div>
        </main>
    );
}