const mongoose = require('mongoose');
const crypto = require('crypto');

const passwordResetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3600000), // 1 hour from now
    index: { expires: '1h' }, // Auto-delete after 1 hour
  },
});

// Generate a secure random token
passwordResetTokenSchema.statics.generateToken = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  });
};

// Create a token for a user
passwordResetTokenSchema.statics.createToken = async function(userId) {
  // Delete any existing tokens for this user
  await this.deleteMany({ user: userId });
  
  // Create new token
  const token = await this.generateToken();
  const resetToken = await this.create({
    user: userId,
    token,
  });
  
  return resetToken.token;
};

// Verify if a token is valid
passwordResetTokenSchema.statics.verifyToken = async function(token) {
  const resetToken = await this.findOne({ token });
  
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { isValid: false, user: null };
  }
  
  return { 
    isValid: true, 
    user: resetToken.user,
    // Delete the token after verification (one-time use)
    consume: async () => {
      await resetToken.deleteOne();
    }
  };
};

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

module.exports = PasswordResetToken;
