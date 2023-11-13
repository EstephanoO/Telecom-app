'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Breadcrumbs, Link, Card, Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useQuery, useMutation, queryCache } from 'react-query';

const deleteFile = async (fileId) => {
  // Simulated file deletion logic
};

const downloadFile = async (fileId) => {
  // Simulated file download logic
};

function Files({ items }) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownloadNotification, setShowDownloadNotification] = useState(false);

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId - 1);
    setSelectedFile(null);
  };

  const handleBreadcrumbClick = (index) => {
    setSelectedFolder(index === 0 ? null : index - 1);
    setSelectedFile(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFolder = () => {
    // Logic to handle editing the folder (update name and userID)
    // ...

    // After editing, close the modal
    handleEditModalClose();
  };

  const handleDeleteFile = () => {
    deleteFileMutation.mutate(selectedFile);
  };

  const handleDownloadFile = () => {
    downloadFileMutation.mutate(selectedFile);
  };

  const handleUploadFile = () => {
    // Logic for handling file upload
    // ...
  };

  const handleCreateFolder = () => {
    // Logic for handling folder creation
    // ...
  };

  const downloadFileMutation = useMutation(downloadFile, {
    onSuccess: () => {
      setShowDownloadNotification(true);
    },
  });

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [{ label: 'Inicio', onClick: () => handleBreadcrumbClick(0) }];

    if (selectedFolder !== null && items[selectedFolder]) {
      const selectedFolderItem = items[selectedFolder];
      breadcrumbItems.push({
        label: selectedFolderItem.nombre,
        onClick: () => handleBreadcrumbClick(selectedFolder + 1),
      });
    }

    return breadcrumbItems;
  };

  const handleFileClick = (fileId, event) => {
    event.stopPropagation();
    handleEditModalOpen();
    setSelectedFile(fileId);
  };

  return (
    <div>
      <Card component={Paper} className='my-1 py-2'>
        <Breadcrumbs>
          {getBreadcrumbItems().map((item, index) => (
            <Link key={index} color="inherit" onClick={item.onClick} className=' text-teal-700 ml-2 text-base cursor-pointer'>
              {item.label}
            </Link>
          ))}
        </Breadcrumbs>
        
        <div className="flex justify-end items-center">
          <input type="file" style={{ display: 'none' }} onChange={handleUploadFile} id="upload-file" />
          <label htmlFor="upload-file">
            <IconButton component="span">
              <DescriptionIcon className="text-blue-600" />
            </IconButton>
          </label>

          <IconButton onClick={handleCreateFolder}>
            <FolderIcon className="text-green-600" />
          </IconButton>
        </div>
      </Card>

      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol/Usuario</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedFolder === null
              ? items.map((archivo) => (
                  <TableRow
                    key={archivo.id}
                    className="hover:bg-slate-200 cursor-pointer"
                    onClick={() => handleFolderClick(archivo.id)}
                  >
                    <TableCell>
                      <FolderIcon className="text-teal-600 mr-2" />
                      {archivo.nombre}
                    </TableCell>
                    <TableCell>{archivo.nombreUsuario}</TableCell>
                    <TableCell>{new Date(archivo.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleFileClick(archivo.id, event)}>
                        <EditIcon className="text-teal-600" />
                      </IconButton>
                      <IconButton onClick={() => setShowDeleteModal(true)}>
                        <DeleteIcon className="text-red-600" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : items[selectedFolder]?.archivos.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <DescriptionIcon className="text-teal-600 mr-2" />
                      {file.nombre}
                    </TableCell>
                    <TableCell>{file.contenido}</TableCell>
                    <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleFileClick(file.id, event)}>
                        <EditIcon className="text-teal-600" />
                      </IconButton>
                      <IconButton onClick={() => setShowDeleteModal(true)}>
                        <DeleteIcon className="text-red-600" />
                      </IconButton>
                      <IconButton onClick={() => handleDownloadFile(file.id)}>
                        <DownloadIcon className="text-blue-600" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de eliminación */}
      <Modal open={showDeleteModal} onClose={handleDeleteModalClose}>
        <div>
          <h2>¿Estás seguro de eliminar este archivo?</h2>
          <Button onClick={handleDeleteFile}>Sí</Button>
          <Button onClick={handleDeleteModalClose}>No</Button>
        </div>
      </Modal>

      {/* Modal de edición */}
      <Modal open={showEditModal} onClose={handleEditModalClose}>
        <div>
          <h2>Editar Carpeta</h2>
          <input type="text" placeholder="Nuevo nombre de carpeta" />
          <input type="text" placeholder="Nuevo userID" />
          <Button onClick={handleEditFolder}>Guardar</Button>
          <Button onClick={handleEditModalClose}>Cancelar</Button>
        </div>
      </Modal>

      {/* Notificación de descarga */}
      {showDownloadNotification && (
        <div>
          <p>Descargando archivo...</p>
        </div>
      )}
    </div>
  );
}

export default Files;
