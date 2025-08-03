// src/pages/Pedidos.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Pedidos.css';
import OrderForm from '../components/OrderForm';
import OrderTable from '../components/OrderTable';
import PedidosExport from '../components/PedidosExport';

const Pedidos = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('pedidos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const updateOrder = (updatedOrder) => {
    const nuevos = [...orders];
    nuevos[editingIndex] = updatedOrder;
    setOrders(nuevos);
    setEditingIndex(null);
  };

  const deleteOrder = (index) => {
    const nuevos = [...orders];
    nuevos.splice(index, 1);
    setOrders(nuevos);
  };

  const toggleStatus = (index) => {
    const nuevos = [...orders];
    nuevos[index].status =
      nuevos[index].status === 'entregado' ? 'pendiente' : 'entregado';
    setOrders(nuevos);
  };

  const editOrder = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="pedidos-container">
      <h2>Gestión de Pedidos</h2>
      <OrderForm
        onAdd={addOrder}
        onUpdate={updateOrder}
        editingIndex={editingIndex}
        orderToEdit={orders[editingIndex]}
      />

      <div className="pedidos-header">
        <input
          type="text"
          placeholder="Buscar por producto o cliente..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <div className="filtros">
          <button onClick={() => setFilterStatus('todos')}>Todos</button>
          <button onClick={() => setFilterStatus('pendiente')}>Pendientes</button>
          <button onClick={() => setFilterStatus('entregado')}>Entregados</button>
        </div>
      </div>

      <OrderTable
        orders={orders}
        onDeleteOrder={deleteOrder}
        onToggleStatus={toggleStatus}
        onEditOrder={editOrder}
        filterText={filterText}
        filterStatus={filterStatus}
      />

      <PedidosExport orders={orders} />
    </div>
  );
};

export default Pedidos;
