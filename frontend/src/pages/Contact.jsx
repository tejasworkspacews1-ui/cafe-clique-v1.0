import React, { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import api from '../utils/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/feedback/submit', {
        ...formData,
        type: 'contact'
      })
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      alert('Error sending message')
    }
    setLoading(false)
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-4 gradient-text">Get In Touch</h1>
        <p className="text-gray-400 mb-16">Have questions? We'd love to hear from you!</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400">support@cafeclique.com</p>
            </div>
            <div className="card">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-400">India 🇮🇳</p>
            </div>
            <div className="card">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-gray-400">+91 XXXXXXXXXX</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card">
            <div className="mb-6">
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

            <div className="mb-6">
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

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Message subject"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="input-field w-full"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : <>Send Message <Send size={20} /></>}
            </button>

            {success && (
              <p className="text-green-400 text-center mt-4">✅ Message sent successfully!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
