import { Link } from 'react-router-dom';
import login from '../../../assets/imgs/login.svg';

export function Login() {
    return (
        <Link to="/signin" className="login">
            <div className="content">
                <p>Login</p>
            </div>
            <div className="image">
                <img src={login} alt="login access" />
            </div>
        </Link>
    );
}