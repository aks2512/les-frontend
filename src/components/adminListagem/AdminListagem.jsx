import { useState } from "react";
import { Link } from "react-router-dom";

import './style.scss';

export function AdminListagem(props) {
    const [search, setSearch] = useState('');
    return (
        <div className="admin-listagem">
            <h4>{props.title}</h4>
            <div className="crud">
                <Link to="/">Cadastrar</Link>

                <fieldset>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button>Filtrar</button>
                </fieldset>

                <table>

                    <tbody>

                        <tr>
                            <td>xxxxxxxxxx</td>
                            <td><Link to="/">Editar</Link></td>
                            <td><button>Remover</button></td>
                        </tr>
                        <tr>
                            <td>xxxxxxxxxx</td>
                            <td><Link to="/">Editar</Link></td>
                            <td><button>Remover</button></td>
                        </tr>
                        <tr>
                            <td>xxxxxxxxxx</td>
                            <td><Link to="/">Editar</Link></td>
                            <td><button>Remover</button></td>
                        </tr>
                        <tr>
                            <td>xxxxxxxxxx</td>
                            <td><Link to="/">Editar</Link></td>
                            <td><button>Remover</button></td>
                        </tr>
                        
                    </tbody>

                </table>
            </div>
        </div>
    );
}