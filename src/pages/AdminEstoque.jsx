import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminEstoque() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();

    useEffect(() => {
        loadProducts();
    }, [])

    async function loadProducts() {
        const response = await api.get('/products');
        if(response.status === 200) {
            setProducts(response.data);
            setLoading(false);
        }
    }

    const onNumericChange = (product, e) => {
        const { name, value } = e.target;
        product[name] = value.replace(/\D/g,'');
        e.target.value = product[name]
    };

    async function handleUpdateProduct(product){
        const { id } = product;
        try{
            const response = await api.put(`products/${id}`, product)
            toast('Atualizado com sucesso')
            loadProducts();
        }catch(error){
            toast.error(error?.message)
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

                            {loading === false && products.map((product, index) => 
                                (
                                    <tr key={product.id}>
                                        <td><img width="100" src={'http://localhost:3333/files/' + product.image} alt="" /></td>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <input type="text" name="stock" onChange={(e)=>{onNumericChange(product, e)}} placeholder="adicionar ao estoque" />
                                            <div className="d-flex">
                                                <button onClick={(e)=>{handleUpdateProduct(product)}}>Atualizar</button>
                                                {
                                                    product.isActive ? 

                                                    <button onClick={(e)=>{
                                                        product.isActive = false;
                                                        handleUpdateProduct(product)
                                                    }}>Inativar</button> :

                                                    <button onClick={(e)=>{
                                                        product.isActive = true;
                                                        handleUpdateProduct(product)
                                                    }}>Ativar</button>
                                                }
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