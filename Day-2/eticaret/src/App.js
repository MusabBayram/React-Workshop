import React, { useState, useEffect } from 'react';
import { Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './components/Cart.js';
import CategoryList from './components/CategoryList.js';
import ProductList from './components/ProductList.js';
import { categories, products } from './data/data.js';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState(() => {
    // Sayfa yüklendiğinde localStorage'dan sepeti yükle
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  // Sepeti yükleme
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sepeti kaydetme
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //Sepete ürün ekleme
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
  
      //Sepette var olan ürünün adetini güncelleme
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //Sepetteki ürün adetini değiştirme
  const handleDecreaseQuantity = (product) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  //Sepetten ürün çıkartma
  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  //Sepeti boşaltma
  const handleClearCart = () => {
    setCart([]);
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.categoryId === selectedCategory.id) : products;

  return (
    <Router>
      <Container>
        <Navbar color="light" expand="md">
          <NavbarBrand tag={Link} to="/">E-Ticaret</NavbarBrand>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to="/Cart">Sepet ({cart.length})</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path='/'
            element={
              <Row>
                <Col sm="4">
                  <CategoryList categories={categories} onSelectedCategory={setSelectedCategory}></CategoryList>
                </Col>
                <Col sm="8">
                  <ProductList products={filteredProducts} onAddToCart={handleAddToCart}></ProductList>
                </Col>
              </Row>
            }
          />
          <Route
            path='/cart'
            element={
              <Cart 
                cartItems={cart} 
                onRemoveFromCart={handleRemoveFromCart} 
                onClearCart={handleClearCart} 
                onAddToCart={handleAddToCart} 
                onDecreaseQuantity={handleDecreaseQuantity} 
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;