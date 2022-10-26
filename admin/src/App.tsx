import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Users from './pages/Users'
import Hotels from './pages/Hotels'
import Login from './pages/Login'
import Logout from './pages/Logout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="hotels" element={<Hotels />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
