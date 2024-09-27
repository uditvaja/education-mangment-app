import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from '../api/api';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      alert('Registration successful');
      // Optionally, reset the form after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setRole('Student');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', boxShadow: 3 }} // Add styling to match the login form
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ marginTop: '16px' }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterForm;
