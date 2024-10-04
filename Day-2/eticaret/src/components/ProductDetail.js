import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/data.js';

const ProductDetail = () => {
  const { id } = useParams(); // URL'den ürün ID'sini al
  const product = products.find((item) => item.id === parseInt(id)); // Ürünü bul
  
  if (!product) {
    return <p>Ürün bulunamadı!</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p>Fiyat: {product.price} TL</p>
    </div>
  );
};

export default ProductDetail;