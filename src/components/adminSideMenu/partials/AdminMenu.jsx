import { Link } from "react-router-dom";

export function AdminMenu() {
    return (
        <nav className="admin-menu">
            <ul>
                <li><Link to="/admin-dashboard">Dashboard</Link></li>
                <li><Link to="/admin-produtos">Produtos</Link></li>
                <li><Link to="/admin-bandeiras">Bandeiras</Link></li>
                <li><Link to="/admin-trocas">Trocas</Link></li>
                <li><Link to="/admin-vendas">Vendas</Link></li>
                <li><Link to="/admin-estoque">Estoque</Link></li>
                <li><Link to="/admin-clientes">Clientes</Link></li>
            </ul>
        </nav>
    );
}