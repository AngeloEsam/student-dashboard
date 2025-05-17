import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../app/store';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };


  const handleLanguageChange = (lng: 'en' | 'ar') => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {t("welcome")}, {user?.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => handleLanguageChange("ar")} variant="outlined">AR</Button>
          <Button onClick={() => handleLanguageChange("en")} variant="outlined">EN</Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            {t("logout")}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
