import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
  Avatar,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import settings from '@/libs/settings';

const API_URL = settings.apiUrl;

const EditCustomerModal = ({ userId, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    status: '',
    contact: '',
    country: '',
    address: '',
    about: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`${API_URL}/users/${userId}`, userDetails);
      onClose();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Grid container alignItems="center">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Edit Customer
          </Typography>
        </Grid>
      </DialogTitle>
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Avatar sx={{ width: 100, height: 100 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={userDetails.lastName}
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                fullWidth
                value={userDetails.age}
                onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Gender"
                fullWidth
                value={userDetails.gender}
                onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
              >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="male">Hombre</MenuItem>
                <MenuItem value="female">Mujer</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Status"
                fullWidth
                value={userDetails.status}
                onChange={(e) => setUserDetails({ ...userDetails, status: e.target.value })}
              >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="active">Activo</MenuItem>
                <MenuItem value="inactive">Inactivo</MenuItem>
                <MenuItem value="pending">Pendiente</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact"
                fullWidth
                value={userDetails.contact}
                onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country"
                fullWidth
                value={userDetails.country}
                onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                fullWidth
                value={userDetails.address}
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="About"
                fullWidth
                multiline
                minRows={3}
                value={userDetails.about}
                onChange={(e) => setUserDetails({ ...userDetails, about: e.target.value })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" p={2}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Grid>
    </Dialog>
  );
};

export default EditCustomerModal;
