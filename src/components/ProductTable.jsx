// src/components/ProductTable.jsx
import React from 'react';
import '../styles/ProductTable.css';

const ProductTable = ({ products, onEdit, onDelete, editingIndex, onQuickStockUpdate }) => {
  const handleStockChange = (e, index) => {
    const newStock = parseInt(e.target.value);
    if (!isNaN(newStock)) {
      onQuickStockUpdate(index, newStock);
    }
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Unidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr><td colSpan="6">No hay productos</td></tr>
        ) : (
          products.map((product, index) => (
            <tr key={index} className={product.stock < 5 ? 'stock-bajo' : ''}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleStockChange(e, index)}
                  className="stock-input"
                />
              </td>
              <td>{product.unidad || '-'}</td>
              <td>
                <button
                  className="editar"
                  onClick={() => onEdit(index)}
                  disabled={editingIndex === index}
                >Editar</button>
                <button className="eliminar" onClick={() => onDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
