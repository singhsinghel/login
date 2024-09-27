import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Submit from './components/Submit'
import Admin from './components/Admin'
import CreateAdmin from './components/CreateAdmin'
import Login from './components/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success-page" element={<Submit />} />
        <Route path="/api/admin/leads" element={<Admin />} />
        <Route path="/api/admin/register" element={<CreateAdmin />} />
        <Route path="/api/admin/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
