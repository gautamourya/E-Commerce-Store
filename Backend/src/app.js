const express = require('express');
const userAuth = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json())
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials:true
// }))

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow production domains
    const allowedOrigins = [
      `https://localhost:3000/`,
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));




app.use(cookieParser());
app.use('/', productRoute)
app.use('/', userAuth)
module.exports = app;