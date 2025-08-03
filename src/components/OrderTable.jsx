// src/components/OrderTable.jsx
import React from 'react';
import '../styles/OrderTable.css';

const OrderTable = ({ orders, onDeleteOrder, onToggleStatus, onEditOrder, filterText, filterStatus }) => {
  const filteredOrders = orders.filter((order) => {
    const product = typeof order.product === 'string' ? order.product.toLowerCase() : '';
    const client = order.client?.nombre?.toLowerCase() || '';
    const text = typeof filterText === 'string' ? filterText.toLowerCase() : '';

    const matchesText = product.includes(text) || client.includes(text);
    const matchesStatus = filterStatus === 'todos' || order.status === filterStatus;

    return matchesText && matchesStatus;
  });

  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
                <td className={order.status === 'entregado' ? 'entregado' : 'pendiente'}>
                  {order.status}
                </td>
                <td>{order.client?.nombre || '-'}</td>
                <td>
                  <button className="estado" onClick={() => onToggleStatus(index)}>
                    {order.status === 'entregado' ? 'Revertir' : 'Cambiar Estado'}
                  </button>
                  <button className="editar" onClick={() => onEditOrder(index)}>
                    Editar
                  </button>
                  <button className="eliminar" onClick={() => onDeleteOrder(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No hay pedidos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
