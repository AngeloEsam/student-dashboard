import { useState, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const API_URL = 'http://localhost:5000/api/announcements';

interface Announcement {
    _id: string;
    title: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}
type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

const AnnouncementDashboard = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertSeverity }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const { t } = useTranslation();

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch announcements');
            const data = await res.json();
            setAnnouncements(data);
            setError('');
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleOpenDialog = (announcement: Announcement | null = null) => {
        if (announcement) {
            setEditingAnnouncement(announcement);
            setTitle(announcement.title || '');
            setContent(announcement.content || '');
        } else {
            setEditingAnnouncement(null);
            setTitle('');
            setContent('');
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTitle('');
        setContent('');
        setEditingAnnouncement(null);
    };

    const handleSaveAnnouncement = async () => {
        try {
            if (!title.trim()) {
                setSnackbar({ open: true, message: 'Title is required', severity: 'error' });
                return;
            }

            const method = editingAnnouncement ? 'PUT' : 'POST';
            const url = editingAnnouncement ? `${API_URL}/${editingAnnouncement._id}` : API_URL;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error('Failed to save announcement');

            setSnackbar({
                open: true,
                message: editingAnnouncement ? 'Announcement updated successfully' : 'Announcement added successfully',
                severity: 'success',
            });

            handleCloseDialog();
            fetchAnnouncements();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setSnackbar({ open: true, message: err.message, severity: 'error' });
            } else {
                setSnackbar({ open: true, message: String(err), severity: 'error' });
            }
        }
    };

    const handleDeleteAnnouncement = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete announcement');
            setSnackbar({ open: true, message: 'Announcement deleted successfully', severity: 'success' });
            fetchAnnouncements();
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
                    {t('announcementDashboard')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, flexShrink: 0 }}
                >
                    {t('addAnnouncement')}
                </Button>
            </Stack>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={6}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{t('errorFetching')}</Typography>
            ) : announcements.length === 0 ? (
                <Typography>{t('noAnnouncements')}</Typography>
            ) : (
                <TableContainer component={Paper} elevation={10} sx={{ boxShadow: 4, overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 300 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('title')}</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('content')}</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: 150 }} align="center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {announcements.map((a) => (
                                <TableRow
                                    key={a._id}
                                    sx={{
                                        '&:hover': { bgcolor: 'rgba(0, 128, 128, 0.1)' },
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                >
                                    <TableCell>{a.title}</TableCell>
                                    <TableCell>{a.content || '-'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleOpenDialog(a)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteAnnouncement(a._id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingAnnouncement ? t("editAnnouncement") : t('addAnnouncement')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t('title')}
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t('content')}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}> {t('cancel')}</Button>
                    <Button onClick={handleSaveAnnouncement} variant="contained" color="primary">
                        {editingAnnouncement ? t('update') : t('add')}
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

export default AnnouncementDashboard;
