import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Home, Users, BookOpen, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold gradient-text">☕</div>
            <span className="text-2xl font-black group-hover:text-primary smooth-transition">
              Cafe Clique
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary smooth-transition flex items-center gap-1">
              <Home size={20} /> Home
            </Link>
            <Link to="/about" className="hover:text-primary smooth-transition flex items-center gap-1">
              <Users size={20} /> About
            </Link>
            <Link to="/club" className="hover:text-primary smooth-transition flex items-center gap-1">
              <BookOpen size={20} /> The Zeal Club
            </Link>
            <Link to="/contact" className="hover:text-primary smooth-transition flex items-center gap-1">
              📧 Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="btn-secondary flex items-center gap-1">
                  <User size={20} /> Profile
                </Link>
                <button onClick={handleLogout} className="btn-primary flex items-center gap-1">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/register" className="btn-primary">Join Now</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-pulse">
            <Link to="/" className="block hover:text-primary smooth-transition">Home</Link>
            <Link to="/about" className="block hover:text-primary smooth-transition">About</Link>
            <Link to="/club" className="block hover:text-primary smooth-transition">The Zeal Club</Link>
            <Link to="/contact" className="block hover:text-primary smooth-transition">Contact</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block btn-secondary w-full text-center">Profile</Link>
                <button onClick={handleLogout} className="block btn-primary w-full">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block btn-secondary w-full text-center">Login</Link>
                <Link to="/register" className="block btn-primary w-full text-center">Join Now</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
