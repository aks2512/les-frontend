

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

import pedido from '../assets/imgs/pedido.svg';

export function MeusPedidos() {

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

                                <div className="accordion">
                                    <input className="accordion-radio" id="accordion-radio" type="checkbox" />
                                    <label htmlFor="accordion-radio" className="accordion-header">
                                        <div>Pedido: xxxxxxxxxxx</div>
                                        <div>Status: entregue</div>
                                        <div>R$ 49,90</div>
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
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td className="amount">5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td className="amount">5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td className="amount">5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion">
                                    <input className="accordion-radio" id="accordion-radio2" type="checkbox" />
                                    <label htmlFor="accordion-radio2" className="accordion-header">
                                        <div>Pedido: xxxxxxxxxxx</div>
                                        <div>Status: entregue</div>
                                        <div>R$ 49,90</div>
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
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td>5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td>5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                    <tr>
                                                        <td>xxxxxxx</td>
                                                        <td>R$ 49,90</td>
                                                        <td>5</td>
                                                        <td>trocar</td>
                                                        <td>cancelar</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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