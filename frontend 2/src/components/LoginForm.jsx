import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.role);
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error(error);
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
        sx={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', boxShadow: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
