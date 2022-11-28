

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import pedido from '../assets/imgs/pedido.svg';
import { toast } from "react-toastify";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "../components/modal/Modal";
import { Pagination } from "../components/pagination/Pagination";

export function MeusPedidos() {
    const [purchases, setPurchases] = useState([]);
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [newRefund, setNewRefund] = useState({});

    async function loadPurchases(page = 1, limit = 10) {
        try {
            const response = await api.get(`purchases?page=${page}&limit=${limit}`);
            setPurchases(response.data.results);
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Falha ao carregar pedidos');
        }
    }

    async function refundItem(e) {
        e.preventDefault();
        try {
            const response = await api.post(`/refunds`, {
                ...newRefund
            });
            toast(response.data.message);
            loadPurchases();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Falha abrir pedido de troca');
        }
    }

    useEffect(() => {
        loadPurchases();
    }, [])
    return (
        <>
            <Header />
            <main>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <SideMenu />
                        </div>
                        <div className="col-12 col-lg-8">
                            <WhiteBox>
                                <div className="title">
                                    <img src={pedido} alt="" />
                                    <h4>Pedidos</h4>
                                </div>
                                {purchases.map((purchase, index) => {
                                    return (<>
                                        <div className={`accordion ${purchase.selected ? '' : 'active'}`}>
                                            <input className="accordion-radio" id={`accordion-radio-${index}`} type="checkbox" onChange={(e) => {
                                                const newPurchases = purchases.slice();
                                                newPurchases[index].selected = e.target.checked;
                                                setPurchases(newPurchases);
                                            }} />
                                            <label htmlFor={`accordion-radio-${index}`} className="accordion-header">
                                                <div>Pedido: {purchase.id}</div>
                                                <div>Status: {purchase.status}</div>
                                                <div>R$ {purchase.total_price}</div>
                                            </label>
                                            <div className="accordion-body">
                                                <div className="table-container">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Produto</th>
                                                                <th>Valor</th>
                                                                <th>Quantidade</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {purchase.cart && purchase.cart.items.map((item => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.product.name}</td>
                                                                        <td>R$ {item.price}</td>
                                                                        <td className="amount">{item.quantity}</td>
                                                                        <td><button className="bnt btn-trocar" onClick={(e) => {
                                                                            setModal(!modal)
                                                                            setNewRefund({ ...item })
                                                                        }}>Trocar</button></td>
                                                                    </tr>
                                                                )
                                                            }))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )
                                })}
                                <Pagination
                                    totalPages={totalPages}
                                    func={loadPurchases}
                                />
                            </WhiteBox>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modal} on>
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="exampleModalLabel">#{
                                `${newRefund.product && newRefund.product.id} - ${newRefund.product && newRefund.product.name}`
                            }</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {
                                setModal(!modal)
                            }}></button>
                        </div>
                        <div className="modal-body">
                            <div className="item">
                                <div className="container row">
                                    <div className="col-md-12 container text-center">
                                        <img width="35%" src={newRefund.product?.image_url} alt="" />
                                    </div>
                                    <div className="col-md-12 container">
                                        <h5>Descrição</h5>
                                        <p>{newRefund.product?.description}</p>
                                    </div>
                                    <div className="col-md-12  col-sm-12 row">
                                        <div className="col-md-8 col-sm-12">
                                            <h5>Detalhes do Produto</h5>

                                            <p><strong>Publicadora: </strong>{newRefund.product?.publisher}</p>
                                            <p><strong>Desenvolvedora: </strong>{newRefund.product?.developer}</p>
                                            <p><strong>Lançamento: </strong>{newRefund.product?.release_date}</p>
                                            <p><strong>Idioma: </strong>{newRefund.product?.language}</p>
                                            <p><strong>Legenda: </strong>{newRefund.product?.subtitle}</p>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <h5>Detalhes da Compra</h5>
                                            <p>Quantidade: {newRefund.quantity}</p>
                                            <p>Valor: R$ {newRefund.price}</p>
                                            {
                                                newRefund.refund ? <p><strong>Devolução: </strong> {newRefund.refund.status}</p> : ''}
                                        </div>
                                    </div>
                                    <div className="col-md-12 container">
                                        <fieldset>
                                            <label htmlFor="reason">Motivo da troca</label>
                                            <textarea className="long-text" type="text" name="reason" onChange={(e) => setNewRefund({ ...newRefund, reason: e.target.value })} id="" />
                                        </fieldset>
                                        <button type="button" className="btn btn-primary" onClick={(e) => refundItem(e)}>
                                            Criar pedido de troca
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal>
            </main>
            <Footer />
        </>
    );
}