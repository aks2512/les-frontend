import { Link } from "react-router-dom";

import './style.scss';

export function SideMenu() {
    return (
        <div className="side-menu">
            <nav>
                <ul>
                    <li><Link to="/meu-perfil">Meu perfil</Link></li>
                    <li><Link to="/meus-pedidos">Meus pedidos</Link></li>
                    <li><Link to="/troca-produto">Troca de pedidos</Link></li>
                    <li><Link to="/">Sair</Link></li>
                </ul>
            </nav>
        </div>
    );
}