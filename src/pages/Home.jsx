import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/Home.css';
import '../styles/Inventory.css'; // usa mismo contenedor unificado

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Home = () => {
  const [inventario, setInventario] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const inv = JSON.parse(localStorage.getItem('inventario')) || [];
    const ped = JSON.parse(localStorage.getItem('pedidos')) || [];
    setInventario(inv);
    setPedidos(ped);
  }, []);

  const totalProductos = inventario.length;
  const productosStockBajo = inventario.filter(p => p.stock < 5).length;

  const totalPedidos = pedidos.length;
  const pedidosEntregados = pedidos.filter(p => p.status === 'entregado').length;
  const pedidosPendientes = pedidos.filter(p => p.status === 'pendiente').length;

  const barData = {
    labels: ['Entregados', 'Pendientes'],
    datasets: [
      {
        label: 'Pedidos',
        data: [pedidosEntregados, pedidosPendientes],
        backgroundColor: ['#10b981', '#f59e0b']
      }
    ]
  };

  const doughnutData = {
    labels: ['Stock Bajo (<5)', 'Stock Suficiente'],
    datasets: [
      {
        data: [productosStockBajo, totalProductos - productosStockBajo],
        backgroundColor: ['#dc2626', '#60a5fa']
      }
    ]
  };

  return (
    <div className="inventory-container">
      <h2>Resumen General</h2>
      <div className="resumen-grid">
        <div className="card total-productos">
          <span>📦 Productos Totales</span>
          <h3>{totalProductos}</h3>
        </div>
        <div className="card stock-bajo">
          <span>⚠ Stock Bajo</span>
          <h3>{productosStockBajo}</h3>
        </div>
        <div className="card total-pedidos">
          <span>📋 Pedidos Totales</span>
          <h3>{totalPedidos}</h3>
        </div>
        <div className="card pedidos-pendientes">
          <span>🕒 Pedidos Pendientes</span>
          <h3>{pedidosPendientes}</h3>
        </div>
        <div className="card pedidos-entregados">
          <span>✅ Pedidos Entregados</span>
          <h3>{pedidosEntregados}</h3>
        </div>
      </div>

      <div className="graficos">
        <div className="grafico">
          <h4>Estado de Pedidos</h4>
          <Bar data={barData} />
        </div>
        <div className="grafico">
          <h4>Stock Disponible</h4>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
