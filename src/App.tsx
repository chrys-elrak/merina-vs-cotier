import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import socketIO from 'socket.io-client';

const socket = socketIO('https://localhost:5000');

function App() {
  return <Container maxWidth="lg">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
    </Routes>
  </Container>
}

export default App
