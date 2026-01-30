import React from 'react'
import { CheckCircle, Heart, Target } from 'lucide-react'

export default function About() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-6 gradient-text">About Cafe Clique</h1>

        <div className="space-y-8">
          {/* Mission */}
          <div className="card">
            <Heart className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To create a safe, inclusive space where teens can find genuine friendships based on shared vibes, mindsets, and goals. We believe every teen deserves to find their people—without awkwardness, creeps, or embarrassment.
            </p>
          </div>

          {/* Problem Statement */}
          <div className="card">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-gray-300">
              Shifted to a new locality and have no friends? Feeling lost in a new college? Struggling to find people who "get you"? Traditional social media apps make it hard to find genuine connections with zero awkwardness. That's where Cafe Clique comes in.
            </p>
          </div>

          {/* Features */}
          <div className="card">
            <CheckCircle className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <li>✅ <strong>AI-Powered Matching:</strong> Find friends with your exact vibe</li>
              <li>✅ <strong>Secure Environment:</strong> Verified profiles & safety checks</li>
              <li>✅ <strong>Content Hub:</strong> Posts, Articles, Stories, Reels, Blogs</li>
              <li>✅ <strong>Quiz & Events:</strong> Engaging activities to meet like-minded people</li>
              <li>✅ <strong>The Zeal Club:</strong> Exclusive community for top engagers</li>
              <li>✅ <strong>Admin Monitoring:</strong> Full security & moderation</li>
            </ul>
          </div>

          {/* Credits */}
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-2">Made with ❤️ by</p>
            <h3 className="text-2xl font-bold gradient-text">Tejas Kamble</h3>
            <p className="text-gray-400 mt-2">© 2024 Cafe Clique. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
