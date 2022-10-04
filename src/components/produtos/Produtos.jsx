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
            if(response.status === 201) {
                console.log(response)
                setProducts(response.data);
                setLoading(false);
            }
        }

        loadProducts();

    }, [])

    return (
        <section className="produtos container">
            {loading === false && (
                products.map( (product) => (
                    <Produto 
                        key={product.id} 
                        id={product.id} 
                        imageURL={'http://localhost:3333/files/' + product.image} 
                        name={product.name} 
                        price={product.price} 
                    />
                ))
            )}
        </section>
    );
}