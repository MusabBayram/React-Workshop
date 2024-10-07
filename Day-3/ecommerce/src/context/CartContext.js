import React, { createContext, useState } from "react";
import alertify from 'alertifyjs';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Ürün zaten varsa, miktarını artır
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Ürün yoksa, sepete ekle ve miktarı 1 olarak ayarla
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alertify.success(`${product.title} added to cart`);
    };

    const updateQuantity = (id, quantity) => {
        setCart(prevCart => {
            return prevCart.map(item => 
                item.id === id ? { ...item, quantity: Math.max(item.quantity + quantity, 1) } : item
            );
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(product => product.id !== id));
        alertify.error('Product removed from cart');
    };

    const clearCart = () => {
        setCart([]);
        alertify.error('Cart cleared.');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;