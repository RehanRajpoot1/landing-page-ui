import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBeDefined();
  });

  it('POST /api/waitlist adds a valid email', async () => {
    const res = await request(app).post('/api/waitlist').send({ email: 'test@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.count).toBe(1);
  });

  it('POST /api/waitlist rejects an invalid email', async () => {
    const res = await request(app).post('/api/waitlist').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /api/waitlist rejects a duplicate email', async () => {
    await request(app).post('/api/waitlist').send({ email: 'dup@example.com' });
    const res = await request(app).post('/api/waitlist').send({ email: 'DUP@example.com' });
    expect(res.status).toBe(409);
  });

  it('unknown API routes return 404', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
  });
});
