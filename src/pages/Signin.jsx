import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { LoginForm } from '../components/loginForm/LoginForm';
import { SignupInformation } from '../components/signupInformation/SignupInformation';
import { Titulo } from '../components/titulo/Titulo';

export function Signin() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <Titulo title="Sign In"/>
                    <div className="row justify-content-center align-items-start">
                        <div className="col-12 col-md-6">
                            <LoginForm/>
                        </div>
                        <div className="col-12 col-md-6">
                            <SignupInformation/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}