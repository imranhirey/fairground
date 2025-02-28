import request from 'supertest';
import app from '../../index';
import { setupTestDB, teardownTestDB } from '../utils/testUtils';
import User from '../../models/User';

describe('Auth Controller', () => {
  beforeAll(async () => {
    // await setupTestDB();
  });

  afterAll(async () => {
    // await teardownTestDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'testpass' });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.header.location).toBe('/login');
    });

    it('should return an error if username already exists', async () => {
      await User.create({ username: 'testuser', password: 'testpass' });

      const res = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'testpass' });

      expect(res.status).toBe(200);
      expect(res.text).toContain('Username already exists');
    });
  });

  describe('POST /login', () => {
    it('should log in a user with valid credentials', async () => {
      await User.create({ username: 'testuser', password: 'testpass' });

      const res = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(res.status).toBe(302); // Redirect to home
      expect(res.header.location).toBe('/');
    });

    it('should return an error with invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpass' });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.header.location).toBe('/login');
    });
  });
});