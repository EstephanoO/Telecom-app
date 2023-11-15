'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Menu, MenuItem, AppBar, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Use MUI ChevronRightIcon
import axios from 'axios';
import settings from '@/libs/settings'

const API_URL = settings.apiUrl;


function Files({items}) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nombre, setNombre] = useState('');
  const [rolId, setRolId] = useState(null);

  const isFolder = (item) => item.carpetaId == null;
  const handleContextMenu = (event, archivo) => {
    event.preventDefault();
    setSelectedFile(archivo);
    setAnchorEl(event.currentTarget);
  };
  const handleFolderClick = (folder) => {
    // Implement logic to view the files inside the folder.
    setSelectedFolder(folder);
  };
  const handleDownload = (archivo) => {
    // Implement logic to download the file.
    console.log(`Downloading file: ${archivo.nombre}`);
  };
  const handleAddClick = () => {
    console.log('Hola')
  }
  const handleCreateClose = () => {
    console.log('Hola')
  }
  const handleEditClose = () => {
    console.log('Hola')
  }
  const handleEditSubmit = () => {
    console.log('Hola')
  }
  const handleDeleteClose = () => {
    console.log('Hola')
  }
  const handleDeleteSubmit = () => {
    console.log('Hola')
  }

  const handleCreateSubmit = () => {
    console.log('Hola')
  }

  const handleEditOpen = (archivo) => {
    setNombre(archivo.nombre);
    setRolId(archivo.id);
    setOpenEdit(true);
  };
  const handleCreateCarpeta = () => {
    axios.post(`${API_URL}/archivos`, {
      nombre: nombre,
      tipo: 'Carpeta',
      carpeta_padre: selectedFolder?.id || null,
      ruta: selectedFolder?.ruta || null
    })
      .then(response => {
        setSelectedFolder(response.data);
        setOpenCreate(false);
      })
      .catch(error => console.error(error));
  };
  const handleUpdateRol = (rolId, nombre) => {
    axios.put(`${API_URL}/roles/${rolId}`, {
      nombre
    })
      .then(response => {
        console.log(response);
        setOpenEdit(false);
      })
      .catch(error => console.error(error));
  };
  const handleDeleteRol = (rolId) => {
    axios.delete(`${API_URL}/roles/${rolId}`)
      .then(response => {
        console.log(response);
        setOpenDelete(false);
      })
      .catch(error => console.error(error));
  };
  const handleContextMenuClick = (action) => {
    if (selectedFile) {
      if (action === 'Download') {
        handleDownload(selectedFile);
      } else if (action === 'Edit') {
        handleEditOpen(selectedFile);
      } else if (action === 'Move') {
        // Implement logic to select target folder and move the file.
      }
    }
    setAnchorEl(null);
  };

  const renderTableRows = (itemsToRender) => {
    return itemsToRender.map((archivo) => (
      <TableRow key={archivo.id} className='hover:bg-slate-200' onContextMenu={(event) => handleContextMenu(event, archivo)}>
        <TableCell>{archivo.nombre}</TableCell>
        <TableCell>{archivo.contenido}</TableCell>
        <TableCell>{new Date(archivo.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>{archivo.peso}</TableCell>
        <TableCell>
          {isFolder(archivo) ? (
            <IconButton onClick={() => handleFolderClick(archivo)}><ChevronRightIcon /></IconButton>
          ) : (
            <>
              <IconButton onClick={() => handleEditOpen(archivo)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDeleteRol(archivo.id)}><DeleteIcon /></IconButton>
              <IconButton onClick={() => handleDownload(archivo)}><DownloadIcon /></IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className='bg-teal-500'>
          <IconButton edge="start" aria-label="menu" onClick={handleAddClick} className='hover:bg-blue-600'>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex' }}>
        <Card style={{ width: '10%', height: '100vh', overflow: 'auto' }}>
          <CardContent>
          </CardContent>
        </Card>
        <TableContainer component={Paper} style={{ width: '90%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Tamaño</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFolder ? renderTableRows(items.filter(item => item.carpetaId === selectedFolder.id)) : renderTableRows(items)}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {selectedFile && (
            <>
              <MenuItem onClick={() => handleContextMenuClick('Download')}>Descargar</MenuItem>
              <MenuItem onClick={() => handleContextMenuClick('Edit')}>Editar Nombre</MenuItem>
              <MenuItem onClick={() => handleContextMenuClick('Move')}>Mover a otra carpeta</MenuItem>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

export default Files;
