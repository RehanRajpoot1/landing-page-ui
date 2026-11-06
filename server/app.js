import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));

const waitlistSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export function createApp() {
  const app = express();
  // In-memory store for now — will be replaced by a real database later
  const waitlist = new Set();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // ---------- API ----------
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: process.env.APP_NAME || 'Nimbus',
      version: pkg.version,
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/waitlist/count', (req, res) => {
    res.json({ count: waitlist.size });
  });

  app.post('/api/waitlist', (req, res) => {
    const result = waitlistSchema.safeParse(req.body ?? {});
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const email = result.data.email.toLowerCase();
    if (waitlist.has(email)) {
      return res.status(409).json({ error: 'This email is already on the waitlist' });
    }

    waitlist.add(email);
    return res.status(201).json({ message: "You're on the list!", count: waitlist.size });
  });

  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  // ---------- Frontend (after `npm run build`) ----------
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.method !== 'GET') return next();
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  // ---------- Errors ----------
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: status === 500 ? 'Something went wrong' : err.message });
  });

  return app;
}
