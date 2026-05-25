const express = require('express');
const cors = require('cors');
const app = express();

// 1. Enable CORS Middleware with open options
app.use(cors({
  origin: '*', // Allows any frontend URL to safely fetch data from your api
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// 2. Handle preflight OPTIONS requests explicitly (Crucial for Vercel Serverless)
app.options('*', cors());

app.use(express.json());

// ... Your routes (app.use('/auth', authRoutes), etc.) live below here
