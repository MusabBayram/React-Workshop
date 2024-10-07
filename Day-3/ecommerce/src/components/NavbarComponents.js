import React, { useContext } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import './NavbarComponents.css'; // Stil dosyasını ekle
import CartContext from '../context/CartContext';

function NavbarComponents() {
    const { getTotalItemsCount } = useContext(CartContext); // Sepetteki ürün sayısını al

    return (
        <Navbar expand="md" className="custom-navbar">
            <Container className="navbar-container">
                <NavbarBrand href="/" className="navbar-brand-custom">
                    MyStore
                </NavbarBrand>
                <Nav className="ml-auto nav-links" navbar>
                    <NavItem>
                        <NavLink href="/" className="nav-link-custom">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cart" className="nav-link-custom">
                            Cart ({getTotalItemsCount()}) {/* Sepetteki ürün sayısını göster */}
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponents;