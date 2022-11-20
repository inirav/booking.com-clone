import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Users from './pages/Users'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Properties from './pages/Properties'
import Reservations from './pages/Reservations'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="properties" element={<Properties />} />
            <Route path="reservations" element={<Reservations />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
