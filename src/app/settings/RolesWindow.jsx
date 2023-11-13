'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

const RolesWindow = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);

  // Function to fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };



  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async () => {
    try {
      // Usar 'name' en lugar de 'roleName' en el cuerpo de la solicitud
      const response = await axios.post('http://localhost:3000/api/roles', { name: newRoleName });
      console.log('Role created:', response.data);
      fetchRoles(); // Actualizar la lista de roles
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRoleName = async (roleId, newRoleName) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/roles/${roleId}`, { roleName: newRoleName });
      console.log('Role updated:', response.data);
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error('Error updating role name:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/roles/${roleId}`);
      console.log('Role deleted:', response.data);
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <Card className=' bg-white p-8 mr-12 shadow-lg shadow-black' sx={{width:'auto'}}>
    <div>
      <Typography variant="h5" gutterBottom>
        Manage Roles
      </Typography>
      <TextField
        label="New Role Name"
        variant="outlined"
        fullWidth
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.target.value)}
      />

      <div className="mt-2">
        <Button
          variant="contained"
          color="primary"
          className='bg-slate-400'
          onClick={handleCreateRole}
        >
          Create Role
        </Button>
      </div>

      <TableContainer component={Paper} className="mt-4">
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Role</TableCell>
        <TableCell>Count</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {roles.map((role) => (
        <TableRow key={role.id}>
          <TableCell
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleUpdateRoleName(role.id, e.target.innerText)}
          >
            {role.name}
          </TableCell>
          <TableCell>{role.count}</TableCell>
          <TableCell>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteRole(role.id)}
            >
              <DeleteIcon
               />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
    </Card>
  );
};

export default RolesWindow;