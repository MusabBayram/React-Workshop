import React from 'react';
import alertify from 'alertifyjs';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const Cart = ({ cartItems, onRemoveFromCart, onClearCart, onAddToCart, onDecreaseQuantity }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (item) => {
    onRemoveFromCart(item);
    alertify.error(`${item.name} sepetten çıkarıldı!`);
  };

  const handleClearCart = () => {
    onClearCart();
    alertify.error('Sepet boşaltıldı!');
  };

  return (
    <div>
      <h3>Sepet</h3>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş</p>
      ) : (
        <div>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroupItem key={item.id}>
                {item.name} - {item.price} TL - Adet: {item.quantity}
                <Button color='success' onClick={() => onAddToCart(item)} className='btn btn-sm mx-2'>+</Button>
                <Button color='warning' onClick={() => onDecreaseQuantity(item)} className='btn btn-sm'>-</Button>
                <Button
                  color='danger'
                  onClick={() => handleRemoveFromCart(item)}
                  style={{ float: 'right' }}
                  className='btn btn-sm'
                >
                  Kaldır
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
          <h4 className='mt-5'>Toplam: {totalPrice} TL</h4>
          <Button color='danger' onClick={() => handleClearCart()}>Sepeti Boşalt</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;