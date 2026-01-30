import React from 'react'
import { Flame, Trophy, Users } from 'lucide-react'

export default function ZealClub() {
  const benefits = [
    'Exclusive member badge on profile',
    'Early access to new features',
    'Featured in top members section',
    'Special events & meetups',
    'Direct support from admin team',
    'Merchandise & rewards'
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 gradient-text">The Zeal Club 🔥</h1>
          <p className="text-xl text-gray-300">For the most engaged & awesome members of Cafe Clique</p>
        </div>

        {/* How to Join */}
        <div className="card mb-12">
          <Trophy className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">How to Join?</h2>
          <p className="text-gray-300 mb-6">
            Be an active member! Create engaging content, participate in quizzes, attend events, and help other members. Our AI will automatically recognize your contributions.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Flame className="text-primary" />
              <span>Post regularly (Articles, Stories, Blogs)</span>
            </div>
            <div className="flex items-center gap-3">
              <Flame className="text-primary" />
              <span>Participate in quiz challenges</span>
            </div>
            <div className="flex items-center gap-3">
              <Flame className="text-primary" />
              <span>Attend & organize events</span>
            </div>
            <div className="flex items-center gap-3">
              <Flame className="text-primary" />
              <span>Build genuine friendships</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="card mb-12">
          <Users className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-6">Member Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-darkCard/50 rounded-lg p-4 border border-primary/20">
                <p className="text-gray-300">⭐ {benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { count: '5K+', label: 'Active Members' },
            { count: '50K+', label: 'Friendships Made' },
            { count: '100%', label: 'Safe & Verified' }
          ].map((stat, i) => (
            <div key={i} className="card text-center">
              <p className="text-4xl font-black text-primary mb-2">{stat.count}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
