import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { AddressForm } from '../components/addressForm/AddressForm';

export function RegisterAddress() {
    return (
        <>
            <Header/>
            <main>
                <div className='container py-7'>
                    <AddressForm />
                </div>
            </main>
            <Footer/>
        </>
    );
}