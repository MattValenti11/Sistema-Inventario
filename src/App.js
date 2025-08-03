import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import Inventario from './components/Inventory';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/clientes" element={<Clientes />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </Router>
  );
}

export default App;
