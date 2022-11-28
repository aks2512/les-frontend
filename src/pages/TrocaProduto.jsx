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
import { Pagination } from "../components/pagination/Pagination";

export function TrocaProduto() {
    const [refunds, setRefunds] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    async function loadRefunds(page = 1, limit = 10) {
        try {
            const response = await api.get(`refunds?page=${page}&limit=${limit}`);
            setRefunds(response.data.results);
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
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
                                <Pagination
                                    totalPages={totalPages}
                                    func={loadRefunds}
                                />
                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}