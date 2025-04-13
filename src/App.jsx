import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
// import other pages when ready (e.g. Services, Contact, etc.)

function App() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      {/* Add more routes like below when needed */}
      {/* <Route path="/services" element={<Services />} /> */}
    </Routes>
  )
}

export default App
