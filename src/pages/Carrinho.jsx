import { CarrinhoEnderecos } from "../components/carrinhoEnderecos/CarrinhoEnderecos";
import { CarrinhoProdutos } from "../components/carrinhoProdutos/CarrinhoProdutos";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Pagamento } from "../components/pagamento/Pagamento";
import { WhiteBox } from "../components/whiteBox/WhiteBox";

export function Carrinho() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <WhiteBox>
                        <h3>Carrinho</h3>
                        <div className="d-flex flex-wrap">
                            <div className="col-12 col-xl-8 mb-2">
                                <CarrinhoProdutos/>
                                <CarrinhoEnderecos/>
                            </div>
                            <div className="col-12 col-xl-4 mb-2">
                                <Pagamento/>
                            </div>
                        </div>
                    </WhiteBox>
                </div>
            </main>
            <Footer/>
        </>
    );
}