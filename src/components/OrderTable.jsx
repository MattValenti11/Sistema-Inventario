// src/components/OrderTable.jsx
import React from 'react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import '../styles/OrderTable.css';

const OrderTable = ({ orders, onDeleteOrder, onToggleStatus }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr><td colSpan="5">No hay pedidos</td></tr>
        ) : (
          orders.map((order, index) => (
            <tr key={index}>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
              <td className={order.status === 'entregado' ? 'entregado' : 'pendiente'}>
                {order.status}
              </td>
              <td>
                <button onClick={() => onToggleStatus(index)}>
                  <FaCheckCircle /> Cambiar Estado
                </button>
                <button className="eliminar" onClick={() => onDeleteOrder(index)}>
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
