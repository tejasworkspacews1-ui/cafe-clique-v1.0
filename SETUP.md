# 🚀 Cafe Clique Setup & Installation Guide

## ⚡ Quick Start (3 minutes)

### Option 1: Docker (Recommended) 🐳

```bash
# Clone the repo
git clone https://github.com/tejasworkspacews1-ui/cafe-clique-v1.0.git
cd cafe-clique-v1.0

# Start everything with Docker
docker-compose up -d

# Access the app
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

### Option 2: Manual Setup

#### Step 1: Backend Installation
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Start MongoDB (make sure it's running)
# Then start the backend
npm run dev
```

#### Step 2: Frontend Installation (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

#### Step 3: Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/cafe-clique

# JWT Security
JWT_SECRET=cafe-clique-secret-key-change-in-production

# Admin Password (CHANGE THIS!)
ADMIN_PASSWORD=CafeClique@AdminSecure2024

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (Optional for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Environment Variables (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Cafe Clique
```

---

## 🎯 Default Test Accounts & Credentials

### Admin Access
```
URL: http://localhost:3000/admin
Password: CafeClique@AdminSecure2024
```

### Test User Account
```
Email: test@cafeclique.com
Password: password123
```

---

## 📋 Checklist Before Going Live

- [ ] Change ADMIN_PASSWORD in backend/.env
- [ ] Change JWT_SECRET in backend/.env
- [ ] Set NODE_ENV=production for backend
- [ ] Configure MongoDB production URI
- [ ] Set up proper SSL certificates
- [ ] Configure environment variables on hosting platform
- [ ] Test all authentication flows
- [ ] Test admin panel access
- [ ] Verify all API endpoints
- [ ] Test email notifications (when implemented)

---

## 🗄️ Database Setup

### MongoDB Local Setup
```bash
# Install MongoDB Community Edition
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create an account
3. Create a cluster
4. Get connection string
5. Add to .env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-clique
```

---

## 🔐 Security Best Practices

### Authentication
- ✅ JWT tokens for API authentication
- ✅ Bcrypt password hashing
- ✅ Password validation (min 6 chars)
- ✅ Token expiry (7 days by default)

### Admin Panel
- ✅ Password-protected with custom header authentication
- ✅ Change default password immediately
- ✅ Use environment variables for sensitive data

### Data Protection
- ✅ Validate all inputs on backend
- ✅ Never store passwords in plain text
- ✅ Use HTTPS in production
- ✅ Implement rate limiting for APIs

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Make sure MongoDB is running
2. Check MONGODB_URI in .env
3. Verify connection string format
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000

Solution:
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
VITE_PORT=3001 npm run dev
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy

Solution:
Backend already has CORS enabled globally.
Make sure VITE_API_URL points to correct backend URL.
```

### Module Not Found
```
Error: Cannot find module 'express'

Solution:
npm install
# Make sure you're in the correct directory
```

---

## 📊 API Testing

### Using Postman

1. Import the requests
2. Set base URL: `http://localhost:5000/api`
3. For authenticated requests, add header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Example Requests

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 20,
    "city": "Mumbai",
    "state": "Maharashtra",
    "vibe": "tech-geek",
    "interests": ["Coding", "Music"]
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Admin Dashboard (add header)
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "x-admin-password: CafeClique@AdminSecure2024"
```

---

## 📱 Development Tips

### Frontend
- Use React DevTools browser extension for debugging
- Check Console for errors (F12)
- Network tab to monitor API calls
- Tailwind CSS autocomplete: Install extension

### Backend
- Use Postman or Thunder Client for API testing
- MongoDB Compass for database visualization
- Check server logs in terminal
- Use `npm run dev` for auto-reload with nodemon

---

## 🎨 Customization Guide

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: '#FF6B35',     // Orange
  secondary: '#004E89',   // Blue
  dark: '#0F1419',        // Dark background
  darkCard: '#1a1f2e',    // Card background
  accent: '#FFD23F'       // Yellow accent
}
```

### Change App Name
1. `frontend/index.html` - `<title>`
2. `frontend/src/components/Navbar.jsx` - Logo text
3. `backend/.env` - App name variable

### Add New Features
1. Create model in `backend/models/`
2. Create route in `backend/routes/`
3. Create page in `frontend/src/pages/`
4. Add to navigation in `frontend/src/components/Navbar.jsx`

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Upload dist/ folder to Vercel
# Or: vercel deploy
```

### Backend (Heroku/Railway)
```bash
cd backend
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

### Full Stack (Docker Deployment)
```bash
docker-compose up -d
# Then push to Docker Hub or deploy to cloud
```

---

## 📞 Support & Contact

- 📧 Email: support@cafeclique.com
- 🐙 GitHub: https://github.com/tejasworkspacews1-ui/cafe-clique-v1.0
- 📝 Issues: Create an issue on GitHub

---

## 📝 Credits

**Made with ❤️ by Tejas Kamble**

---

**Happy Building! 🎉☕**
