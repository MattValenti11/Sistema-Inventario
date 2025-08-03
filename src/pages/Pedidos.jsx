// src/pages/Pedidos.jsx
import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderTable from '../components/OrderTable';
import { toast, Slide } from 'react-toastify';
import '../styles/Pedidos.css';
import PedidosExport from '../components/PedidosExport';
import 'react-toastify/dist/ReactToastify.css';

const Pedidos = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('pedidos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    const today = new Date().toISOString().split('T')[0];
    setOrders([...orders, {
      ...newOrder,
      date: today,
      status: 'pendiente',
      procesado: false
    }]);
    toast.success(`Pedido de "${newOrder.product}" agregado`);
  };

  const deleteOrder = (index) => {
    const id = toast(
      ({ closeToast }) => (
        <div className="toast-confirm-container">
          <strong>¿Eliminar este pedido?</strong>
          <div className="toast-confirm-buttons">
            <button
              className="toast-confirm-eliminar"
              onClick={() => {
                const updated = [...orders];
                updated.splice(index, 1);
                setOrders(updated);
                toast.dismiss(id);
                toast.warn('Pedido eliminado');
              }}
            >
              Sí, eliminar
            </button>
            <button
              className="toast-confirm-cancelar"
              onClick={() => toast.dismiss(id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        transition: Slide,
      }
    );
  };

  const toggleStatus = (index) => {
    const updated = [...orders];
    const order = updated[index];
    const normalizar = (str) => str.trim().toLowerCase();
    const inventory = JSON.parse(localStorage.getItem('inventario')) || [];
    const productoExistente = inventory.find(
      p => normalizar(p.name) === normalizar(order.product)
    );
    const cantidad = Number(order.quantity) || 0;

    if (order.status === 'pendiente') {
      if (!order.procesado && productoExistente) {
        productoExistente.stock += cantidad;
        order.procesado = true;
        toast.success(`+${cantidad} al inventario: ${productoExistente.name}`);
      } else if (!productoExistente) {
        toast.warning(`⚠ Producto no encontrado: "${order.product}"`);
      }
      order.status = 'entregado';
      toast.info(`📝 Estado cambiado a "entregado"`);

    } else {
      if (order.procesado && productoExistente) {
        productoExistente.stock -= cantidad;
        order.procesado = false;
        toast.info(`-${cantidad} del inventario: ${productoExistente.name}`);
      }
      order.status = 'pendiente';
      toast.info(`↩ Estado cambiado a "pendiente"`);
    }

    localStorage.setItem('inventario', JSON.stringify(inventory));
    setOrders(updated);
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="pedidos-container">
      <h2>Gestión de Pedidos</h2>
      <OrderForm onAddOrder={addOrder} />
      <OrderTable
        orders={orders}
        onDeleteOrder={deleteOrder}
        onToggleStatus={toggleStatus}
      />
      <PedidosExport orders={orders} />

    </div>
  );
};

export default Pedidos;
