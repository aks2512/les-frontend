import { useEffect, useState } from 'react';
import api from '../../api';
import { Produto } from './partials/Produto';
import './style.scss';

export function Produtos({ search = '' }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();


    async function loadProducts() {
        const response = await api.get(`/products?search=${search}`);
        if (response.status === 201) {
            setProducts(response.data);
            setLoading(false);
        }
    }


    useEffect(() => {
        loadProducts();
    }, [search])

    return (
        <section className="produtos container">
            {loading === false && (
                products && products.length > 0 && products.map((product) => (
                    <Produto
                        key={product.id}
                        id={product.id}
                        imageURL={product.image_url}
                        name={product.name}
                        price={product.price}
                    />
                ))
            )}
        </section>
    );
}