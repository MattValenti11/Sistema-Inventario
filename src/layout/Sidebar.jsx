import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBoxes, FaClipboardList, FaUsers } from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <h2>Inventario</h2>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome /> Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventario" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaBoxes /> Inventario
          </NavLink>
        </li>
        <li>
          <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaClipboardList /> Pedidos
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUsers /> Clientes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
