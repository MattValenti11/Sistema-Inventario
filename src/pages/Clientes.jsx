// src/pages/Clientes.jsx
import React, { useEffect, useState, useRef } from 'react';
import '../styles/Clientes.css';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { utils, writeFile } from 'xlsx';

const Clientes = () => {
  const [clientes, setClientes] = useState(() => {
    try {
      const guardados = localStorage.getItem('clientes');
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [clienteAsignado, setClienteAsignado] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const busquedaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const resetForm = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setEditandoIndex(null);
  };

  const handleAgregar = () => {
    if (!nombre || !correo || !telefono) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const nuevo = { nombre, correo, telefono };

    if (editandoIndex !== null) {
      const actualizados = [...clientes];
      actualizados[editandoIndex] = nuevo;
      setClientes(actualizados);
      toast.info('Cliente actualizado');
    } else {
      setClientes([...clientes, nuevo]);
      toast.success('Cliente agregado');
    }

    resetForm();
  };

  const handleEliminar = (index) => {
    const id = toast(
      ({ closeToast }) => (
        <div className="toast-confirm-container">
          <strong>¿Eliminar este cliente?</strong>
          <div className="toast-confirm-buttons">
            <button
              className="toast-confirm-eliminar"
              onClick={() => {
                const nuevos = [...clientes];
                nuevos.splice(index, 1);
                setClientes(nuevos);
                toast.dismiss(id);
                toast.warn('Cliente eliminado');
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

  const handleEditar = (index) => {
    const cliente = clientes[index];
    setNombre(cliente.nombre);
    setCorreo(cliente.correo);
    setTelefono(cliente.telefono);
    setEditandoIndex(index);
  };

  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientesFiltrados(
        clientes.filter(
          (c) =>
            c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.correo.toLowerCase().includes(busqueda.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [busqueda, clientes]);

  const handleExport = (tipo) => {
    const ws = utils.json_to_sheet(clientesFiltrados);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Clientes');
    const filename = tipo === 'csv' ? 'clientes.csv' : 'clientes.xlsx';
    writeFile(wb, filename);
    toast.success(`Clientes exportados como ${filename}`);
  };

  const handleAsignar = (cliente) => {
    const listaPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    if (listaPedidos.length === 0) {
      toast.warn('No hay pedidos disponibles para asignar');
      return;
    }
    setPedidos(listaPedidos);
    setClienteAsignado(cliente);
    setMostrarModal(true);
  };

  const confirmarAsignacion = (index) => {
    const nuevosPedidos = [...pedidos];
    nuevosPedidos[index].cliente = clienteAsignado;
    localStorage.setItem('pedidos', JSON.stringify(nuevosPedidos));
    toast.success(`Cliente asignado a: ${nuevosPedidos[index].product}`);
    setMostrarModal(false);
    setClienteAsignado(null);
  };

  return (
    <div className="clientes-container">
      <h2>Gestión de Clientes</h2>

      <div className="clientes-form">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button onClick={handleAgregar} className="btn-agregar">
          {editandoIndex !== null ? 'Actualizar' : 'Agregar'}
        </button>
      </div>

      <div className="clientes-header">
        <div className="clientes-busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            ref={busquedaRef}
          />
        </div>
        <div className="export-buttons">
          <button onClick={() => handleExport('csv')}>Exportar CSV</button>
          <button onClick={() => handleExport('excel')}>Exportar Excel</button>
        </div>
      </div>

      <div className="clientes-tabla">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente, index) => (
              <tr key={index} className={clienteSeleccionado === index ? 'seleccionado' : ''}>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button
                    className="asignar"
                    onClick={() => handleAsignar(cliente)}
                  >
                    Asignar
                  </button>
                  <button className="editar" onClick={() => handleEditar(index)}>
                    Editar
                  </button>
                  <button className="eliminar" onClick={() => handleEliminar(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  No hay clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Asignar cliente a pedido</h3>
            <div className="modal-body">
              {pedidos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => confirmarAsignacion(i)}
                  className="btn-asignar-pedido"
                >
                  {i + 1}: {p.product} ({p.status})
                </button>
              ))}
              <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;