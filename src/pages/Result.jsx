import { useParams, useSearchParams } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Produtos } from "../components/produtos/Produtos";
import { Titulo } from "../components/titulo/Titulo";

export function Result() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    return (
        <>
            <Header />
            <main>
                <Titulo title="Resultado da pesquisa" />
                <Produtos search={search} />
            </main>
            <Footer />
        </>
    );
}