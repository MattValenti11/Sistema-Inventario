// src/components/OrderForm.jsx
import React from 'react';
import '../styles/OrderForm.css';

const OrderForm = ({ product, setProduct, quantity, setQuantity, addOrder, editingIndex }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder();
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="product">Producto</label>
        <input
          id="product"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Nombre del producto"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Cantidad"
          required
          min="1"
        />
      </div>

      <button type="submit" className="order-button">
        {editingIndex !== null ? 'Actualizar Pedido' : 'Agregar Pedido'}
      </button>
    </form>
  );
};

export default OrderForm;
