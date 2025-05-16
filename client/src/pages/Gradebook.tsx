import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useMediaQuery,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const gradesData = [
  { id: 1, student: 'Ahmed Ali', course: 'React Basics', grade: 85, status: 'Pass' },
  { id: 2, student: 'Sara Mohamed', course: 'Advanced JavaScript', grade: 92, status: 'Pass' },
  { id: 3, student: 'Omar Hassan', course: 'UI/UX Design', grade: 74, status: 'Pass' },
  { id: 4, student: 'Laila Nabil', course: 'Node.js API', grade: 67, status: 'Pass' },
  { id: 5, student: 'Yousef Adel', course: 'React Basics', grade: 55, status: 'Fail' },
];

const Gradebook = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        maxWidth: 1100,
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
        Gradebook Overview
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <Table
          aria-label="gradebook table"
          sx={{
            minWidth: 320,
            '& thead th': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontWeight: 'bold',
            },
            '& tbody tr:hover': {
              backgroundColor: theme.palette.action.hover,
              cursor: 'pointer',
              transform: 'scale(1.02)',
              transition: 'transform 0.2s',
            },
          }}
          size={isMobile ? 'small' : 'medium'}
        >
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align="center">Grade (%)</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradesData.map(({ id, student, course, grade, status }) => (
              <TableRow key={id} hover>
                <TableCell>{student}</TableCell>
                <TableCell>{course}</TableCell>
                <TableCell align="center">{grade}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: status === 'Pass' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" size={isMobile ? 'medium' : 'large'}>
          Download Report
        </Button>
      </Box>
    </Box>
  );
};

export default Gradebook;
