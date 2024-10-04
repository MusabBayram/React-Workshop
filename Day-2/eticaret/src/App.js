import React, { useState } from 'react';
import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from 'reactstrap';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Cart from './components/Cart.js';
import CategoryList from './components/CategoryList.js';
import ProductList from './components/ProductList.js';
import { categories, products } from './data/data.js';

const App = () =>{
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // Sepette bu ürün var mı kontrol et
      const existingProduct = prevCart.find(item => item.id === product.id);
  
      if (existingProduct) {
        // Eğer varsa, miktarını artır
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Eğer yoksa, yeni bir ürün olarak ekle
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const handleClearCart = () =>{
    setCart([]);
  }

  const filteredProducts = selectedCategory ? products.filter(product => product.categoryId === selectedCategory.id) : products;

  return(
    <Router>
      <Container>
          <Navbar color="light" expand="md">
            <NavbarBrand tag={Link} to="/">E-Ticaret</NavbarBrand>
            <Nav className='mr-auto'navbar>
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
                  <ProductList products={filteredProducts} 
                  onAddToCart={handleAddToCart}></ProductList>
                </Col>
              </Row>
            }
            />
            <Route
              path='/cart'
              element={
                <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart}></Cart>
              }
            >
            </Route>
          </Routes>
      </Container>
    </Router>
  );

}
export default App;