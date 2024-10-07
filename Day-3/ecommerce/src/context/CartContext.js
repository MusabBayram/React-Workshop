import React, { createContext, useState, useEffect } from "react";
import alertify from 'alertifyjs';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Sayfa yüklendiğinde localStorage daki sepeti al ve state e yükle
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart && cart.length === 0) { // Eğer `cart` boşsa localStorage dan yükle
                setCart(JSON.parse(storedCart));
                console.log('Cart loaded from localStorage:', JSON.parse(storedCart));
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }, []); 

    // cart değiştiğinde localStorage ı güncelle
    useEffect(() => {
        try {
            if (cart.length > 0) { // Eğer cart boş değilse localStorage ı güncelle
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log('Cart updated in localStorage:', cart);
            }
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
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

    // Toplam ürün sayısını hesapla (ürünlerin miktarına göre)
    const getTotalItemsCount = () => {
        return cart.reduce((total, product) => total + product.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotalItemsCount }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;