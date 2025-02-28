import request from 'supertest';
import app from '../../index';

describe('Auth Routes', () => {
  describe('GET /', () => {
    it('should redirect to login if not authenticated', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(302); // Redirect to login
      expect(res.header.location).toBe('/login');
    });
  });

  describe('GET /login', () => {
    it('should render the login page', async () => {
      const res = await request(app).get('/login');
      expect(res.status).toBe(200);
      expect(res.text).toContain('Login');
    });
  });

  describe('GET /register', () => {
    it('should render the register page', async () => {
      const res = await request(app).get('/register');
      expect(res.status).toBe(200);
      expect(res.text).toContain('Register');
    });
  });
});