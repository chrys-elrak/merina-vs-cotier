import { Container } from "@material-ui/core";
import { useContext, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import socketIO from 'socket.io-client';
import { getFbClientId, getFbRedirectUri, getSocketUrl } from "./app.env";
import { MyAlert } from "./components/MyAlert";
import { Navbar } from "./components/Navbar";
import { GlobalContext } from './contexts/global';
import { GlobalContextProvider } from './contexts/global/provider';
import { FacebookDataResponse } from './models/User';
import { Home } from "./pages/Home";

const socket = socketIO(getSocketUrl());

function App() {

  const { setMessage } = useContext(GlobalContext);

  useEffect(() => {
    socket.on('FACEBOOK_USER_DATA', (fb: FacebookDataResponse) => {
      setMessage({ open: true, text: `Welcome ${fb.data.user.name}`, severity: "success" });
    });
  }, []);

  const handleFacebookLogin = () => {
    // open Facebook login popup
    const url = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${getFbClientId()}&redirect_uri=${getFbRedirectUri()}&display=popup&response_type=token&auth_type=rerequest `;
    window.open(url, '_blank', 'width=600,height=600');
  }

  return <Container maxWidth="lg">
    <MyAlert />
    <Navbar handleFacebookLogin={handleFacebookLogin} />
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
    </Routes>
  </Container>
}

export default App
