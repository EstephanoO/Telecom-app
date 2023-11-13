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

const UsersWindow = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [users, setUsers] = useState([]);
  const [newUserPhonenumbre, setNewUserPhonenumbre] = useState('');

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/profile', {
        nombre: newUserName,
        password: newUserPassword,
        rol_id: newUserRole,
        phone: newUserPhonenumbre,
      });
      console.log('User created:', response.data);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/profile/${userId}`);
      console.log('User deleted:', response.data);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card className=' bg-white p-8 mr-8 shadow-lg shadow-black' sx={{width:'auto'}}>
          <div>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        value={newUserPassword}
        onChange={(e) => setNewUserPassword(e.target.value)}
      />
      <TextField
        label="Role"
        type='number'
        variant="outlined"
        fullWidth
        value={newUserRole}
        onChange={(e) => setNewUserRole(e.target.value)}
      />
            <TextField
        label="Numero de phone"
        variant="outlined"
        fullWidth
        value={newUserPhonenumbre}
        onChange={(e) => setNewUserPhonenumbre(e.target.value)}
      />

      <div className="mt-2">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
          className='bg-slate-400'
        >
          Create User
        </Button>
      </div>

      <TableContainer component={Paper} className="mt-4 bg-slate-100">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.length > 0 ? user.roles[0].name : 'Sin Rol'}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
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

export default UsersWindow;