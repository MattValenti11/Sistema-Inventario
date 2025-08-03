// src/components/ProductForm.jsx
import React, { useEffect, useState } from 'react';
import { FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/ProductForm.css';

const ProductForm = ({ onSubmit, editingProduct, cancelEdit, productosExistentes }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unidad: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm({ name: '', category: '', price: '', stock: '', unidad: '' });
    }
  }, [editingProduct]);

  const normalizar = (str) => str.trim().toLowerCase();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editingProduct && productosExistentes) {
      const yaExiste = productosExistentes.some(
        (p) => normalizar(p.name) === normalizar(form.name)
      );
      if (yaExiste) {
        toast.warning(`⚠ Ya existe un producto con el nombre "${form.name}"`);
        return;
      }
    }

    const product = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      unidad: form.unidad.trim()
    };

    if (!product.name || !product.category || isNaN(product.price) || isNaN(product.stock)) return;

    onSubmit(product);
    setForm({ name: '', category: '', price: '', stock: '', unidad: '' });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
      <input name="price" placeholder="Precio" type="number" value={form.price} onChange={handleChange} />
      <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
      <input name="unidad" placeholder="Unidad (kg, L, bolsas…)" value={form.unidad} onChange={handleChange} />
      <div className="form-buttons">
        <button type="submit">
          {editingProduct ? <><FaCheck /> Actualizar</> : <><FaPlus /> Agregar</>}
        </button>
        {editingProduct && (
          <button type="button" className="cancelar" onClick={cancelEdit}>
            <FaTimes /> Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
