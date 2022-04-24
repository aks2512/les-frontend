import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import { BannerSlider } from '../components/bannerSlider/BannerSlider';
import { Destaques } from '../components/destaques/Destaques';
import { Titulo } from '../components/titulo/Titulo';
import { Produtos } from '../components/produtos/Produtos';

export function Home() {

    return (
        <>
            <Header />
            <main>
                <BannerSlider/>
                <Destaques/>
                <Titulo title="Home"/>
                <Produtos/>
            </main>
            <Footer />
        </>
    );
}