import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cafe-clique'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'cafe-clique-secret-key-change-in-production',
    expires: '7d'
  },
  admin: {
    password: process.env.ADMIN_PASSWORD || 'CafeClique@Admin123'
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
};
