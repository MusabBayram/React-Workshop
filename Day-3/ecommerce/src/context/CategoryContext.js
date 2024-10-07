import React, { createContext, useState } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (category === '') {
            // "All" seçildiğinde tüm kategorileri temizler
            setSelectedCategories([]);
        } else {
            setSelectedCategories(prevSelected => {
                if (prevSelected.includes(category)) {
                    // Eğer kategori zaten seçilmişse kaldır
                    return prevSelected.filter(cat => cat !== category);
                } else {
                    // Eğer kategori seçilmemişse ekle
                    return [...prevSelected, category];
                }
            });
        }
    };

    return (
        <CategoryContext.Provider value={{ selectedCategories, toggleCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContext;