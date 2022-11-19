import { useEffect, useState } from 'react';
import api from '../../api';
import { Pagination } from '../pagination/Pagination';
import { Produto } from './partials/Produto';
import './style.scss';

export function Produtos({ search = '' }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [totalPages, setTotalPages] = useState(0);


    async function loadProducts(page = 1, limit = 12) {
        const response = await api.get(`/products?search=${search}&page=${page}&limit=${limit}`);
        if (response.status === 201) {
            setProducts(response.data.results);
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
            setLoading(false);
        }
    }


    useEffect(() => {
        loadProducts();
    }, [search])

    return (
        <>
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
            <Pagination
                totalPages={totalPages}
                func={loadProducts}
            />
        </>
    );
}