'use client'

import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Select, MenuItem, Grid, TextField, Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

const Trabajadores = () => {
  const [expandedUser, setExpandedUser] = useState(null);
  const [selectedHistorial, setSelectedHistorial] = useState([]);
  const [filterRole, setFilterRole] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [users, setUsers] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRole, setEditedRole] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchHistorialData = async (userId) => {
    try {
      const response = await axios.get('http://localhost:3000/api/formularios');
      const userFormularios = response.data.filter(entry => entry.UsuarioID === userId);
      setHistorial(userFormularios);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleExpand = (userId) => {
    setExpandedUser((prevExpandedUser) => (prevExpandedUser === userId ? null : userId));
  };

  const handleHistorialSelect = (entryId) => {
    const selectedIndex = selectedHistorial.indexOf(entryId);
    const newSelected = [...selectedHistorial];

    if (selectedIndex === -1) {
      newSelected.push(entryId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedHistorial(newSelected);

    const selectedHistorialData = historial.filter(entry => newSelected.includes(entry.ID));
    console.log("Selected Historials: ", selectedHistorialData);
  };

  const handleEliminarClick = async () => {
    if (selectedHistorial.length === 0) {
      return;
    }

    try {
      for (const id of selectedHistorial) {
        await axios.delete(`http://localhost:3000/api/formularios/${id}`);
      }

      fetchHistorialData(expandedUser);
    } catch (error) {
      console.error('Error deleting historical entries:', error);
    }

    setSelectedHistorial([]);
  };

  const handleAccordionChange = (userId) => {
    handleExpand(userId);
    fetchHistorialData(userId);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdateRole = () => {
    // Implement role update logic here, make API call to update the user's role.
    // You can use the user.id to identify the user to update.

    // After updating, close the Modal.
    handleCloseEditModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedUsers = users
    .filter((user) => {
      if (filterRole && filterRole !== '') {
        return user.rol_name === filterRole;
      }
      return true;
    })
    .filter((user) => {
      if (filterName && filterName !== '') {
        return user.username.toLowerCase().includes(filterName.toLowerCase());
      }
      return true;
    })
    .slice(startIndex, endIndex);

  return (
    <main className='bg-slate-200'>
      <Grid container spacing={2} alignItems="center" className='ml-16 mt-2'>
        <Card className=' flex columns-3 ml-8 px-4 mt-4 pt-4 pb-2'>
          <Grid item className='mr-4'>
            <TextField
              label="Filtrar por nombre"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Filtrar por fecha de inicio"
              type="date"
              value={filterStartDate || ''}
              onChange={(e) => setFilterStartDate(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Filtrar por fecha de fin"
              type="date"
              value={filterEndDate || ''}
              onChange={(e) => setFilterEndDate(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item className='mt-2 ml-4'>
            <Button
              variant="contained"
              className='bg-slate-400 hover:bg-teal-700'
              color="primary"
              onClick={() => {
                setFilterName('');
                setFilterStartDate(null);
                setFilterEndDate(null);
              }}
              sx={{ backgroundColor: '#00897B', '&:hover': { backgroundColor: '#00695C' } }}
            >
              Limpiar filtros
            </Button>
          </Grid>
        </Card>
      </Grid>
      <TableContainer component={Paper} className='mt-8 ml-20' sx={{ width: '90%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id} className='bg-slate-100'>
                <TableCell>
                  <Accordion
                    expanded={expandedUser === user.id}
                    onChange={() => handleAccordionChange(user.id)}
                    className='hover:bg-teal-50'
                  >
                    <AccordionSummary className='hover-bg-teal-400'>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <PersonIcon
                          className="text-teal-600 mr-2"
                          sx={{ fontSize: '30px' }}
                        />
                        <div className="flex flex-col">
                          <span className="mb-2">Nombre: {user.username}</span>
                          <span className="mb-2">Email: {user.email}</span>
                          <span>Rol: {user.roles.length > 0 ? user.roles[0].name : 'Sin Rol'}</span>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <HistorialTable
                        historial={historial}
                        filterStartDate={filterStartDate}
                        filterEndDate={filterEndDate}
                        handleHistorialSelect={handleHistorialSelect}
                        selectedHistorial={selectedHistorial}
                        handleEliminarClick={handleEliminarClick}
                      />
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </main>
  );
};

// Nuevo componente para la tabla de historial con paginación
const HistorialTable = ({ historial, filterStartDate, filterEndDate, handleHistorialSelect, selectedHistorial, handleEliminarClick }) => {
  // Lógica de paginación específica para el historial
  const [historialPage, setHistorialPage] = useState(0);
  const [historialRowsPerPage, setHistorialRowsPerPage] = useState(5);

  const historialStartIndex = historialPage * historialRowsPerPage;
  const historialEndIndex = historialStartIndex + historialRowsPerPage;

  const displayedHistorial = historial
    .filter((entry) => {
      if (filterStartDate && filterStartDate !== '' && filterEndDate && filterEndDate !== '') {
        const entryDate = new Date(entry.Fecha);
        const filterStartDateObj = new Date(filterStartDate);
        const filterEndDateObj = new Date(filterEndDate);
        return (
          entryDate >= filterStartDateObj &&
          entryDate <= filterEndDateObj
        );
      }
      return true;
    })
    .slice(historialStartIndex, historialEndIndex);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Grupo</TableCell>
          <TableCell>NombresGrupo</TableCell>
          <TableCell>TipoTrabajo</TableCell>
          <TableCell>TrabajoRealizado</TableCell>
          <TableCell>Ubicacion</TableCell>
          <TableCell>Observacion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayedHistorial.map((entry, index) => (
          <TableRow key={entry.ID}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedHistorial.includes(entry.ID)}
                onChange={() => handleHistorialSelect(entry.ID)}
              />
            </TableCell>
            <TableCell>{new Date(entry.Fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short', hour12: false })}</TableCell>
            <TableCell>{entry.Nombre}</TableCell>
            <TableCell>{entry.Grupo === 1 ? 'Si' : entry.Grupo === 2 ? 'No' : ''}</TableCell>
            <TableCell>{entry.NombresGrupo}</TableCell>
            <TableCell>{entry.TipoTrabajo}</TableCell>
            <TableCell>{entry.TrabajoRealizado}</TableCell>
            <TableCell>{entry.Ubicacion}</TableCell>
            <TableCell>{entry.Observacion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {selectedHistorial.length > 0 && (
        <div className="mt-3">
          <Button
            variant="contained"
            color="error"
            onClick={handleEliminarClick}
            className='bg-red-400'
          >
            Eliminar
          </Button>
        </div>
      )}
      {/* Componente de paginación de Material-UI para historial */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={historial.length}
        rowsPerPage={historialRowsPerPage}
        page={historialPage}
        onPageChange={(event, newPage) => setHistorialPage(newPage)}
        onRowsPerPageChange={(event) => {
          setHistorialRowsPerPage(parseInt(event.target.value, 10));
          setHistorialPage(0);
        }}
      />
    </Table>
  );
};

export default Trabajadores;
