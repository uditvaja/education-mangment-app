import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const CourseForm = ({ courseId, onSave, authToken }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    teacher: '',
  });

  useEffect(() => {
    if (courseId) {
      axios
        .get(`http://localhost:3000/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const course = response.data;
          console.log('Course data:', course);
          setCourseData({
            title: course.title,
            description: course.description,
            startDate: course.startDate.substring(0, 10),
            endDate: course.endDate.substring(0, 10),
            teacher: course.teacher,
          });
        })
        .catch((error) => console.error('Error fetching course data:', error));
    }
  }, [courseId, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/courses', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Course created:', response.data);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <>
   <br/>
   <br/>
   <br/>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        {courseId ? 'Update Course' : 'Create Course'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={courseData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Start Date"
          variant="outlined"
          type="date"
          name="startDate"
          value={courseData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          name="endDate"
          value={courseData.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Teacher ID"
          variant="outlined"
          name="teacher"
          value={courseData.teacher}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          {courseId ? 'Update Course' : 'Create Course'}
        </Button>
      </Box>
    </Container>
    </>
  );
};

export default CourseForm;
