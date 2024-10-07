import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './CategoryList.css'; 
import CategoryContext from '../context/CategoryContext';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const { selectedCategories, toggleCategory } = useContext(CategoryContext); // Context'ten alınan değerler

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <ListGroup>
                <ListGroupItem
                    style={{ marginRight: '1rem' }}
                    className={selectedCategories.length === 0 ? 'active-category' : ''}
                    onClick={() => {
                        toggleCategory(''); // Tüm kategorileri temizler
                    }}
                >
                    All
                </ListGroupItem>
                {categories.map(cat => (
                    <ListGroupItem
                        key={cat}
                        style={{ marginRight: '1rem' }}
                        className={selectedCategories.includes(cat) ? 'active-category' : ''}
                        onClick={() => toggleCategory(cat)} // Kategori seçme/kaldırma
                    >
                        {cat}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default CategoryList;