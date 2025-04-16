import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout  from './components/layout/Layout'
import About from './pages/About'
import Services from './pages/Services'
import Videos from './pages/Videos'
// import other pages when ready (e.g. Services, Contact, etc.)

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/videos" element={<Videos />} />
      </Route>
    </Routes>
  );
}

export default App
