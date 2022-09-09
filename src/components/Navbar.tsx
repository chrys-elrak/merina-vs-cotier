import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Facebook } from '@mui/icons-material'
import { MyTheme } from '../constants/Theme'


interface NavbarProps {
  handleFacebookLogin: () => void;
}

export function Navbar({ handleFacebookLogin } : NavbarProps) {

  return (
    <>
     <AppBar position="static" style={{marginBottom: 50, background: MyTheme.colors.primary}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ampitahao
        </Typography>
        <Button variant="outlined" startIcon={<Facebook />} onClick={handleFacebookLogin} color="inherit">Login with Facebook</Button>
      </Toolbar>
    </AppBar>
    </>
  )
}
