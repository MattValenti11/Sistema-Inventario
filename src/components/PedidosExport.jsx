import React from 'react';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { FaFileExcel, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import '../styles/PedidosExport.css';

const PedidosExport = ({ orders }) => {
  const exportToCSV = () => {
    try {
      const headers = ['Producto', 'Cantidad', 'Fecha', 'Estado'];
      const rows = orders.map(o => [
        o.product,
        o.quantity,
        o.date,
        o.status
      ]);
      const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'pedidos.csv');
      toast.success('CSV de pedidos exportado');
    } catch {
      toast.error('Error al exportar CSV');
    }
  };

  const exportToExcel = () => {
    try {
      const data = orders.map(o => ({
        Producto: o.product,
        Cantidad: o.quantity,
        Fecha: o.date,
        Estado: o.status
      }));
      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Pedidos');
      writeFile(workbook, 'pedidos.xlsx');
      toast.success('Excel de pedidos exportado');
    } catch {
      toast.error('Error al exportar Excel');
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Pedidos', 14, 16);
      const tableData = orders.map(o => [
        o.product,
        o.quantity,
        o.date,
        o.status
      ]);
      autoTable(doc, {
        head: [['Producto', 'Cantidad', 'Fecha', 'Estado']],
        body: tableData,
        startY: 20
      });
      doc.save('pedidos.pdf');
      toast.success('PDF de pedidos exportado');
    } catch {
      toast.error('Error al exportar PDF');
    }
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToCSV}><FaFileCsv /> CSV</button>
      <button onClick={exportToExcel}><FaFileExcel /> Excel</button>
      <button onClick={exportToPDF}><FaFilePdf /> PDF</button>
    </div>
  );
};

export default PedidosExport;
