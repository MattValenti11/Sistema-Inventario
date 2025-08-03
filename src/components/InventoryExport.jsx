// src/components/InventoryExport.jsx
import React from 'react';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { FaFileCsv, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import '../styles/InventoryExport.css';

const InventoryExport = ({ products }) => {
  const exportToCSV = () => {
    try {
      const headers = ['Nombre', 'Categoría', 'Precio', 'Stock', 'Unidad'];
      const rows = products.map(p => [
        p.name,
        p.category,
        p.price,
        p.stock,
        p.unidad || ''
      ]);
      const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'inventario.csv');
      toast.success('Archivo CSV exportado correctamente');
    } catch {
      toast.error('Error al exportar CSV');
    }
  };

  const exportToExcel = () => {
    try {
      const data = products.map(p => ({
        Nombre: p.name,
        Categoría: p.category,
        Precio: p.price,
        Stock: p.stock,
        Unidad: p.unidad || ''
      }));
      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Inventario');
      writeFile(workbook, 'inventario.xlsx');
      toast.success('Archivo Excel exportado correctamente');
    } catch {
      toast.error('Error al exportar Excel');
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Inventario', 14, 16);
      const tableData = products.map(p => [
        p.name,
        p.category,
        `$${p.price}`,
        p.stock,
        p.unidad || ''
      ]);
      autoTable(doc, {
        head: [['Nombre', 'Categoría', 'Precio', 'Stock', 'Unidad']],
        body: tableData,
        startY: 20
      });
      doc.save('inventario.pdf');
      toast.success('Archivo PDF exportado correctamente');
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

export default InventoryExport;
