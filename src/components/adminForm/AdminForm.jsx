import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../contexts/AuthContext';
import './style.scss';

export function AdminForm() {
    const navigate = useNavigate();

    const { handleLogin } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();
        try{
            const response = await handleLogin(email, password)
            toast(response.message);
            if (response.status === 201) {
                navigate('/admin-dashboard');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
    return (
        <div className="admin-form" onSubmit={(e) => login(e)}>
             <form>

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
                 
                 <button type="submit">Login</button>
                 
             </form>
        </div>
    );
}