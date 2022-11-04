import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api";

import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";
import { Modal } from "../components/modal/Modal";
import { ProdutoDetalhes } from "../components/produtoDetalhes/ProdutoDetalhes";

export function AdminEstoque() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState({ show: false, product: {} });
    const [modalReason, setModalReason] = useState({ show: false, reason: {} });

    useEffect(() => {
        loadProducts();
    }, [])

    async function loadProducts() {
        const response = await api.get(`/products?search=${search}`);
        if (response.status === 201) {
            setProducts(response.data);
            setLoading(false);
            setModal({ show: false, product: {} })
        }
    }

    const onNumericChange = (product, e) => {
        const { name, value } = e.target;
        product[name] = value.replace(/\D/g, '');
        e.target.value = product[name]
    };

    async function handleUpdateProduct(product) {
        const { id } = product;
        try {
            await api.put(`products/${id}`, product)
            toast('Atualizado com sucesso')
            loadProducts();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Erro ao atualizar estoque');
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
                        title="Estoque"
                        registerLink="/register-estoque"
                        search={search}
                        setSearch={setSearch}
                        onClick={loadProducts}
                    >
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Nome</th>
                                <th>Estoque</th>
                                <th>Histórico</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {loading === false && products.map((product, index) =>
                            (
                                <tr key={product.id}>
                                    <td className="small"><img width="100" src={'http://localhost:3333/files/' + product.image} alt="" /></td>
                                    <td>{product.name}</td>
                                    <td className="small">{product.stock}</td>
                                    <td>
                                        {/* {
                                            product.history.length > 0 &&
                                            `${product.history[0]?.action} - ${product.history[0]?.reason}`
                                        } */}
                                        <select name="" id="" onChange={(e) => {
                                            if (e.target.value < 0) return;
                                            setModalReason({ show: true, reason: product.history[e.target.value] })
                                        }}>
                                            <option key={0} value={-1}>
                                                Selecione a data de alteração
                                            </option>
                                            {product.history.length > 0 && product.history.map((history, index) => {
                                                let date = history.created_at.split('T')[0];
                                                return <option key={index} value={index}>
                                                    {date}-{history.action}
                                                </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" name="stock" onChange={(e) => { onNumericChange(product, e) }} placeholder="adicionar ao estoque" />
                                        <div className="d-flex">
                                            <button onClick={(e) => { handleUpdateProduct({ ...product, isActive: undefined }) }}>Atualizar</button>
                                            <button onClick={(e) => {
                                                setModal({ show: true, product })
                                            }}>{product?.isActive ? 'Inativar' : 'Ativar'}</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </AdminListagem>
                </div>
            </div>
            <Modal
                isOpen={modal.show}
                onClose={() => setModal({ show: false, product: {} })}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {`
                                #${modal?.product?.id} - ${modal?.product?.name} - 
                                (${modal.product?.isActive ? 'Inativar' : 'Ativar'})
                            `}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div className="container row">
                            <ProdutoDetalhes product={modal.product} />
                            <div className="col-md-12">
                                <h4>Motivo:</h4>
                                <textarea value={modal.product.reason} onChange={(e) => {
                                    setModal({
                                        show: true,
                                        product: {
                                            ...modal.product, reason: e.target.value
                                        }
                                    })
                                }} />
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer container">
                        <div className="btns">
                            <button
                                className="btn_update_status"
                                onClick={(e) => {
                                    modal.product.isActive = !modal.product.isActive;
                                    handleUpdateProduct(modal.product);
                                }}
                            >{modal.product?.isActive ? 'Inativar' : 'Ativar'}</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalReason.show}
                onClose={() => setModalReason({ show: false, reason: {} })}
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="container row">
                            <div className="col-md-6">
                                <h3>Ação</h3>
                                <p>{modalReason.reason?.action}</p>

                                <h3>Data</h3>
                                <p>{modalReason.reason?.created_at?.split('T')[0]}</p>
                            </div>


                            <h3>Motivo</h3>
                            <p>{modalReason.reason?.reason}</p>

                        </div>
                    </div>
                </div>
            </Modal>
        </main>
    );
}