// EditRoleModal.js

import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';
import settings from '@/libs/settings';

const API_URL = settings.apiUrl;

const EditRoleModal = ({ userId, currentRole, onClose, onUpdate }) => {
  const [newRole, setNewRole] = useState(currentRole);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleUpdateRole = async () => {
    try {
      await axios.put(`${API_URL}/users/${userId}/role`, {
        role: newRole,
      });
      onUpdate(newRole);
      onClose();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="edit-role-modal-title"
      aria-describedby="edit-role-modal-description"
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
        <Typography variant="h6" id="edit-role-modal-title">
          Editar Rol del Usuario
        </Typography>
        <TextField
          select
          label="Rol"
          value={newRole}
          onChange={handleRoleChange}
          fullWidth
          margin="normal"
        >
          {/* Aquí debes mapear los roles obtenidos y crear opciones */}
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleUpdateRole}>
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditRoleModal;
