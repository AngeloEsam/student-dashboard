// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// import type { RootState, AppDispatch } from '../app/store';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useTranslation } from "react-i18next";
// import i18n from '../i18n';

// const Header = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const { t } = useTranslation();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <AppBar position="static" color="default" elevation={1} >
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h6">Welcome, {user?.name}</Typography>
//         <Button variant="contained" color="error" onClick={handleLogout}>
//           {t("logout")}
//         </Button>
//         <Button onClick={() => i18n.changeLanguage("ar")}>AR</Button>
//         <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>

//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;




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

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {t("welcome")}, {user?.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => i18n.changeLanguage("ar")} variant="outlined">AR</Button>
          <Button onClick={() => i18n.changeLanguage("en")} variant="outlined">EN</Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            {t("logout")}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
