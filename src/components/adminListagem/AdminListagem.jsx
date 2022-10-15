import { useState } from "react";
import { Link } from "react-router-dom";

import './style.scss';

export function AdminListagem(props) {
    return (
        <div className="admin-listagem">
            <h4>{props.title}</h4>
            <div className="crud">
                {props.hasRegisterLink && <Link to={props.registerLink}>Cadastrar</Link>}

                <fieldset>
                    <input type="text" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
                    <button onClick={props.onClick}>Filtrar</button>
                </fieldset>

                <table>{props.children}</table>
            </div>
        </div>
    );
}