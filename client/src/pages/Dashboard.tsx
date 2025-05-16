import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
