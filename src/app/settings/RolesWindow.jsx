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

import Box from '@mui/material/Box';

import settings from '@/libs/settings';

const API_URL = settings.apiUrl;

const RolesWindow = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
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
      const response = await axios.post(`${API_URL}/roles`, { name: newRoleName });
      console.log('Role created:', response.data);
      fetchRoles();
      setNewRoleName('');
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRoleName = async (roleId, newRoleName) => {
    try {
      const response = await axios.put(`${API_URL}/roles/${roleId}`, { name: newRoleName });
      console.log('Role updated:', response.data);
      fetchRoles();
    } catch (error) {
      console.error('Error updating role name:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`${API_URL}/roles/${roleId}`);
      console.log('Role deleted:', response.data);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <Card className='bg-white p-8 mr-12 shadow-lg shadow-black' sx={{ width: 'auto' }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Manage Roles
        </Typography>
        <TextField
          label="New Role Name"
          variant="outlined"
          fullWidth
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRole}
          sx={{ mb: 2 }}
        >
          Create Role
        </Button>
        <TableContainer component={Paper}>
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
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default RolesWindow;
