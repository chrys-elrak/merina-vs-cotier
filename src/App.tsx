import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"

function App() {
  return <Container maxWidth="lg">
   <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Container>
}

export default App
