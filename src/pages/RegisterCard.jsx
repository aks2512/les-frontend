
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Titulo } from '../components/titulo/Titulo';
import { CardForm } from '../components/cardForm/CardForm';

export function RegisterCard() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Cadastrar cartão"/>
                    <CardForm />
                </div>
            </main>
            <Footer/>
        </>
    );
}