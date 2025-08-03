// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBoxes, FaClipboardList, FaUsers } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Inventario</h2>
      <nav>
        <NavLink to="/" end className="sidebar-link">
          <FaHome /> <span>Inicio</span>
        </NavLink>
        <NavLink to="/inventario" className="sidebar-link">
          <FaBoxes /> <span>Inventario</span>
        </NavLink>
        <NavLink to="/pedidos" className="sidebar-link">
          <FaClipboardList /> <span>Pedidos</span>
        </NavLink>
        <NavLink to="/clientes" className="sidebar-link">
          <FaUsers /> <span>Clientes</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
