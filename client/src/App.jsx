import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Hotel from './pages/hotel/Hotel'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResult from './pages/searchResult/SearchResult'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchresults" element={<SearchResult />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
