import { Carousel } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import CategoryList from '../components/CategoryList.js';
import ProductList from '../components/ProductList.js';
import ProductItem from '../components/ProductItem.js';
import { Col, Row } from 'reactstrap';
import CartContext from '../context/CartContext';
import './Home.css'; // Stil dosyasını ekliyoruz

function Home() {
    const [randomProducts, setRandomProducts] = useState([]);
    const [numberOfProductsPerSlide, setNumberOfProductsPerSlide] = useState(3); // Maksimum 3 ürün göstereceğiz
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        // Ekran genişliğine göre ürün sayısını ayarla
        const updateNumberOfProducts = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 576) {
                setNumberOfProductsPerSlide(1); // Mobil: 1 ürün
            } else if (screenWidth < 768) {
                setNumberOfProductsPerSlide(2); // Küçük tablet: 2 ürün
            } else {
                setNumberOfProductsPerSlide(3); // Tablet ve Masaüstü: 3 ürün
            }
        };

        updateNumberOfProducts();
        window.addEventListener('resize', updateNumberOfProducts);

        return () => {
            window.removeEventListener('resize', updateNumberOfProducts);
        };
    }, []);

    useEffect(() => {
        // Ürünleri API'den çek
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const shuffledProducts = data.sort(() => 0.5 - Math.random());
                setRandomProducts(shuffledProducts);
            });
    }, []);

    // Ürünleri slaytlara böl
    const slides = [];
    for (let i = 0; i < randomProducts.length; i += numberOfProductsPerSlide) {
        slides.push(randomProducts.slice(i, i + numberOfProductsPerSlide));
    }

    return (
        <div>
            <Carousel 
                prevIcon={<span className="carousel-control-prev-icon custom-prev-icon" />} 
                nextIcon={<span className="carousel-control-next-icon custom-next-icon" />}
            >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap' }}>
                            {slide.map((product) => (
                                <div 
                                    key={product.id} 
                                    style={{ 
                                        margin: '0 10px', 
                                        textAlign: 'center', 
                                        flex: `0 0 ${100 / numberOfProductsPerSlide - 2}%`, 
                                        maxWidth: `${100 / numberOfProductsPerSlide - 2}%` 
                                    }}>
                                    <ProductItem product={product} addToCart={addToCart} />
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <Row>
                <Col sm="3">
                    <CategoryList />
                </Col>
                <Col sm="9">
                    <ProductList />
                </Col>
            </Row>
        </div>
    );
}

export default Home;