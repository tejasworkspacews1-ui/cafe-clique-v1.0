import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import ZealClub from './pages/ZealClub'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'
import './styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/club" element={<ZealClub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        {/* Footer */}
        <footer className="border-t border-gray-700 mt-20 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-gray-400 space-y-2">
            <p>© 2024 Cafe Clique - Find Your Vibe, Make Real Friends</p>
            <p className="text-sm">Made with ❤️ by <span className="text-primary font-semibold">Tejas Kamble</span></p>
            <p className="text-xs mt-4">
              <a href="/feedback" className="hover:text-primary">Report Issue</a> • 
              <a href="/contact" className="hover:text-primary ml-2">Contact Us</a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
