import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'

export function Navbar() {
  return (
    <>
     <AppBar position="static" style={{marginBottom: 50, background: 'red'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Merina vs Cotier
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    </>
  )
}
