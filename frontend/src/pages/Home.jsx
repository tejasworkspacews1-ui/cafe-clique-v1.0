import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Zap, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl top-20 -left-40 animate-pulse" />
          <div className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl bottom-20 -right-40 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">
              Cafe Clique
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Find Your Vibe, Make Real Friends, <br /> <span className="text-primary">Zero Awkwardness 🤝</span>
            </p>

            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Shifted to a new place? No friends yet? NPP! 🎉 Connect with people who share your mindset, goals, and vibes in just days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg">
                🚀 Join The Cafe Clique Now
              </Link>
              <Link to="/about" className="btn-secondary text-lg">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 glass rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 gradient-text">
            Why Cafe Clique? ✨
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12" />,
                title: 'AI-Powered Matching',
                desc: 'Find friends with your same vibe, mindset & goals using advanced matching'
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Safe & Secure',
                desc: 'Zero creeps guaranteed! Advanced safety features & real identity verification'
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Engaging Features',
                desc: 'Quiz, Posts, Reels, Articles, Stories, Blogs & Exciting Events'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 glass my-20 rounded-3xl max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Find Your Clique?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of teens already making real friends with zero awkwardness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">Sign Up Now</Link>
            <Link to="/club" className="btn-secondary">Explore The Zeal Club</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
