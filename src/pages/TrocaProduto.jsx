// import { Link } from "react-router-dom";

// import api from "../api/index";

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import pedido from '../assets/imgs/pedido.svg';

export function TrocaProduto() {

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
                                            <tr>
                                                <td>xxxxxxxxxxx</td>
                                                <td>Entregue</td>
                                                <td>239,40</td>
                                            </tr>
                                            <tr>
                                                <td>xxxxxxxxxxx</td>
                                                <td>Entregue</td>
                                                <td>239,40</td>
                                            </tr>
                                            <tr>
                                                <td>xxxxxxxxxxx</td>
                                                <td>Entregue</td>
                                                <td>239,40</td>
                                            </tr>
                                            <tr>
                                                <td>xxxxxxxxxxx</td>
                                                <td>Entregue</td>
                                                <td>239,40</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                

                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}