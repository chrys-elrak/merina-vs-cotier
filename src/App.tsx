import {Container} from "@material-ui/core";
import {useContext, useEffect} from 'react';
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import socketIO from 'socket.io-client';
import {getSocketUrl} from "./app.env";
import {MyAlert} from "./components/MyAlert";
import {Navbar} from "./components/Navbar";
import {GlobalContext} from './contexts/global';
import {FacebookDataResponse} from './models/User';
import {Versus} from "./models/Versus";
import {Create} from "./pages/Create";
import {Home} from "./pages/Home";
import {facebookAuthService} from "./services/facebookAuth";

const socket = socketIO(getSocketUrl());

function App() {

    const {setMessage, setIsAuthenticated, setToken, setUser} = useContext(GlobalContext);

    useEffect(() => {
        initSocket();
        const token = localStorage.getItem('token') && setIsAuthenticated(true);
        if (token) {
            setToken(token);
        }
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const initSocket = () => {
        socket.on('FACEBOOK_USER_DATA', (fb: FacebookDataResponse) => {
            setMessage({open: true, text: `Welcome ${fb.data.user.name}`, severity: "success"});
            window.localStorage.setItem('token', fb.data.token);
            window.localStorage.setItem('user', JSON.stringify(fb.data.user));
            setIsAuthenticated(true);
            setToken(fb.data.token);
            setUser(fb.data.user);
        });
        socket.on('NEW_VS_DATA', (data: Versus) => {
            setMessage({open: true, text: `New data received! 🎉`, severity: "success"});
        });
    }


    return <Container maxWidth="lg">
        <MyAlert/>
        <Routes>
            <Route path="" element={
                <>
                    <Navbar handleFacebookLogin={facebookAuthService.login}/>
                    <Outlet/>
                </>
            }>
                <Route path="" element={
                    <Home socket={socket}/>
                }/>
                <Route
                    path="create"
                    element={<Create/>}
                />
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </Container>
}

export default App
