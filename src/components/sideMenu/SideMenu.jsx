import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";

import './style.scss';

export function SideMenu() {
    const { handleLogout } = useContext(Context);
    return (
        <div className="side-menu">
            <nav>
                <ul>
                    <li><Link to="/meu-perfil">Meu perfil</Link></li>
                    <li><Link to="/meus-pedidos">Meus pedidos</Link></li>
                    <li><Link to="/troca-produto">Troca de pedidos</Link></li>
                    <li><button onClick={() => handleLogout()}>Sair</button></li>
                </ul>
            </nav>
        </div>
    );
}