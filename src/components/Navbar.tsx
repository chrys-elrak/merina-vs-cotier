import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Facebook } from '@mui/icons-material'
import { MyTheme } from '../constants/Theme'
const clientId = '8024871117554237';
const appSecret = '5c6f6969a96d11da65bc18236a5024ec';
const redirectUri = 'https://localhost:5000';

const urlForAccessToken = `https://graph.facebook.com/oauth/access_token?client_id=8024871117554237&client_secret=5c6f6969a96d11da65bc18236a5024ec&grant_type=client_credentials`;
const withouAT = `https://graph.facebook.com/{api-endpoint}&access_token=${clientId}|${appSecret}`;
export function Navbar() {
  const handleFacebookLogin = () => {
    // open facebook login popup
    const url = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&display=popup&response_type=token&auth_type=rerequest `;
    window.open(url, '_blank', 'width=600,height=600');
  }
  return (
    <>
     <AppBar position="static" style={{marginBottom: 50, background: MyTheme.colors.primary}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Merina vs Cotier
        </Typography>
        <Button variant="outlined" startIcon={<Facebook />} onClick={handleFacebookLogin} color="inherit">Login with Facebook</Button>
      </Toolbar>
    </AppBar>
    </>
  )
}
