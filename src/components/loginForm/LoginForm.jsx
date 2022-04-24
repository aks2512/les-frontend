import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { Popup1 } from "../popup1/popup";
import "./style.scss";

export function LoginForm() {
    const navigate = useNavigate();

    const { handleLogin } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [popupText, setPopupText] = useState('');

    function closePopup(e) {
        e.preventDefault();
        setPopupIsOpen(false);
    }

    function login(e) {
        e.preventDefault();
        let isLogin = handleLogin(email, password);
        if(isLogin === true)
            setPopupText('Login realizado com sucesso!');
        setPopupIsOpen(true);
    }

    return (
        <>
            <form className="login-form" onSubmit={(e) => login(e)}>
                <h3>Já sou cadastrado</h3>

                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="password">Senha</label>
                    <input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </fieldset>

                <button type="submit">Entrar</button>

            </form>
            {popupIsOpen &&
                (<Popup1
                    title="Login"
                    text={popupText}
                    button="Ok"
                    close={closePopup}
                />)
            }
        </>
    );
}