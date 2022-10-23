

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

export function MeusPedidos() {
    const [purchases, setPurchases] = useState([]);
    const [modal, setModal] = useState(false);
    const [newRefund, setNewRefund] = useState({});

    async function loadPurchases() {
        try {
            const response = await api.get(`purchases`);
            setPurchases(response.data);
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
                            </WhiteBox>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modal} onClose={(e) => setModal(!modal)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">#{
                                `${newRefund.product && newRefund.product.id} - ${newRefund.product && newRefund.product.name}`
                            }</h5>
                        </div>
                        <div className="modal-body">
                            <div className="item">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="img-container">
                                            <img src={"http://localhost:3333/files/" + (newRefund.product?.image || 'default.png')} alt="" />
                                        </div>

                                    </div>
                                    <div className="item-details">
                                        <p>{newRefund.product?.description}</p>
                                        <p>Quantidade: {newRefund.quantity}</p>
                                        <p>Valor: R$ {newRefund.price}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="refund-details group">
                                    <div className="row">
                                        <fieldset className="p50">
                                            <label htmlFor="reason">Motivo da troca</label>
                                            <textarea className="long-text" type="text" name="reason" onChange={(e) => setNewRefund({ ...newRefund, reason: e.target.value })} id="" />
                                        </fieldset>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={(e) => refundItem(e)}>
                                    Criar pedido de troca
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </main>
            <Footer />
        </>
    );
}