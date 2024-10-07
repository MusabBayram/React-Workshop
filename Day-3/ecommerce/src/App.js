import React from 'react';
import NavbarComponents from './components/NavbarComponents.js';
import Home from './pages/Home.js';
import ProductPage from './pages/ProductPage.js';
import CartPage from './pages/CartPage.js';
import { CartProvider } from './context/CartContext.js';
import { CategoryProvider } from './context/CategoryContext.js'; // Kategori sağlayıcıyı ekledik
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';

function App() {
  return (
    <CartProvider>
      <CategoryProvider> {/* Kategori sağlayıcıyı sarmaladık */}
        <Router>
          <NavbarComponents />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Container>
        </Router>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;