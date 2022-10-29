// import { Link } from "react-router-dom";

// import api from "../api/index";

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import pedido from '../assets/imgs/pedido.svg';
import { toast } from "react-toastify";
import api from "../api";
import { useEffect, useState } from "react";

export function TrocaProduto() {
    const [refunds, setRefunds] = useState([]);

    async function loadRefunds() {
        try {
            const response = await api.get(`refunds`);
            setRefunds(response.data);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Falha ao carregar pedidos');
        }
    }

    useEffect(() => {
        loadRefunds();
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

                                <div className="table-container">
                                    <table className="odd">
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Status</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                refunds?.map((refund, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{refund.cart_item.product.name}</td>
                                                            <td>{refund.status}</td>
                                                            <td>R$ {refund.cart_item.price}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>


                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}