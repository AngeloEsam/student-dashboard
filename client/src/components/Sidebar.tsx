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
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const direction = i18n.dir();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: t('sidebarDashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('sidebarSchedule'), icon: <ScheduleIcon />, path: 'schedule' },
    { text: t('sidebarCourses'), icon: <SchoolIcon />, path: 'courses' },
    { text: t('sidebarGradebook'), icon: <GradeIcon />, path: 'gradebook' },
    { text: t('sidebarPerformance'), icon: <BarChartIcon />, path: 'performance' },
    { text: t('sidebarAnnouncement'), icon: <CampaignIcon />, path: 'announcement' },
  ];

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
      <Drawer
        anchor={direction === 'rtl' ? 'right' : 'left'}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
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
