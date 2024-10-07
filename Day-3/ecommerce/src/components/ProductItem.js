import React from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için useNavigate kullanımı
import './ProductItem.css';

function ProductItem({ product, addToCart }) {
    const navigate = useNavigate();

    return (
        <Card className='product-card' onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
            <CardImg top width="100%" src={product.image} alt={product.title} className='product-img' />
            <CardBody className='d-flex flex-column'>
                <CardTitle tag="h5" className='product-title'>{product.title}</CardTitle>
                <CardText className='product-text'>${product.price.toFixed(2)}</CardText>
                <Button onClick={(e) => { 
                    e.stopPropagation(); // Kartın tıklanmasını engeller
                    addToCart(product); 
                }} color='primary' className='ml-auto'>Add to Cart</Button>
            </CardBody>
        </Card>
    );
}

export default ProductItem;