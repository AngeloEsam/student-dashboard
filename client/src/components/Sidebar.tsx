import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Schedule', icon: <ScheduleIcon />, path: 'schedule' },
  { text: 'Courses', icon: <SchoolIcon />, path: 'courses' },
  { text: 'Gradebook', icon: <GradeIcon />, path: 'gradebook' },
  { text: 'Performance', icon: <BarChartIcon />, path: 'performance' },
  { text: 'Announcement', icon: <CampaignIcon />, path: 'announcement' },
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // true if screen width <= md breakpoint
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: 'teal',
        height: '100%',
        color: 'white',
      }}
      role="presentation"
      onClick={isMobile ? handleDrawerToggle : undefined}
      onKeyDown={isMobile ? handleDrawerToggle : undefined}
    >
      <Box p={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
          Coligo
        </Typography>
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <NavLink
              to={path}
              key={text}
              style={{ textDecoration: 'none', color: 'inherit' }}
              end={path === '/dashboard'}
            >
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* زر الهامبرغر يظهر فقط في الشاشات الصغيرة */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m: 1, position: 'fixed', top: 0, left: 0, zIndex: 1301 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer ثابت على الشاشات الكبيرة، متحرك على الشاشات الصغيرة */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // improves performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'teal',
            color: 'white',
          },
          flexShrink: 0,
          width: { md: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
