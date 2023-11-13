'use client'

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


async function LoadFormularios() {
  const response = await fetch('http://localhost:3000/api/formularios');
  const data = await response.json();
  return data;
}
async function updateFormulario(id, data) {
  const response = await fetch(`http://localhost:3000/api/formularios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const updatedData = await response.json();
  return updatedData;
}

function TablaPage() {
  const { isLoading, error, data } = useQuery('formularios', LoadFormularios);
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [editingCell, setEditingCell] = useState(null);

  if (isLoading) return 'Cargando...';

  if (error) return `Error al cargar los datos: ${error.message}`;

  const filteredData = data.filter((row) => {
    const nameMatch = row.Nombre.toLowerCase().includes(filterName.toLowerCase());
    const dateMatch =
      (!filterStartDate || new Date(row.Fecha) >= new Date(filterStartDate)) &&
      (!filterEndDate || new Date(row.Fecha) <= new Date(filterEndDate));
    const typeMatch = row.TipoTrabajo.toLowerCase().includes(filterType.toLowerCase());
    return nameMatch && dateMatch && typeMatch;
  });

  const handleCellDoubleClick = (rowIndex, cellIndex) => {
    setEditingCell({ rowIndex, cellIndex });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleCellKeyDown = (event, rowIndex, cellIndex, id) => {
    if (event.key === 'Enter') {
      const newData = [...filteredData];
      newData[rowIndex][Object.keys(newData[rowIndex])[cellIndex]] = event.target.value;
      updateFormulario(id, newData[rowIndex]);
      setEditingCell(null);
    }
  };

  async function handleDeleteRow(id) {
    const response = await fetch(`http://localhost:3000/api/formularios/${id}`, {
      method: 'DELETE'
    });
    const deletedData = await response.json();
    return deletedData;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <TableContainer component={Paper} className='p-6 pl-6'>
      <TextField
        label="Nombre"
        value={filterName || ''}
        onChange={(event) => setFilterName(event.target.value)}
        className='ml-8'
      />
      <TextField
        label="Fecha de inicio"
        type="date"
        value={filterStartDate || ''}
        onChange={(event) => setFilterStartDate(event.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de fin"
        type="date"
        value={filterEndDate || ''}
        onChange={(event) => setFilterEndDate(event.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Tipo de trabajo"
        value={filterType || ''}
        onChange={(event) => setFilterType(event.target.value)}
      />
      <Table className='ml-4'>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>NombresGrupo</TableCell>
            <TableCell>TipoTrabajo</TableCell>
            <TableCell>TrabajoRealizado</TableCell>
            <TableCell>Ubicacion</TableCell>
            <TableCell>Observacion</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row, rowIndex) => (
            <TableRow key={row.ID}>
              <TableCell>{new Date(row.Fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short', hour12: false })}</TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 1)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 1 ? (
                  <TextField
                    value={row.Nombre}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].Nombre = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 1 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 1, row.ID)}
                  />
                ) : (
                  row.Nombre
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 2)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 2 ? (
                  <TextField
                    value={row.Grupo}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].Grupo = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 2 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 2, row.ID)}
                  />
                ) : (
                  row.Grupo
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 3)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 3 ? (
                  <TextField
                    value={row.NombresGrupo}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].NombresGrupo = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 3 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 3, row.ID)}
                  />
                ) : (
                  row.NombresGrupo
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 4)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 4 ? (
                  <TextField
                    value={row.TipoTrabajo}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].TipoTrabajo = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 4 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 4, row.ID)}
                  />
                ) : (
                  row.TipoTrabajo
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 5)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 5 ? (
                  <TextField
                    value={row.TrabajoRealizado}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].TrabajoRealizado = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 5 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 5, row.ID)}
                  />
                ) : (
                  row.TrabajoRealizado
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 6)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 6 ? (
                  <TextField
                    value={row.Ubicacion}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].Ubicacion = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 6 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 6, row.ID)}
                  />
                ) : (
                  row.Ubicacion
                )}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellDoubleClick(rowIndex, 7)}
                onBlur={handleCellBlur}
              >
                {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 7 ? (
                  <TextField
                    value={row.Observacion}
                    onChange={(event) => {
                      const newData = [...filteredData];
                      newData[rowIndex].Observacion = event.target.value;
                      setEditingCell({ rowIndex, cellIndex: 7 });
                    }}
                    onBlur={handleCellBlur}
                    onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 7, row.ID)}
                  />
                ) : (
                  row.Observacion
                )}
              </TableCell>
              <TableCell>
              <Button variant="contained" color="error" onClick={() => handleDeleteRow(row.ID)}>X</Button>              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </QueryClientProvider>
  );
}

export default TablaPage;