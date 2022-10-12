

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import pedido from '../assets/imgs/pedido.svg';
import { toast } from "react-toastify";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";

export function MeusPedidos() {
    const [purchases, setPurchases] = useState([]);

    async function loadPurchases() {
        try {
            const response = await api.get(`purchases`);
            setPurchases(response.data);
        } catch(err) {
            toast.error(err.response.data.message || 'Falha ao carregar pedidos');
        }
    }

    useEffect(() => {
        loadPurchases();
    }, [])
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <SideMenu/>
                        </div>
                        <div className="col-12 col-lg-8">
                            <WhiteBox>
                                <div className="title">
                                    <img src={pedido} alt="" />
                                    <h4>Pedidos</h4>
                                </div>
                                    { purchases.map((purchase, index) => {
                                        return (<>
                                            <div className={`accordion ${purchase.selected ? '' : 'collapsed'}`}>
                                                <input className="accordion-radio" id="accordion-radio" type="checkbox" onChange={(e) => {
                                                    const newPurchases = purchases.slice();
                                                    newPurchases[index].selected= e.target.checked;
                                                    setPurchases(newPurchases);
                                                }}/>
                                                <label htmlFor="accordion-radio" className="accordion-header">
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
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        { purchase.cart.items.map((item => {
                                                            return (
                                                                <tr>
                                                                    <td>{item.product.name}</td>
                                                                    <td>R$ {item.price}</td>
                                                                    <td className="amount">{item.quantity}</td>
                                                                    <td>trocar</td>
                                                                    <td>cancelar</td>
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
            </main>
            <Footer/>
        </>
    );
}