import { Produto } from './partials/Produto';
import './style.scss';

export function Produtos() {
    return (
        <section className="produtos container">
            <Produto/>
            <Produto/>
            <Produto/>
            <Produto/>
            <Produto/>
            <Produto/>
            <Produto/>
            <Produto/>
        </section>
    );
}