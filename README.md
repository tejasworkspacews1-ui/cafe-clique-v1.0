# Cafe Clique v1.0 🎉

A modern, Gen-Z aesthetic social media platform designed for teens to find local friends based on shared vibes, mindsets, and goals.

## 🎯 Problem Statement

Shifted to a new place and have no friends? Just joined a new college? Struggling to find people who "get you" without awkwardness or creeps? **Cafe Clique got you!** 

We've built a safe, secure platform where teens can connect genuinely, with AI-powered matching, safety features, and engaging content.

## ✨ Key Features

### 🤝 Friend Matching
- **AI-Powered Matching**: Find friends with your exact vibe using advanced algorithms
- **Nearby Discovery**: Connect with people in your locality
- **Vibe-Based Matching**: Filter by personality type (bookworm, party animal, gamer, etc.)
- **Goal-Aligned**: Find people with similar life goals and aspirations

### 📱 Content & Engagement
- **Posts & Reels**: Share moments with your clique
- **Articles & Blogs**: Publish your thoughts and stories
- **Quiz Hub**: Fun quizzes to discover more about yourself
- **Events**: Discover and create local events
- **The Zeal Club**: Exclusive community for top engagers

### 🔒 Safety & Security
- **Verified Profiles**: Real identity verification
- **Zero Creeps Guarantee**: Advanced safety filters and moderation
- **Private Messaging**: Secure DM system
- **Reporting & Blocking**: Full user control over interactions
- **Admin Monitoring**: 24/7 moderation and oversight

### 📊 Admin Control Panel
- **Dashboard**: Real-time statistics and analytics
- **User Management**: Monitor and manage user accounts
- **Feedback Management**: View, respond, and resolve user feedback
- **Admin Authentication**: Secure password-protected admin access
- **Content Moderation**: Full control over platform content

## 🛠 Tech Stack

### Frontend
- **Vite + React** - Lightning-fast development
- **Tailwind CSS** - Modern styling with utility classes
- **Framer Motion** - Smooth animations
- **React Router** - Navigation
- **Axios** - API calls
- **Lucide Icons** - Beautiful icons

### Backend
- **Node.js + Express** - Fast & scalable server
- **MongoDB** - NoSQL database
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Mongoose** - Database ORM

## 📁 Project Structure

```
cafe-clique-v1.0/
├── frontend/
│   ├── src/
│   │   ├── pages/          # All pages (Home, Profile, etc)
│   │   ├── components/     # Reusable components
│   │   ├── styles/         # Global CSS
│   │   ├── utils/          # API utilities
│   │   ├── App.jsx         # Main app
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & custom middleware
│   ├── config/             # Configuration files
│   ├── server.js           # Main server file
│   ├── .env.example        # Environment variables
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cafe-clique-v1.0.git
cd cafe-clique-v1.0
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and other configs

npm run dev
```

3. **Frontend Setup** (in another terminal)
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## 📋 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with features showcase
- **About** (`/about`) - Mission, vision, and features
- **The Zeal Club** (`/club`) - Exclusive member benefits
- **Contact** (`/contact`) - Get in touch with us
- **Feedback** (`/feedback`) - Submit suggestions, reviews, complaints

### User Pages
- **Register** (`/register`) - Create new account
- **Login** (`/login`) - Sign in
- **Profile** (`/profile`) - User profile & settings
- **Home Feed** - Discover friends and content

### Admin Pages
- **Admin Panel** (`/admin`) - Secure admin dashboard
  - Dashboard with statistics
  - User management
  - Feedback management
  - Content moderation

## 🔐 Admin Access

The admin panel is secured with password authentication:

```
URL: http://localhost:3000/admin
Password: CafeClique@AdminSecure2024 (change in production!)
```

**Admin Features:**
- View real-time statistics
- Manage all users
- Respond to user feedback
- Monitor platform activity
- Delete problematic content/users

## 📱 Dark Theme with Glassmorphism

The app features:
- **Dark Theme**: Easy on the eyes, perfect for Gen Z
- **Glassmorphism**: Frosted glass effect cards
- **Smooth Animations**: Framer Motion powered
- **Modern Colors**: Primary (#FF6B35), Secondary (#004E89)
- **Responsive Design**: Mobile, tablet, and desktop optimized

## 🎨 Design Features

- **Gradient Text**: Eye-catching typography
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading States**: Skeleton screens and spinners
- **Toast Notifications**: User feedback (success/error)
- **Mobile Responsive**: Mobile-first approach

## 🔧 Environment Variables

Create a `.env` file in the backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/cafe-clique
JWT_SECRET=your-secret-key-here
ADMIN_PASSWORD=CafeClique@AdminSecure2024
PORT=5000
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update profile
- `POST /api/users/friend-request/:targetId` - Send friend request
- `POST /api/users/friend-request/:requesterId/accept` - Accept request

### Matching
- `GET /api/matching/find-friends` - Find nearby friends
- `GET /api/matching/recommendations` - Get AI recommendations

### Content
- `POST /api/content/create` - Create content
- `GET /api/content/feed` - Get feed
- `POST /api/content/:contentId/like` - Like content
- `POST /api/content/:contentId/comment` - Comment on content

### Feedback
- `POST /api/feedback/submit` - Submit feedback
- `GET /api/feedback/all` - Get all feedback (admin)
- `PUT /api/feedback/:feedbackId/respond` - Respond to feedback (admin)

### Admin
- `GET /api/admin/dashboard` - Get statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:userId` - Delete user (admin only)
- `GET /api/admin/feedback` - Get all feedback (admin only)

## 🎯 Next Steps & Enhancements

- [ ] Video calls & voice chat
- [ ] Advanced AI matching algorithm
- [ ] Notifications system
- [ ] Real-time chat
- [ ] Payment integration for premium features
- [ ] Mobile app (React Native)
- [ ] Social sharing features
- [ ] Analytics dashboard

## 📝 Credits

**Made with ❤️ by Tejas Kamble**

This project is a complete social media platform built with modern technologies and designed with Gen Z aesthetics in mind.

## 📄 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Want to contribute? Great! Feel free to:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, suggestions, or feedback:
- Email: support@cafeclique.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/cafe-clique-v1.0/issues)
- Feedback Form: Visit `/feedback` on the app

---

**Thank you for being part of the Cafe Clique community!** 🎉☕
