// c:\Users\chand\Desktop\SHE_Foundation\backend\server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { CLIENT_URLS, NODE_ENV, PORT } from './config/constants.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { authLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';
import { seedAdmin } from './utils/seedAdmin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
const allowedOrigins = CLIENT_URLS;
const localhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const allowAllCors = String(process.env.ALLOW_ALL_CORS || '').toLowerCase() === 'true';

const corsOriginHandler = (origin, callback) => {
  if (!origin) return callback(null, true); // non-browser tools
  if (allowAllCors) return callback(null, true);
  if (allowedOrigins.includes(origin) || localhostOrigin.test(origin)) return callback(null, true);
  callback(new Error(`CORS policy does not allow access from origin ${origin}`));
};

const corsOptions = {
  origin: corsOriginHandler,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  credentials: true
};

if (allowAllCors) {
  app.use(cors({ origin: true, credentials: true }));
  app.options('*', cors({ origin: true, credentials: true }));
} else {
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
}

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again later.' }
});

app.use(globalLimiter);
app.use('/api/auth/login', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Mount auth routes also at /auth for backwards compatibility (frontend might call /auth/login)
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'She Can Foundation API is running' });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  const basePort = Number(PORT) || 5000;
  const maxPort = basePort + 10;
  let server;
  let activePort = basePort;

  const listenOnPort = (port) =>
    new Promise((resolve, reject) => {
      const candidate = app.listen(port, () => resolve({ server: candidate, port }));
      candidate.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          reject(error);
        } else {
          reject(error);
        }
      });
    });

  for (let port = basePort; port <= maxPort; port += 1) {
    try {
      const result = await listenOnPort(port);
      server = result.server;
      activePort = result.port;
      break;
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is already in use. Trying port ${port + 1}...`);
        continue;
      }
      console.error('Server error:', error);
      process.exit(1);
    }
  }

  if (!server) {
    console.error(`Unable to start server: ports ${basePort}-${maxPort} are all in use.`);
    process.exit(1);
  }

  process.env.PORT = String(activePort);
  console.log(`Server running in ${NODE_ENV} mode on port ${activePort}`);
};

startServer();
