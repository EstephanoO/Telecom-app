import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    // Aquí puedes realizar la lógica para enviar los datos del nuevo usuario al backend
    onCreate({ name, email, password });
    // Limpia los campos y cierra el modal después de crear el usuario
    setName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
