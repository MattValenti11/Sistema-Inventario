// src/pages/Inventory.jsx
import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import InventoryExport from './InventoryExport';
import CategoryFilter from '../components/CategoryFilter';
import { toast } from 'react-toastify';
import '../styles/Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('inventario');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product) => {
  const normalizar = (str) => str.trim().toLowerCase();


  const yaExiste = products.some(
    (p, i) =>
      normalizar(p.name) === normalizar(product.name) &&
      i !== editingIndex
  );

  if (yaExiste) {
    toast.warning(`⚠ Ya existe un producto con el nombre "${product.name}"`);
    return;
  }

  const updated = [...products];
  if (editingIndex !== null) {
    updated[editingIndex] = product;
    setEditingIndex(null);
  } else {
    updated.push(product);
  }
  setProducts(updated);
  toast.success(editingIndex !== null ? 'Producto actualizado' : 'Producto agregado');
};

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };


  const handleQuickStockUpdate = (index, newStock) => {
  const updated = [...products];
  updated[index].stock = newStock;
  setProducts(updated);
};

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFiltered(products);
    } else {
      const lower = query.toLowerCase();
      const filtrado = products.filter(
        p =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
      setFiltered(filtrado);
    }
  };
  const categoriasUnicas = [...new Set(products.map(p => p.category))];
  
  useEffect(() => {
  if (!selectedCategory) {
    setFiltered(products);
  } else {
    const filtrado = products.filter(p => p.category === selectedCategory);
    setFiltered(filtrado);
  }
}, [products, selectedCategory]);


  return (
    <div className="inventory-container">
      <h2>Inventario</h2>
      <CategoryFilter
        categories={categoriasUnicas}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ProductForm
        onSubmit={handleAddProduct}
        editingProduct={editingIndex !== null ? products[editingIndex] : null}
        cancelEdit={cancelEdit}
        productosExistentes={products}
      />
      <SearchBar onSearch={handleSearch} />
      <ProductTable
        products={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editingIndex={editingIndex}
        onQuickStockUpdate={handleQuickStockUpdate}
      />
      <InventoryExport products={products} />
    </div>
  );
};

export default Inventory;
