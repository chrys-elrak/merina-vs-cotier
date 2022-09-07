import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { About } from "./pages/About"
import { Home } from "./pages/Home"

function App() {
  return <Container maxWidth="lg">
   <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  </Container>
}

export default App
