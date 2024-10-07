import React, { useEffect, useState, useContext } from 'react';
import { Container, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams(); // URL'den ürün ID'sini al
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <Container>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{ width: '300px', height: 'auto' }} />
            <p>${product.price}</p>
            <p>{product.description}</p>
            <Button color='primary' onClick={() => addToCart(product)}>Add to Cart</Button>
        </Container>
    );
}

export default ProductDetail;