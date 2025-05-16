import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const coursesData = [
  { id: 1, title: 'React Basics', description: 'Learn the fundamentals of React.js.' },
  { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into modern JavaScript features.' },
  { id: 3, title: 'UI/UX Design', description: 'Principles of good design and user experience.' },
  { id: 4, title: 'Node.js API', description: 'Build scalable backend APIs with Node.js.' },
];

const Courses = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        p: { xs: 2, sm: 4, md: 6 },
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Available Courses
      </Typography>

      <Grid container spacing={4}>
        {coursesData.map(({ id, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                px: 2,
                py: 3,
                minHeight: 200,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="medium" variant="contained" color="primary" fullWidth>
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
