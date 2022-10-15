import { useParams } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Produtos } from "../components/produtos/Produtos";
import { Titulo } from "../components/titulo/Titulo";

export function Result() {
    const { search } = useParams()
    return (
        <>
            <Header/>
            <main>
                <Titulo title="Resultado da pesquisa"/>
                <Produtos search={search}/>
            </main>
            <Footer/>
        </>
    );
}