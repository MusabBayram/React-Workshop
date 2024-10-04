import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const CategoryList = ({ categories, onSelectedCategory, selectedCategories }) => {
  if (!categories) return null;

  return (
    <ListGroup className='mt-2'>
      {categories.map((category) => (
        <ListGroupItem 
          key={category.id} 
          onClick={() => onSelectedCategory(category)}
          active={selectedCategories.some(selected => selected.id === category.id)} // Seçili kategorileri kontrol et
          style={{ cursor: 'pointer' }}
        >
          {category.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoryList;