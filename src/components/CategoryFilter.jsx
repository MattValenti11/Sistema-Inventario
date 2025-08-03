import React from 'react';
import '../styles/CategoryFilter.css';

const CategoryFilter = ({ categories, selected, onChange }) => {
  return (
    <div className="category-filter">
      <label>Filtrar por categoría:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todas</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
