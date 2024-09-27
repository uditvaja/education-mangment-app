import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Checkbox,
    FormControlLabel,
    Button,
    Snackbar,
    Grid,
    Card,
    CardContent,
    CardActions,
    Alert
} from '@mui/material';

const EnrollStudent = ({ courseId }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudents(response.data);
            } catch (err) {
                setSnackbarSeverity('error');
                setSnackbarMessage('Error fetching students');
                setSnackbarOpen(true);
                console.error(err);
            }
        };

        fetchStudents();
    }, []);

    const handleEnroll = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3000/api/courses/${courseId}/enroll`, { students: selectedStudents }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSnackbarSeverity('success');
            setSnackbarMessage('Students enrolled successfully');
            setSnackbarOpen(true);
            setSelectedStudents([]);
        } catch (err) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Error enrolling students');
            setSnackbarOpen(true);
            console.error(err);
        }
    };

    const handleSelect = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom align="center">Enroll Students in Course</Typography>
            <Grid container spacing={2}>
                {students.map((student) => (
                    <Grid item xs={12} sm={6} md={4} key={student._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedStudents.includes(student._id)}
                                            onChange={() => handleSelect(student._id)}
                                        />
                                    }
                                    label={student.name}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleEnroll} disabled={selectedStudents.length === 0}>
                    Enroll Selected Students
                </Button>
            </CardActions>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EnrollStudent;
