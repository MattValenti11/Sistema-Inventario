// src/components/OrderForm.jsx
import React, { useState } from 'react';
import '../styles/OrderForm.css';

const OrderForm = ({ onAddOrder }) => {
  const [form, setForm] = useState({ product: '', quantity: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.product.trim() || !form.quantity.trim()) return;
    onAddOrder(form);
    setForm({ product: '', quantity: '' });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input
        name="product"
        placeholder="Producto"
        value={form.product}
        onChange={handleChange}
      />
      <label htmlFor="quantity">Cantidad</label>
      <input
        name="quantity"
        type="number"
        placeholder="Cantidad"
        value={form.quantity}
        onChange={handleChange}
      />
      <button type="submit">Agregar Pedido</button>
    </form>
  );
};

export default OrderForm;
