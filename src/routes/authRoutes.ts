import express from 'express';
import {
  getHome, getLogin, postLogin, getRegister, postRegister, logout
} from '../controllers/authController';

const router = express.Router();

router.get('/', getHome);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.get('/logout', logout);

export default router;