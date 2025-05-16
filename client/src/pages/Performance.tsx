import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', score: 75, tasksCompleted: 20 },
  { month: 'Feb', score: 82, tasksCompleted: 28 },
  { month: 'Mar', score: 90, tasksCompleted: 35 },
  { month: 'Apr', score: 85, tasksCompleted: 32 },
  { month: 'May', score: 88, tasksCompleted: 40 },
  { month: 'Jun', score: 95, tasksCompleted: 45 },
];

const Performance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: 'auto',
        p: { xs: 2, sm: 4 },
        minHeight: '80vh',
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="primary.main"
      >
        Performance Dashboard
      </Typography>

      {/* Line Chart for Scores */}
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 5,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" mb={2} textAlign="center" color="text.primary">
          Monthly Scores
        </Typography>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Bar Chart for Tasks Completed */}
      <Paper
        elevation={4}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" mb={2} textAlign="center" color="text.primary">
          Tasks Completed per Month
        </Typography>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasksCompleted" fill={theme.palette.secondary.main} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Performance;
