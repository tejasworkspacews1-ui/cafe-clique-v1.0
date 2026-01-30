import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    city: '',
    state: '',
    vibe: 'bookworm',
    interests: []
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        interests: checked
          ? [...formData.interests, value]
          : formData.interests.filter(i => i !== value)
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
        city: formData.city,
        state: formData.state,
        vibe: formData.vibe,
        interests: formData.interests
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/profile')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2">Join Cafe Clique 🎉</h1>
        <p className="text-gray-400 mb-6">Find your vibe, make real friends</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="13"
              max="25"
              className="input-field w-full"
              placeholder="Your age"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Your city"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Your state"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Your Vibe</label>
            <select
              name="vibe"
              value={formData.vibe}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="bookworm">📚 Bookworm</option>
              <option value="party-animal">🎉 Party Animal</option>
              <option value="fitness-freak">💪 Fitness Freak</option>
              <option value="tech-geek">🤓 Tech Geek</option>
              <option value="artist">🎨 Artist</option>
              <option value="gamer">🎮 Gamer</option>
              <option value="foodie">🍽️ Foodie</option>
              <option value="traveler">✈️ Traveler</option>
              <option value="social-butterfly">🦋 Social Butterfly</option>
              <option value="introvert">🏠 Introvert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Interests (Select Multiple)</label>
            <div className="space-y-2">
              {['Music', 'Sports', 'Art', 'Tech', 'Travel', 'Coding'].map(interest => (
                <label key={interest} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="Create password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Join Cafe Clique'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already a member? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
