import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Alert,
    CircularProgress,
    Box,
    Card,
    CardContent
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EnrollStudent from './EnrollStudent';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3000/api/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourse(response.data);
            } catch (err) {
                setError('Error fetching course details');
                console.error(err);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" align="center">Loading course details...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>{course.title}</Typography>
                    <Typography variant="body1"><strong>Description:</strong> {course.description}</Typography>
                    <Typography variant="body1"><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>Teacher:</strong> {course.teacher?.name || 'Unknown'}</Typography>
                </CardContent>
            </Card>
            <EnrollStudent courseId={course._id} />
        </Container>
    );
};

export default CourseDetail;
