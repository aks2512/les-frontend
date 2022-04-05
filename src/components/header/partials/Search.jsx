import { Link } from 'react-router-dom';
import search from '../../../assets/imgs/search.svg';

export function Search() {
    return (
        <fieldset className="search">
            <input 
                id="search" 
                type="text"
                placeholder="Faça sua pesquisa aqui_"
            />
            <Link to="/result">
                <img src={search} alt="Button to research products" />
            </Link>
        </fieldset>
    );
}