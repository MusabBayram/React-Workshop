import React, { useEffect, useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import CategoryContext from '../context/CategoryContext'; // Context'i ekledik
import ProductItem from '../components/ProductItem.js';
import { Col, Row } from 'reactstrap';

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = React.useContext(CartContext);
    const { selectedCategories } = useContext(CategoryContext); // Seçili kategoriler

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter(product =>
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
    );

    return (
        <div>
            <h1>Products</h1>
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Col sm="4" key={product.id} className='mb-4'>
                            <ProductItem product={product} addToCart={addToCart} />
                        </Col>
                    ))
                ) : (
                    <p>No products available in the selected categories</p>
                )}
            </Row>
        </div>
    );
}

export default ProductList;