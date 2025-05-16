import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const API_URL = 'http://localhost:5000/api/quizzes';

interface Quiz {
  _id: string;
  title: string;
  course?: string;
  createdAt?: string;
  updatedAt?: string;
}
type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

const MainDashboard = () => {
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertSeverity }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch quizzes');
      const data = await res.json();
      setQuizzes(data);
      setError('');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleOpenDialog = (quiz: Quiz | null = null) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setTitle(quiz.title || '');
      setCourse(quiz.course || '');
    } else {
      setEditingQuiz(null);
      setTitle('');
      setCourse('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTitle('');
    setCourse('');
    setEditingQuiz(null);
  };

  const handleSaveQuiz = async () => {
    try {
      if (!title.trim()) {
        setSnackbar({ open: true, message: 'Title is required', severity: 'error' });
        return;
      }

      const method = editingQuiz ? 'PUT' : 'POST';
      const url = editingQuiz ? `${API_URL}/${editingQuiz._id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, course }),
      });

      if (!res.ok) throw new Error('Failed to save quiz');

      setSnackbar({
        open: true,
        message: editingQuiz ? 'Quiz updated successfully' : 'Quiz added successfully',
        severity: 'success',
      });
      handleCloseDialog();
      fetchQuizzes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSnackbar({ open: true, message: err.message, severity: 'error' });
      } else {
        setSnackbar({ open: true, message: String(err), severity: 'error' });
      }
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete quiz');
      setSnackbar({ open: true, message: 'Quiz deleted successfully', severity: 'success' });
      fetchQuizzes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSnackbar({ open: true, message: err.message, severity: 'error' });
      } else {
        setSnackbar({ open: true, message: String(err), severity: 'error' });
      }
    }
  };

  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, flexGrow: 1 }}
        >
          Quizzes Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, flexShrink: 0 }}
        >
          Add Quiz
        </Button>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : quizzes.length === 0 ? (
        <Typography>No quizzes available.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={10} sx={{ boxShadow: 4, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: 150 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow
                  key={quiz._id}
                  sx={{
                    '&:hover': { bgcolor: 'rgba(0, 128, 128, 0.1)' },
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.course || '-'}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(quiz)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: 1,
            width: '100%',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
            paddingX: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: 'auto',
            paddingBottom: 2,
            paddingX: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
          />
          <TextField
            margin="dense"
            label="Course"
            fullWidth
            variant="outlined"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            sx={{ mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}
          />
        </DialogContent>
        <DialogActions sx={{ paddingX: { xs: 2, sm: 3, md: 4 } }}>
          <Button onClick={handleCloseDialog} color="inherit" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Cancel
          </Button>
          <Button onClick={handleSaveQuiz} variant="contained" color="primary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            {editingQuiz ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainDashboard;
