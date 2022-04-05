import { Comentarios } from "../components/comentarios/Comentarios";
import { Detalhes } from "../components/detalhes/Detalhes";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function ProdutoDetalhes() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Detalhes/>
                    <Comentarios/>
                </div>
            </main>
            <Footer/>
        </>
    );
}