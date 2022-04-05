import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Produtos } from "../components/produtos/Produtos";
import { Titulo } from "../components/titulo/Titulo";

export function ProdutosCategorizados() {
    return (
        <>
            <Header/>
            <main>
                <Titulo title="Playstation 3"/>
                <Produtos/>
            </main>
            <Footer/>
        </>
    );
}