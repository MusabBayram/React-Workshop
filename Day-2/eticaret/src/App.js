import React, { useState, useEffect } from 'react';
import { Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './components/Cart.js';
import CategoryList from './components/CategoryList.js';
import ProductList from './components/ProductList.js';
import { categories, products } from './data/data.js';
import ProductDetail from './components/ProductDetail.js';

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); //aynı anda birden fazla kategori secimi için bu kısmı array olarak tanımlandı
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

  //Kategorileme işlemleri
  const handleCategoryClick = (category) => {
    if (selectedCategories.some(selected => selected.id === category.id)) {
      // Kategori zaten seçiliyse, listeden çıkar
      setSelectedCategories(selectedCategories.filter(selected => selected.id !== category.id));
    } else {
      // Kategori seçili değilse, listeye ekle
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = selectedCategories.length > 0 
  ? products.filter(product => selectedCategories.some(category => category.id === product.categoryId))
  : products;

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
                  <CategoryList categories={categories} onSelectedCategory={handleCategoryClick} selectedCategories={selectedCategories}  ></CategoryList>
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
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;