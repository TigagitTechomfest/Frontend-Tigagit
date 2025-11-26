const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Request password reset email
router.post('/forgot-password', authController.requestPasswordReset);

// Reset password with token
router.post('/reset-password/:token', authController.resetPassword);

// Verify reset token
router.get('/verify-reset-token/:token', authController.verifyResetToken);

module.exports = router;
