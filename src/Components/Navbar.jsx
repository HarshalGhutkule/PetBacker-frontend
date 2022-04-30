import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux';
import { addToken, userData } from '../Redux/action';

const Main = styled.div`
  & a {
    text-decoration:none;
    color:white;
  }
  & p{
    font-size:14px;
    font-weight:600;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const settings = ['Profile', 'Dashboard', 'Add Service', 'Request','Logout'];
const userSettings = ['Profile', 'Dashboard', 'Logout'];

export const Navbar = ()=>{

    const token = useSelector((store)=>store.token) || JSON.parse(localStorage.getItem("token"));

    let user = useSelector((store)=>store.userData);
    if(user.length === 0){
      user = JSON.parse(localStorage.getItem("user"))
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseAdminMenu = (event) => {
    if(event.target.innerText === "Logout"){
      localStorage.setItem("token",JSON.stringify(""));
      localStorage.setItem("user",JSON.stringify(""));
      dispatch(addToken(""));
      dispatch(userData(""));
      navigate("/login");
    }
    else if(event.target.innerText === "Dashboard"){
      navigate("/Dashboard");
    }
    else if(event.target.innerText === "Profile"){
      navigate("/Profile");
    }
    else if(event.target.innerText === "Add Service"){
      navigate("/AddService");
    }
    else if(event.target.innerText === "Request"){
      navigate("/ReservationRequest");
    }
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerText === "Logout"){
      localStorage.setItem("token",JSON.stringify(""));
      localStorage.setItem("user",JSON.stringify(""));
      dispatch(addToken(""));
      dispatch(userData(""));
      navigate("/login");
    }
    else if(event.target.innerText === "Dashboard"){
      navigate("/UserDashboard");
    }
    else if(event.target.innerText === "Profile"){
      navigate("/Profile");
    }
    setAnchorElUser(null);
  };

  return (
      <Main>
    <AppBar position="static" theme={theme}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={"/"}>
                <p>HOME</p>
              </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                theme={theme}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Typography variant="h6" theme={theme} color="secondary" component="div" sx={{ flexGrow: 1 }}>
            PetBacker
            <p style={{fontSize:"8px",lineHeight:"0%"}}>Connect pets to pet lovers</p>
          </Typography>
        {token === "" || token == null ? <Link to={"/Login"}><Button theme={theme} color="secondary">Login</Button></Link> : 
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} theme={theme} sx={{ p: 0 }}>
            <Avatar alt={user && user.FirstName} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        {user._id === "6266f20ca930c254c3aa52e9" ? 
        <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseAdminMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseAdminMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
      :

      <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userSettings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      }
      </Box>
        }
        </Toolbar>
      </Container>
    </AppBar>
    </Main>
  );
};
