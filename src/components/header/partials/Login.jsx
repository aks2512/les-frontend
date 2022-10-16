import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../contexts/AuthContext';
import login from '../../../assets/imgs/login.svg';

export function Login() {
    const { authenticated, user } = useContext(Context)

    function checkAuthentication() {
        if (authenticated) {
            if (user?.person) {
                return (
                    <div className="content">
                        <Link to="/meu-perfil">Meu Perfil</Link>
                    </div>
                )
            } else {
                return (
                    <div className="content">
                        <Link to="/signin">Não autorizado</Link>
                    </div>
                )
            }
        }

        return (
            <div className="content">
                <Link to="/signin">Faça login</Link>
            </div>
        )
    }

    return (
        <div className="login">

            {checkAuthentication()}

            <div className="image">
                <img src={login} alt="login access" />
            </div>
        </div>
    );
}