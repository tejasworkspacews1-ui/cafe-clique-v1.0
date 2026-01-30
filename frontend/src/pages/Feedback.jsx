import React, { useState } from 'react'
import { FileText, AlertCircle, MessageSquare, CheckCircle } from 'lucide-react'
import api from '../utils/api'

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState('suggestion')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 5
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/feedback/submit', {
        ...formData,
        type: feedbackType
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '', rating: 5 })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      alert('Error submitting feedback')
    }
    setLoading(false)
  }

  const feedbackOptions = [
    { value: 'suggestion', label: '💡 Suggestion', icon: <FileText /> },
    { value: 'review', label: '⭐ Review', icon: <CheckCircle /> },
    { value: 'complaint', label: '⚠️ Complaint', icon: <AlertCircle /> },
    { value: 'concern', label: '🤔 Concern', icon: <MessageSquare /> }
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Share Your Feedback</h1>
        <p className="text-gray-400 mb-12">Help us improve Cafe Clique! We read every single feedback.</p>

        <form onSubmit={handleSubmit} className="card">
          {/* Feedback Type */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-4">What's your feedback about?</label>
            <div className="grid grid-cols-2 gap-4">
              {feedbackOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFeedbackType(option.value)}
                  className={`p-4 rounded-lg border-2 smooth-transition text-left flex items-center gap-3 ${
                    feedbackType === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-700 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{option.label.split(' ')[0]}</span>
                  <span>{option.label.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
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
              placeholder="Brief subject"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="input-field w-full"
              placeholder="Tell us what you think... (Min 10 characters)"
              minLength="10"
            />
          </div>

          {feedbackType === 'review' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Rating</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-3xl smooth-transition ${
                      formData.rating >= star ? 'text-primary scale-110' : 'text-gray-600'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {submitted && (
            <p className="text-green-400 text-center mt-4 flex items-center justify-center gap-2">
              <CheckCircle size={20} /> Thanks for your feedback! We'll review it shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
