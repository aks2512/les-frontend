import { useEffect, useState } from 'react';
import api from '../../api';
import { Produto } from './partials/Produto';
import './style.scss';

export function Produtos() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products');
            console.log(response);
            if(response.status === 200) {
                setProducts(response.data.results);
                setLoading(false);
            }
        }

        loadProducts();

    }, [])

    return (
        <section className="produtos container">
            {loading === false && (
                products.map( (product) => (
                    <Produto key={product.id} id={product.id} name={product.name} price={product.price} />
                ))
            )}
        </section>
    );
}