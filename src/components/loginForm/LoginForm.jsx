import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import "./style.scss";

export function LoginForm() {
    const navigate = useNavigate();

    const { handleLogin, handleLogout } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();
        try{
            const response = await handleLogin(email, password)

            toast(response);
            if (response.status === 201) {
                if(response.user.role != "usuario"){
                    toast.error('Apenas cliente pode utilizar essa função')
                    handleLogout();
                    return
                }
                navigate('/meu-perfil');
                return
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
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
        </>
    );
}