import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../../assets/imgs/search.svg';

export function Search() {
    const [search, setSearch] = useState('');
    return (
        <fieldset className="search">
            <input
                id="search"
                type="text"
                placeholder="Faça sua pesquisa aqui_"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={`/result?search=${search}`}>
                <img src={searchIcon} alt="Button to research products" />
            </Link>
        </fieldset>
    );
}