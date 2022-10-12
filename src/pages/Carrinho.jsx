import { CartBody } from "../components/cartBody/CartBody";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Carrinho() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <CartBody />
                </div>
            </main>
            <Footer/>
        </>
    );
}