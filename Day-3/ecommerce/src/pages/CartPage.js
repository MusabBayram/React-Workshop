import React from 'react';
import CartContext from '../context/CartContext';
import { Button, Container, Table } from 'reactstrap';

function CartPage() {
    const { cart, removeFromCart, clearCart, updateQuantity } = React.useContext(CartContext);
    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

    return (
        <Container>
            <h2>Shopping Cart</h2>
            {cart.length > 0 ? (
                <>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.title} style={{ width: '100px', height: 'auto' }} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        <Button onClick={() => updateQuantity(product.id, -1)}>-</Button>
                                        <span className='mx-2'>{product.quantity}</span>
                                        <Button onClick={() => updateQuantity(product.id, 1)}>+</Button>
                                    </td>
                                    <td>
                                        <Button color='danger' onClick={() => removeFromCart(product.id)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4>Total: ${totalPrice}</h4>
                        <Button color='danger' onClick={clearCart}>Clear Cart</Button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </Container>
    );
}

export default CartPage;