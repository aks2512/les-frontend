import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { AddressForm } from '../components/addressForm/AddressForm';

export function RegisterAddress() {
    return (
        <>
            <Header/>
            <main>
                <AddressForm />
            </main>
            <Footer/>
        </>
    );
}