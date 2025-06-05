import express from 'express';
import { login, logout, register, resendOtp, verifyOtp } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/logout', auth, logout);
router.get('/is-authenticated', auth, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }    
  res.status(200).json({ user: req.user });
});

export default router