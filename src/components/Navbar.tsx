import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Facebook } from '@mui/icons-material'
import { MyTheme } from '../constants/Theme'

export function Navbar() {
  return (
    <>
     <AppBar position="static" style={{marginBottom: 50, background: MyTheme.colors.primary}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Merina vs Cotier
        </Typography>
        <Button variant="outlined" startIcon={<Facebook />} color="inherit">Login with Facebook</Button>
      </Toolbar>
    </AppBar>
    </>
  )
}
