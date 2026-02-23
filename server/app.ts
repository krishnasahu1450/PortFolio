import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blog';
import skillRoutes from './routes/skills';
import messageRoutes from './routes/messages';
import experienceRoutes from "./routes/experiences";
import userProfileRoutes from "./routes/userProfile";
import testimonialRoutes from "./routes/testimonial";

// Import database
import { database } from './config/database';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']
    : ['http://192.168.31.173:3000', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "data:",
        "http://localhost:5000",
        "http://192.168.31.173:5000"
      ],
    },
  },
  // contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));



// app.use(cors({
//   origin: process.env.NODE_ENV === 'production'
//     ? ['https://your-domain.com']
//     : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.31.173:3000'],
//   credentials: true
// }));

// Allow CORS from any origin for development, restrict in production


// app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(
  "/uploads",
  cors({
    origin: "*",
    credentials: true,
  }),
  express.static(path.resolve("uploads"))
);

// console.log("STATIC PATH:", path.resolve("uploads"));

const API_BASE = `${process.env.API_PREFIX || '/api'}/${process.env.API_VERSION || 'v1'}`;

// API Routes
app.use(`${API_BASE}/auth`, authRoutes);
app.use(`${API_BASE}/projects`, projectRoutes);
app.use(`${API_BASE}/blog`, blogRoutes);
app.use(`${API_BASE}/skills`, skillRoutes);
app.use(`${API_BASE}/messages`, messageRoutes);
app.use(`${API_BASE}/experiences`, experienceRoutes);
app.use(`${API_BASE}/profile`, userProfileRoutes);
app.use(`${API_BASE}/testimonials`, testimonialRoutes);

// Health check
app.get(`${API_BASE}/health`, (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.error(err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});


// 404 handler
// app.use('/*', (req, res) => {
//   res.status(404).json({ success: false, error: 'Route not found' });
// });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Start server
const startServer = async () => {
  try {
    await database.connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await database.disconnect();
  mongoose.connection.close().then(() => {
    console.log('🔌 Mongoose connection closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await database.disconnect();
  mongoose.connection.close().then(() => {
    console.log('🔌 Mongoose connection closed.');
    process.exit(0);
  });
});

startServer();

export default app;