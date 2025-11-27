const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const { sendPasswordResetEmail } = require('../services/emailService');
const bcrypt = require('bcryptjs');

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if the email exists or not
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Create a reset token
    const token = await PasswordResetToken.createToken(user._id);
    
    // Send reset email
    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

// Reset password with token
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify token
    const { isValid, user: userId, consume } = await PasswordResetToken.verifyToken(token);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token. Please request a new password reset.'
      });
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    
    // Consume the token (delete it)
    await consume();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while resetting your password.'
    });
  }
};

// Verify reset token
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { isValid } = await PasswordResetToken.verifyToken(token);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid.'
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token.'
    });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  verifyResetToken
};
