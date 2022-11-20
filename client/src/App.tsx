import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BaseStyles from './BaseStyles'
import SearchResults from './pages/SearchResults'
import PropertyPage from './pages/PropertyPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Bookings from './pages/Booking'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <BaseStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search_results" element={<SearchResults />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{ duration: 6000 }} />
    </>
  )
}

export default App
