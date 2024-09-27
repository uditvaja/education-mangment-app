import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from React Router

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
      try {
        const response = await axios.get('http://localhost:3000/api/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data); // Set the courses in the state
      } catch (err) {
        setError('Error fetching courses');
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Course List
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {courses.length > 0 ? (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Description:</strong> {course.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Teacher:</strong> {course.teacher?.name || 'Unknown'}
                  </Typography>
                  <Button 
  variant="contained" 
  color="primary" 
  component={Link} // Use Link for navigation
  to={`/courses/${course._id}`} // Navigate to course detail page
  sx={{ mt: 2 }}
>
  View Course
</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No courses available
        </Typography>
      )}
    </Container>
  );
};

export default CourseList;
