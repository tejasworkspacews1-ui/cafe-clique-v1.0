import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.get('/admin/dashboard', {
        headers: { 'x-admin-password': adminPassword }
      })
      setIsAuthenticated(true)
      setStats(response.data.stats)
      fetchUsers()
      fetchFeedbacks()
    } catch (error) {
      alert('❌ Invalid admin password!')
    }
    setLoading(false)
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users', {
        headers: { 'x-admin-password': adminPassword }
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users')
    }
  }

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get('/admin/feedback', {
        headers: { 'x-admin-password': adminPassword }
      })
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks')
    }
  }

  const deleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`, {
          headers: { 'x-admin-password': adminPassword }
        })
        setUsers(users.filter(u => u._id !== userId))
        alert('✅ User deleted')
      } catch (error) {
        alert('Error deleting user')
      }
    }
  }

  const respondToFeedback = async (feedbackId, response) => {
    try {
      await api.put(`/admin/feedback/${feedbackId}/respond`, { adminResponse: response }, {
        headers: { 'x-admin-password': adminPassword }
      })
      alert('✅ Response sent!')
      fetchFeedbacks()
    } catch (error) {
      alert('Error responding to feedback')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-dark">
        <div className="card max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2 text-primary">Admin Panel 🔐</h1>
          <p className="text-gray-400 mb-6">Only authorized admins can access</p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="input-field w-full"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            For authorized administrators only
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 gradient-text">Admin Dashboard 📊</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-gray-700">
          {['dashboard', 'users', 'feedback'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold smooth-transition border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers },
              { label: 'Total Content', value: stats.totalContent },
              { label: 'Total Feedback', value: stats.totalFeedback },
              { label: 'New Feedback', value: stats.newFeedback }
            ].map((stat, i) => (
              <div key={i} className="card text-center">
                <p className="text-3xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Age</th>
                  <th className="text-left p-4">Vibe</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-700 hover:bg-darkCard/50">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.age}</td>
                    <td className="p-4">{user.vibe}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-400 hover:text-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            {feedbacks.map(feedback => (
              <div key={feedback._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{feedback.subject}</h3>
                    <p className="text-sm text-gray-400">
                      By: {feedback.email} • Type: {feedback.type}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    feedback.status === 'new' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {feedback.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{feedback.message}</p>

                {!feedback.adminResponse && (
                  <input
                    type="text"
                    placeholder="Type your response..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        respondToFeedback(feedback._id, e.target.value)
                        e.target.value = ''
                      }
                    }}
                    className="input-field w-full"
                  />
                )}

                {feedback.adminResponse && (
                  <p className="text-primary text-sm mt-3">✅ Response: {feedback.adminResponse}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
