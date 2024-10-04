import React from 'react';
import alertify from 'alertifyjs';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ProductCart = ({ product, onAddToCart }) => {
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Karta tıklarken sepete ekle butonu tıklanırken detay sayfasına gitme
    onAddToCart(product);
    alertify.success(`${product.name} sepete eklendi!`);
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card style={{ margin: '10px', cursor: 'pointer' }} onClick={handleCardClick}>
      <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardText>{product.description}</CardText>
        <CardText>{product.price} ₺</CardText>
        <Button onClick={handleAddToCart} color='success'>Sepete Ekle</Button>
      </CardBody>
    </Card>
  );
};

export default ProductCart;