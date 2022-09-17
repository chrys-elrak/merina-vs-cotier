import { AppBar, Avatar, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Facebook, Home, HomeOutlined, Logout, Send } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { MyTheme } from '../constants/Theme';
import { GlobalContext } from '../contexts/global';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
interface NavbarProps {
  handleFacebookLogin: () => void;
}

export function Navbar({ handleFacebookLogin }: NavbarProps) {

  const { isAuthenticated, user, setIsAuthenticated, setUser, setToken } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigation = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    handleClose();
  }
  return (
    <>
      <AppBar position="static" style={{ marginBottom: 50, background: MyTheme.colors.primary }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigation("/home")} color="inherit" aria-label="menu">
            <HomeOutlined />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Ampitahao
          </Typography>
          {isAuthenticated ?
            <>
              <Button onClick={handleClick}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Tooltip title={user.name}>
                  <Avatar alt={user.name} src={user.picture.data.url} />
                </Tooltip>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => navigation('create')}>
                  <ListItemIcon>
                    <Send fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Publish</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </> :
            <>
              <Button variant="text" startIcon={<Facebook />} onClick={handleFacebookLogin} style={{ backgroundColor: 'blue', color: 'white' }}>Login with Facebook</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
