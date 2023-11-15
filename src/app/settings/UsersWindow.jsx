'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  Collapse,
  Card,
  CardContent,
  Avatar,
  Divider,
  Grid,
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Toolbar,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Search from 'antd/es/transfer/search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditRoleModal from './EditRoleModal';
import settings from '@/libs/settings'

const API_URL = settings.apiUrl;

const UsersWindow = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDownloadActive, setIsDownloadActive] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserRole, setEditingUserRole] = useState(null); // Agregar este estado
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // Nuevo campo para el rol del usuario
  });
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles obtenidos

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleCheckboxChange = (userId) => {
    const currentIndex = selectedUsers.indexOf(userId);
    const newSelectedUsers = [...selectedUsers];

    if (currentIndex === -1) {
      newSelectedUsers.push(userId);
    } else {
      newSelectedUsers.splice(currentIndex, 1);
    }

    setSelectedUsers(newSelectedUsers);
    setIsDownloadActive(newSelectedUsers.length > 0);
  };

  const handleDownload = () => {
    const selectedUsersData = users.filter((user) => selectedUsers.includes(user.id));
    const worksheet = XLSX.utils.json_to_sheet(selectedUsersData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'selected_users.xlsx');

    setIsDownloadActive(false);
    setSelectedUsers([]);
  };
  const openEditModal = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };
  
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const handleEditRole = (userId, currentRole) => {
    setEditingUserId(userId);
    setEditingUserRole(currentRole);
  };

  // Función para actualizar el rol después de la edición
  const handleRoleUpdate = (newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/users/${selectedUserId}`);
      const updatedUsers = users.filter((user) => user.id !== selectedUserId);
      setUsers(updatedUsers);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
    openEditModal(userId);
  };
  

  const handleAccordionToggle = (userId) => {
    setExpandedRow(expandedRow === userId ? null : userId);
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(`${API_URL}/users`, {
        username: newUserData.name,
        email: newUserData.email,
        password: newUserData.password,
        role: newUserData.role, // Agregar el campo del rol al crear el usuario
      });

      setShowCreateModal(false);
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setNewUserData({
        name: '',
        email: '',
        password: '',
        role: '', // Restablecer el campo del rol después de la creación
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Container className='flex items-center justify-between'> 
          <Toolbar>
            <Search />
          </Toolbar>
          <div>
            <Tooltip title={`Descargar ${selectedUsers.length} usuarios`} arrow>
            <IconButton color="primary" onClick={() => openEditModal(user.id)}>
            <EditIcon />
          </IconButton>
            </Tooltip>
            <AddCircleOutlineIcon variant="contained" fontSize='large' color="primary" onClick={() => setShowCreateModal(true)} />
          </div>
        </Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>
                    {user.roles.map((role, index) => (
                      <span key={index}>
                        {role.name}
                        {index < user.roles.length - 1 && ', '}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleAccordionToggle(user.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEditUser(user.id)}>
                      {editingUserId && (
                        <EditRoleModal
                          userId={editingUserId}
                          currentRole={editingUserRole}
                          onClose={() => setEditingUserId(null)}
                          onUpdate={handleRoleUpdate}
                        />
                      )}
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Collapse in={expandedRow === user.id} timeout="auto" unmountOnExit>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Card>
                            <CardContent>
                              <Typography variant="subtitle2">Status: {user.status}</Typography>
                              <Avatar src={user.avatar} sx={{ width: 80, height: 80, my: 2 }} />
                              <Typography variant="subtitle1">{user.name}</Typography>
                              <Typography variant="body2">Role: {user.role}</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                  <EmailIcon />
                                </Grid>
                                <Grid item>Email: {user.email}</Grid>
                              </Grid>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                  <PhoneIcon />
                                </Grid>
                                <Grid item>Phone: {user.phone}</Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={9}>
                          <Card>
                            <CardContent>
                              {/* Detalles personales */}
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        aria-labelledby="create-user-modal-title"
        aria-describedby="create-user-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="create-user-modal-title">
            Crear Nuevo Usuario
          </Typography>
          <TextField
            label="Nombre"
            value={newUserData.name}
            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            value={newUserData.password}
            onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
            type="password"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCreateUser}>
            Crear
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersWindow;
