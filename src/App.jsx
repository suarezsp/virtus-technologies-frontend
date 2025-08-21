import { useState } from 'react'
import HomePage from './pages/Home'
import NavbarLayout from './layouts/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavbarLayout/>
      <HomePage/>
    </div>
  )
}

export default App
