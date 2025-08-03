import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import Inventario from './components/Inventory';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />xº
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/clientes" element={<Clientes />} />
          </Routes>
          <div style={{ 
            padding: '30px', 
            flex: 1, 
            backgroundColor: '#f4f6f8',
            minHeight: '100vh' 
          }}></div>
             <ToastContainer position="top-center" autoClose={2000} />
        </div>
      </div>
    </Router>
  );
}

export default App;
