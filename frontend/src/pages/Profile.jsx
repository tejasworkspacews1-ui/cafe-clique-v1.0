import React, { useState } from 'react'
import { User, LogOut, Edit2 } from 'lucide-react'
import api from '../utils/api'

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    interests: user.interests || []
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put(`/users/profile/${user.id}`, formData)
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setEditing(false)
      alert('✅ Profile updated!')
    } catch (error) {
      alert('Error updating profile')
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl">
              <User size={48} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-primary font-semibold">{user.vibe}</p>
            </div>
          </div>

          {/* Edit Form */}
          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="4"
                  className="input-field w-full"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">Save Changes</button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-gray-300 mb-6">{user.bio || 'No bio added yet'}</p>
              <button
                onClick={() => setEditing(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Edit2 size={20} /> Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Friends', count: 0 },
            { label: 'Posts', count: 0 },
            { label: 'The Zeal Club', status: 'pending' }
          ].map((stat, i) => (
            <div key={i} className="card text-center">
              <p className="text-2xl font-bold text-primary">{stat.count || stat.status}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
