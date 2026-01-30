import React from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

export default function ContentCard({ content, onLike }) {
  return (
    <div className="card max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={content.user?.profilePic || 'https://via.placeholder.com/48'} 
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{content.user?.name || 'Anonymous'}</h3>
          <p className="text-sm text-gray-400">
            {new Date(content.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-xl font-bold mb-2">{content.title}</h2>
      <p className="text-gray-300 mb-4">{content.content}</p>

      {/* Tags */}
      {content.tags?.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {content.tags.map((tag, i) => (
            <span key={i} className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Engagement */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-700 text-gray-400">
        <button 
          onClick={() => onLike(content._id)}
          className="flex items-center gap-2 hover:text-primary smooth-transition"
        >
          <Heart size={20} />
          <span>{content.likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary smooth-transition">
          <MessageCircle size={20} />
          <span>{content.comments?.length || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary smooth-transition">
          <Share2 size={20} />
          <span>{content.shares || 0}</span>
        </button>
      </div>
    </div>
  )
}
