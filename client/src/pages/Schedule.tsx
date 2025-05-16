import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Schedule = () => {
  const scheduleData = [
    { day: 'Monday', tasks: ['Meeting', 'Design Review'] },
    { day: 'Tuesday', tasks: ['Development', 'Code Review'] },
    { day: 'Wednesday', tasks: ['Testing', 'Deployment'] },
  ];

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ p: 4, bgcolor: '#e0f7fa', minHeight: '100vh' }}>
      {scheduleData.map(({ day, tasks }) => (
        <Grid item xs={12} sm={6} md={4} key={day}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>{day}</Typography>
            {tasks.map((task, idx) => (
              <Typography key={idx} variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#004d40' }}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1, color: '#26a69a' }} />
                {task}
              </Typography>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Schedule;
