import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import HomePage from './pages/Home'
import NavbarLayout from './layouts/NavBar'
import ServicesPage from "./pages/Services";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavbarLayout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
