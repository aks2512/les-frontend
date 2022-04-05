import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Produtos } from "../components/produtos/Produtos";
import { Titulo } from "../components/titulo/Titulo";

export function Result() {
    return (
        <>
            <Header/>
            <main>
                <Titulo title="Resultado da pesquisa"/>
                <Produtos/>
            </main>
            <Footer/>
        </>
    );
}